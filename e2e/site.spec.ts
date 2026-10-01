import { expect, test } from '@playwright/test'

const isMobile = (name: string) => name === 'mobile'

test('home page loads with hero, images and no horizontal overflow', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: /chase every second/i })).toBeVisible()
  const hero = page.locator('section[aria-labelledby="hero-title"] img')
  await expect(hero).toHaveJSProperty('complete', true)
  expect(await hero.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow).toBeLessThanOrEqual(0)
})

test('"Shop new arrivals" scrolls to the arrivals section', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /shop new arrivals/i }).click()
  await expect(page.getByRole('heading', { name: 'New arrivals for the run.' })).toBeInViewport()
})

test('navigates Home → About and back', async ({ page }, info) => {
  await page.goto('/')
  if (isMobile(info.project.name)) {
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page.getByRole('dialog', { name: 'Menu' }).getByRole('link', { name: 'About' }).click()
    await expect(page.getByRole('dialog', { name: 'Menu' })).toBeHidden()
  } else {
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'About' }).click()
  }
  await expect(page).toHaveURL(/\/about$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Our Story' })).toBeVisible()
  await page.getByRole('link', { name: /paceline — home/i }).click()
  await expect(page).toHaveURL(/\/$/)
})

test('category card opens the collection', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /^Trail Running/ }).click()
  await expect(page).toHaveURL(/\/shop\/trail$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Trail running' })).toBeVisible()
})

test('product → bag → checkout flow', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Vaporfly 4 — Volt Ice' }).first().click()
  await expect(page.getByRole('heading', { level: 1, name: 'Vaporfly 4 — Volt Ice' })).toBeVisible()
  await page.getByText('9', { exact: true }).click()
  await page.getByRole('button', { name: /add to bag/i }).click()

  const drawer = page.getByRole('dialog', { name: /your bag/i })
  await expect(drawer).toBeVisible()
  await drawer.getByRole('button', { name: 'Increase quantity' }).click()
  await expect(drawer.getByText('£480').first()).toBeVisible()
  await drawer.getByRole('link', { name: /checkout/i }).click()
  await expect(page.getByRole('heading', { name: /online checkout isn't available/i })).toBeVisible()
})

test('bag and deep routes survive a browser refresh', async ({ page }) => {
  await page.goto('/product/paceline-race-belt')
  await page.getByRole('button', { name: 'Add to bag', exact: true }).click()
  await page.keyboard.press('Escape')
  await page.reload()
  await expect(page.getByRole('heading', { level: 1, name: 'Race Belt — Lime' })).toBeVisible()
  await expect(page.getByRole('button', { name: /open bag, 1 item/i })).toBeVisible()

  await page.goto('/about')
  await page.reload()
  await expect(page.getByRole('heading', { level: 1, name: 'Our Story' })).toBeVisible()
})

test('newsletter shows validation and demo success', async ({ page }) => {
  await page.goto('/about')
  await page.getByRole('button', { name: /subscribe/i }).click()
  await expect(page.getByText('Please enter your email address.')).toBeVisible()
  await page.getByLabel('Email address').fill('runner@example.com')
  await page.getByRole('button', { name: /subscribe/i }).click()
  await expect(page.getByText(/demo mode/i)).toBeVisible()
})

test('responsive widths have no horizontal overflow', async ({ page }, info) => {
  test.skip(isMobile(info.project.name), 'covered once on desktop project')
  for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1600]) {
    await page.setViewportSize({ width, height: 900 })
    for (const path of ['/', '/about']) {
      await page.goto(path)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow, `${path} @ ${width}px`).toBeLessThanOrEqual(0)
    }
  }
})
