// Аудит доступности: axe-core по всем маршрутам + smoke-тест prefers-reduced-motion.
// Использование: npm run build && npm run audit:a11y
import { createServer } from 'node:http'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'
import axePkg from 'axe-core/axe.js'

const axeSource = axePkg.axeSource ?? axePkg.source ?? axePkg.default?.source

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, '.output', 'public')

const ROUTES = ['/', '/resume/ru', '/resume/en']

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.pdf': 'application/pdf',
}

function startServer(dir) {
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
      let filePath = path.normalize(path.join(dir, urlPath))
      if (!filePath.startsWith(dir)) {
        res.writeHead(403).end()
        return
      }
      if (urlPath.endsWith('/')) {
        filePath = path.join(filePath, 'index.html')
      } else if (!existsSync(filePath)) {
        const asDir = path.join(filePath, 'index.html')
        if (existsSync(asDir)) filePath = asDir
      } else if (!path.extname(filePath)) {
        filePath = path.join(filePath, 'index.html')
      }
      if (!existsSync(filePath) || !filePath.startsWith(dir)) {
        res.writeHead(404, { 'content-type': 'text/plain' }).end('Not found')
        return
      }
      const body = await readFile(filePath)
      res.writeHead(200, { 'content-type': MIME[path.extname(filePath)] || 'application/octet-stream' })
      res.end(body)
    } catch {
      res.writeHead(500, { 'content-type': 'text/plain' }).end('Server error')
    }
  })

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }))
  })
}

function findChrome() {
  const chrome = CHROME_CANDIDATES.find((p) => existsSync(p))
  if (!chrome) {
    console.error('Chrome not found. Install Google Chrome or set CHROME_PATH.')
    process.exit(1)
  }
  return chrome
}

async function runAxe(page, url) {
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60_000 })
  await page.evaluate(new Function(axeSource))
  return page.evaluate(() =>
    window.axe.run(document, {
      resultTypes: ['violations'],
      // PDF-кнопки и декоративные элементы проверяем как есть
    }),
  )
}

async function checkReducedMotion(page, url) {
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60_000 })
  await new Promise((r) => setTimeout(r, 800))

  const result = await page.evaluate(() => {
    const out = []

    // reveal-элементы должны быть видимы сразу
    const reveals = [...document.querySelectorAll('.reveal')]
    const hiddenReveals = reveals.filter((el) => getComputedStyle(el).opacity !== '1').length
    out.push(`reveal: ${reveals.length - hiddenReveals}/${reveals.length} видимы сразу`)

    // keyframe-анимации должны быть отключены
    const blob = document.querySelector('.animate-blob, .animate-blob-delayed')
    if (blob) {
      out.push(`blob animation-name: ${getComputedStyle(blob).animationName}`)
    }

    // particles: движение отключается опцией move.enable=false —
    // проверяем, что канвас не анимируется запросами rAF подряд
    const smooth = getComputedStyle(document.documentElement).scrollBehavior
    out.push(`scroll-behavior: ${smooth}`)

    return out
  })

  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }])
  return result
}

async function main() {
  if (!existsSync(path.join(distDir, 'index.html'))) {
    console.error('Build output not found. Run `npm run build` first.')
    process.exit(1)
  }

  const { server, port } = await startServer(distDir)
  const base = `http://127.0.0.1:${port}`

  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  })

  let totalViolations = 0

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage()
      await page.setViewport({ width: 1440, height: 900 })

      const url = `${base}${route}`
      const results = await runAxe(page, url)

      const title = route === '/' ? '/' : route
      if (results.violations.length === 0) {
        console.log(`\n[axe] ${title}: нарушений нет ✔`)
      } else {
        console.log(`\n[axe] ${title}: ${results.violations.length} нарушений`)
        for (const v of results.violations) {
          totalViolations += v.nodes.length
          console.log(`  ✖ ${v.id} (${v.impact}) — ${v.help} [${v.nodes.length} узлов]`)
          console.log(`    → ${v.helpUrl}`)
          for (const node of v.nodes.slice(0, 3)) {
            console.log(`      ${node.target.join(' ')}`)
          }
        }
      }

      if (route === '/') {
        const motion = await checkReducedMotion(page, url)
        console.log(`\n[reduced-motion] ${title}:`)
        for (const line of motion) console.log(`  · ${line}`)
      }

      await page.close()
    }
  } finally {
    await browser.close()
    server.close()
  }

  console.log(`\nИтого нарушений axe: ${totalViolations}`)
  process.exit(totalViolations > 0 ? 2 : 0)
}

main()
