import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Newsletter } from '../components/layout/Newsletter'
import { newsletterSchema } from '../schemas/newsletter'
import { subscribe } from '../utils/newsletter'

describe('newsletter schema', () => {
  it('requires a valid email', () => {
    expect(newsletterSchema.safeParse({ email: '' }).success).toBe(false)
    expect(newsletterSchema.safeParse({ email: 'not-an-email' }).success).toBe(false)
    expect(newsletterSchema.safeParse({ email: '  runner@example.com ' }).success).toBe(true)
  })
})

describe('Newsletter form', () => {
  const setup = () => {
    const user = userEvent.setup()
    render(<Newsletter />)
    return { user, input: screen.getByLabelText('Email address'), submit: screen.getByRole('button', { name: /subscribe/i }) }
  }

  it('shows a required-field error', async () => {
    const { user, input, submit } = setup()
    await user.click(submit)
    expect(await screen.findByText('Please enter your email address.')).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('Please enter your email address.')
  })

  it('shows a format error', async () => {
    const { user, input, submit } = setup()
    await user.type(input, 'runner@')
    await user.click(submit)
    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument()
  })

  it('shows loading then a demo-mode success message', async () => {
    const { user, input, submit } = setup()
    await user.type(input, 'runner@example.com')
    await user.click(submit)
    expect(screen.getByRole('button', { name: /joining/i })).toBeDisabled()
    expect(await screen.findByText(/demo mode: runner@example.com was validated but not stored/i, {}, { timeout: 3000 })).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('shows an error message when the request fails', async () => {
    const { user, input, submit } = setup()
    await user.type(input, 'error@example.com')
    await user.click(submit)
    expect(await screen.findByText(/something went wrong/i, {}, { timeout: 3000 })).toBeInTheDocument()
  })
})

describe('subscribe()', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('POSTs to a configured endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    await expect(subscribe('a@b.co', 'https://example.test/subscribe')).resolves.toEqual({ mode: 'api' })
    expect(fetchMock).toHaveBeenCalledWith(
      'https://example.test/subscribe',
      expect.objectContaining({ method: 'POST', body: JSON.stringify({ email: 'a@b.co' }) }),
    )
  })

  it('rejects when the endpoint returns an error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))
    await expect(subscribe('a@b.co', 'https://example.test/subscribe')).rejects.toThrow(/500/)
  })
})
