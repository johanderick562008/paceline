import { screen, within } from '@testing-library/react'
import { renderApp } from './utils'

describe('Home page', () => {
  it('renders every designed section in order', async () => {
    renderApp('/')
    expect(screen.getByRole('heading', { level: 1, name: /chase every second/i })).toBeInTheDocument()
    const headings = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    const order = [
      'Every discipline. Every distance.',
      'New arrivals for the run.',
      'Built by runners. Worn on every terrain.',
      "Men's Running",
      "Women's Running",
      'Join the Paceline club.',
    ]
    const positions = order.map((t) => headings.indexOf(t))
    expect(positions.every((p) => p >= 0)).toBe(true)
    expect([...positions].sort((a, b) => a - b)).toEqual(positions)
  })

  it('shows the announcement bar and four category cards', () => {
    renderApp('/')
    expect(screen.getByText(/new arrivals dropping weekly/i)).toBeInTheDocument()
    const categories = screen.getByRole('region', { name: /every discipline/i })
    for (const name of ['Road Running', 'Trail Running', 'Apparel', 'Accessories']) {
      expect(within(categories).getByRole('link', { name: new RegExp(`^${name}`) })).toBeInTheDocument()
    }
  })
})

describe('About page', () => {
  it('renders every designed section', async () => {
    renderApp('/about')
    expect(await screen.findByRole('heading', { level: 1, name: 'Our Story' })).toBeInTheDocument()
    for (const name of [
      /about the run/i,
      /three things we won't compromise on/i,
      /how we got here/i,
      /visit us in/i,
      /the people behind the shop/i,
      /come find your next pair of shoes/i,
    ]) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument()
    }
    expect(screen.getByRole('heading', { name: 'Rae Sinclair' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Jamie Roy' })).toBeInTheDocument()
    for (const year of ['2015', '2018', '2022', '2026']) expect(screen.getByText(year)).toBeInTheDocument()
    const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' })
    expect(within(breadcrumb).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
  })

  it('links the CTA buttons to footwear and gait analysis', async () => {
    renderApp('/about')
    expect(await screen.findByRole('link', { name: 'Shop footwear' })).toHaveAttribute('href', '/shop/footwear')
    expect(screen.getByRole('link', { name: 'Book gait analysis' })).toHaveAttribute('href', '/gait-analysis')
  })
})

describe('Navigation', () => {
  it('navigates Home → About via the main nav and back via the logo', async () => {
    const { user } = renderApp('/')
    const nav = screen.getByRole('navigation', { name: 'Main' })
    await user.click(within(nav).getByRole('link', { name: 'About' }))
    expect(await screen.findByRole('heading', { level: 1, name: 'Our Story' })).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: /paceline — home/i }))
    expect(await screen.findByRole('heading', { level: 1, name: /chase every second/i })).toBeInTheDocument()
  })

  it('"Read our story" goes to the About page', async () => {
    const { user } = renderApp('/')
    await user.click(screen.getByRole('link', { name: /read our story/i }))
    expect(await screen.findByRole('heading', { level: 1, name: 'Our Story' })).toBeInTheDocument()
  })

  it('category cards open their collection', async () => {
    const { user } = renderApp('/')
    await user.click(screen.getByRole('link', { name: /^Trail Running/ }))
    expect(await screen.findByRole('heading', { level: 1, name: 'Trail running' })).toBeInTheDocument()
  })

  it('every footer link has a real destination', () => {
    renderApp('/')
    const footer = screen.getByRole('contentinfo')
    for (const link of within(footer).getAllByRole('link')) {
      const href = link.getAttribute('href')
      expect(href).toBeTruthy()
      expect(href).not.toBe('#')
    }
  })

  it('renders a 404 page for unknown routes', async () => {
    renderApp('/does-not-exist')
    expect(await screen.findByRole('heading', { name: /wrong turn/i })).toBeInTheDocument()
  })

  it('renders informational footer pages', async () => {
    renderApp('/info/returns')
    expect(await screen.findByRole('heading', { level: 1, name: 'Returns' })).toBeInTheDocument()
  })
})

describe('Mobile menu', () => {
  it('opens as an accessible dialog, closes with Escape and after navigating', async () => {
    const { user } = renderApp('/')
    const toggle = screen.getByRole('button', { name: 'Open menu' })
    await user.click(toggle)
    const dialog = screen.getByRole('dialog', { name: 'Menu' })
    expect(dialog).toBeInTheDocument()
    expect(within(dialog).getByRole('button', { name: 'Close menu' })).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: 'Menu' })).not.toBeInTheDocument()
    expect(toggle).toHaveFocus()

    await user.click(toggle)
    await user.click(within(screen.getByRole('dialog', { name: 'Menu' })).getByRole('link', { name: 'Women' }))
    expect(screen.queryByRole('dialog', { name: 'Menu' })).not.toBeInTheDocument()
    expect(await screen.findByRole('heading', { level: 1, name: "Women's running" })).toBeInTheDocument()
  })
})
