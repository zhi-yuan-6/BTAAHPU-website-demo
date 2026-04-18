/**
 * 将 Chrome/Edge 导出的书签 HTML 解析为前端可用的资源列表（仅保留「区块链」文件夹下的链接）。
 * 运行：node scripts/parse-favorites.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const input = path.join(root, 'favorites_2026_4_18.html')
const output = path.join(root, 'frontend', 'src', 'data', 'blockchainResources.js')

let html = fs.readFileSync(input, 'utf8')
// 去掉超长 ICON，避免正则/内存压力
html = html.replace(/\s+ICON="[^"]*"/gi, '')

const stack = []
const links = []

const re =
  /<\/DL>|<DT><H3[^>]*>([^<]*)<\/H3>|<DT><A HREF="([^"]+)"[^>]*>([^<]*)<\/A>/gi

let m
while ((m = re.exec(html)) !== null) {
  const full = m[0]
  if (full.trim().toLowerCase() === '</dl>') {
    if (stack.length) stack.pop()
    continue
  }
  if (/<H3/i.test(full)) {
    stack.push((m[1] || '').trim())
    continue
  }
  const url = (m[2] || '').trim()
  const title = (m[3] || '').trim() || url
  if (!url) continue

  const idx = stack.indexOf('区块链')
  if (idx === -1) continue

  const under = stack.slice(idx + 1)
  const section = under[0] || '其他'
  const subsection = under.length > 1 ? under.slice(1).join(' · ') : ''

  links.push({
    section,
    subsection,
    title,
    url
  })
}

// 按 section 分组，subsection 再分组
const bySection = new Map()
for (const item of links) {
  if (!bySection.has(item.section)) bySection.set(item.section, new Map())
  const subMap = bySection.get(item.section)
  const subKey = item.subsection || '_root'
  if (!subMap.has(subKey)) subMap.set(subKey, [])
  subMap.get(subKey).push({ title: item.title, url: item.url })
}

const sections = []
for (const [section, subMap] of bySection) {
  const subsections = []
  for (const [subKey, items] of subMap) {
    subsections.push({
      title: subKey === '_root' ? null : subKey,
      links: items
    })
  }
  sections.push({ section, subsections })
}

const banner = `// 本文件由 scripts/parse-favorites.mjs 从 favorites_2026_4_18.html 生成，请勿手改；更新收藏夹后重新运行脚本。\n`

const body = `export const blockchainResourceSections = ${JSON.stringify(sections, null, 2)}\n`

fs.mkdirSync(path.dirname(output), { recursive: true })
fs.writeFileSync(output, banner + body, 'utf8')
console.log(`Wrote ${links.length} links -> ${path.relative(root, output)}`)
