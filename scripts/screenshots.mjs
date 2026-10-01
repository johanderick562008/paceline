// Full-page screenshots for visual comparison against design/Home.png and design/About.png.
// Usage: node scripts/screenshots.mjs [baseUrl] [outDir]   (dev or preview server must be running)
import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'

const base = process.argv[2] ?? 'http://localhost:5173'
const out = process.argv[3] ?? 'screenshots'
const widths = (process.env.WIDTHS ?? '1440,375').split(',').map(Number)
const paths = (process.env.PATHS ?? '/,/about').split(',')
mkdirSync(out, { recursive: true })

const browser = await chromium.launch()
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  for (const path of paths) {
    await page.goto(base + path, { waitUntil: 'networkidle' })
    // Trigger lazy images, then return to top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 40))
      }
      await Promise.all([...document.images].map((img) => img.decode().catch(() => {})))
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(300)
    const name = (path === '/' ? 'home' : path.replace(/\W+/g, '-').replace(/^-|-$/g, '')) + `-${width}.png`
    await page.screenshot({ path: `${out}/${name}`, fullPage: true })
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    console.log(name, overflow > 0 ? `HORIZONTAL OVERFLOW ${overflow}px` : 'no overflow')
  }
  await page.close()
}
await browser.close()
