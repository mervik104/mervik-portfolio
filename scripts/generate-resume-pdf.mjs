import { createServer } from 'node:http'
import { existsSync } from 'node:fs'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, '.output', 'public')

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean)

const TARGETS = [
  { url: '/resume/ru', file: 'Boris_Stepanenko_CV_ru.pdf', lang: 'ru' },
  { url: '/resume/en', file: 'Boris_Stepanenko_CV_en.pdf', lang: 'en' },
]

// нижний колонтитул: источник + дата + номер страницы (на каждой странице PDF)
function footerTemplate(lang) {
  const date = new Date().toLocaleDateString(
    lang === 'ru' ? 'ru-RU' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' },
  )
  const note = lang === 'ru'
    ? `Резюме скачано с сайта mervik.ru · актуально на ${date}`
    : `Downloaded from mervik.ru · up to date as of ${date}`
  const pager = lang === 'ru'
    ? 'Стр. <span class="pageNumber"></span> из <span class="totalPages"></span>'
    : 'Page <span class="pageNumber"></span> of <span class="totalPages"></span>'
  return `<div style="width:100%;box-sizing:border-box;padding:0 14mm;display:flex;justify-content:space-between;align-items:center;font-family:Arial,Helvetica,sans-serif;font-size:8px;color:#9ca3af;">
<span>${note}</span>
<span>${pager}</span>
</div>`
}

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
  '.xml': 'application/xml; charset=utf-8',
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
    console.error(
      'Chrome not found. Install Google Chrome or set CHROME_PATH to the browser executable.',
    )
    process.exit(1)
  }
  return chrome
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
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'],
  })

  try {
    for (const target of TARGETS) {
      const page = await browser.newPage()
      await page.goto(`${base}${target.url}`, { waitUntil: 'networkidle0', timeout: 60_000 })
      await page.evaluateHandle('document.fonts.ready')

      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<span></span>',
        footerTemplate: footerTemplate(target.lang),
        margin: { top: '12mm', right: '14mm', bottom: '16mm', left: '14mm' },
        timeout: 60_000,
      })

      // в исходный public/ — чтобы файлы были доступны в dev и копировались в каждый билд
      const srcPath = path.join(root, 'public', target.file)
      await mkdir(path.dirname(srcPath), { recursive: true })
      await writeFile(srcPath, pdf)

      // и в текущий билд — чтобы деплой сразу забрал свежие файлы
      const outPath = path.join(distDir, target.file)
      await mkdir(path.dirname(outPath), { recursive: true })
      await writeFile(outPath, pdf)
      console.log(`[pdf] ${target.url} -> public/${target.file} + .output/public/${target.file} (${(pdf.length / 1024).toFixed(0)} KiB)`)
      await page.close()
    }
  } finally {
    await browser.close()
    server.close()
  }
}

main()
