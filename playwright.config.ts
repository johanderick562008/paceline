import { defineConfig, devices } from '@playwright/test'

const PORT = 4173
const baseURL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: { baseURL, trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  // Tests run against the production build unless E2E_BASE_URL points at a deployment.
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : { command: `npm run build && npm run preview -- --port ${PORT} --strictPort`, url: baseURL, reuseExistingServer: !process.env.CI, timeout: 180_000 },
})
