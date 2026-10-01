import { site } from '../config/site'

export type SubscribeResult = { mode: 'api' | 'demo' }

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Submits a newsletter sign-up.
 *
 * - If VITE_NEWSLETTER_ENDPOINT is configured, POSTs `{ email }` as JSON to it.
 * - Otherwise runs in DEMO mode: nothing is stored or sent. The address
 *   `error@example.com` simulates a failure so the error state can be seen.
 */
export async function subscribe(email: string, endpoint = site.newsletterEndpoint): Promise<SubscribeResult> {
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (!res.ok) throw new Error(`Subscription failed (${res.status})`)
    return { mode: 'api' }
  }
  await wait(700)
  if (email.toLowerCase() === 'error@example.com') throw new Error('Simulated network error')
  return { mode: 'demo' }
}
