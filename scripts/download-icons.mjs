import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const STACK_FILE = resolve(__dirname, '../app/data/stack.ts')
const OUTPUT_DIR = resolve(__dirname, '../public/icons')

async function getIconRefs() {
    const content = await readFile(STACK_FILE, 'utf-8')
    const matches = content.matchAll(/icon:\s*['"]([\w-]+):([\w-]+)['"]/g)
    const refs = new Map()

    for (const [, prefix, name] of matches) {
        refs.set(`${prefix}:${name}`, { prefix, name })
    }

    return [...refs.values()]
}

function fileNameFor({ prefix, name }) {
    return `${prefix}-${name}.svg`
}

async function downloadIcon({ prefix, name }) {
    const url = `https://api.iconify.design/${prefix}/${name}.svg`
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(`HTTP ${res.status} для ${prefix}:${name}`)
    }

    const svg = await res.text()

    if (svg.trim().startsWith('<svg') === false) {
        throw new Error(`Иконка не найдена: ${prefix}:${name}`)
    }

    return svg
}

async function main() {
    const refs = await getIconRefs()
    await mkdir(OUTPUT_DIR, { recursive: true })

    console.log(`Найдено ${refs.length} уникальных иконок\n`)

    for (const ref of refs) {
        const fileName = fileNameFor(ref)
        const outPath = resolve(OUTPUT_DIR, fileName)

        try {
            const svg = await downloadIcon(ref)
            await writeFile(outPath, svg, 'utf-8')
            console.log(`✓ ${ref.prefix}:${ref.name} → public/icons/${fileName}`)
        } catch (err) {
            console.error(`✗ ${ref.prefix}:${ref.name} — ${err.message}`)
        }
    }

    console.log('\nГотово.')
}

main()