import { screen, within } from '@testing-library/react'
import { products } from '../data/products'
import { cartCount, cartTotal, MAX_QUANTITY, useCart } from '../store/cart'
import { renderApp, resetStores } from './utils'

const arrivalsGrid = () => screen.getByRole('region', { name: /new arrivals for the run/i })

describe('New arrivals filters', () => {
  it('shows four "New In" products by default and filters by tab', async () => {
    const { user } = renderApp('/')
    const section = arrivalsGrid()
    expect(within(section).getByRole('button', { name: 'New In' })).toHaveAttribute('aria-pressed', 'true')
    expect(within(section).getAllByRole('article')).toHaveLength(4)
    expect(within(section).getByRole('link', { name: 'Cloudmonster 3 — Hyper Lily' })).toBeInTheDocument()

    await user.click(within(section).getByRole('button', { name: 'Trail' }))
    expect(within(section).getByRole('button', { name: 'Trail' })).toHaveAttribute('aria-pressed', 'true')
    const names = within(section).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    const trailNames = products.filter((p) => p.tags.includes('trail')).slice(0, 4).map((p) => p.name)
    expect(names).toEqual(trailNames)
  })
})

describe('Wishlist', () => {
  it('toggles a product and lists it on the wishlist page', async () => {
    const { user } = renderApp('/')
    const btn = within(arrivalsGrid()).getByRole('button', { name: /add on cloudmonster 3 — hyper lily to wishlist/i })
    expect(btn).toHaveAttribute('aria-pressed', 'false')
    await user.click(btn)
    expect(btn).toHaveAttribute('aria-pressed', 'true')
    expect(btn).toHaveAccessibleName(/remove on cloudmonster 3/i)
    expect(await screen.findByText(/saved cloudmonster 3/i)).toBeInTheDocument()
  })

  it('shows an empty state when nothing is saved', async () => {
    renderApp('/wishlist')
    expect(await screen.findByText(/your wishlist is empty/i)).toBeInTheDocument()
  })
})

describe('Product page and cart', () => {
  it('requires a size, then adds to the bag and opens the drawer', async () => {
    const { user } = renderApp('/product/nike-vaporfly-4-volt-ice')
    expect(await screen.findByRole('heading', { level: 1, name: 'Vaporfly 4 — Volt Ice' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /add to bag/i }))
    expect(screen.getByRole('alert')).toHaveTextContent(/select a size/i)
    expect(useCart.getState().lines).toHaveLength(0)

    await user.click(screen.getByRole('radio', { name: '9' }))
    await user.click(screen.getByRole('button', { name: /add to bag/i }))
    const drawer = screen.getByRole('dialog', { name: /your bag/i })
    expect(within(drawer).getByText('Vaporfly 4 — Volt Ice')).toBeInTheDocument()
    expect(within(drawer).getByText('Size: UK 9')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /open bag, 1 item/i })).toBeInTheDocument()
  })

  it('changes quantity, updates totals and shows the empty state after removal', async () => {
    const { user } = renderApp('/')
    useCart.getState().add('paceline-race-belt')
    await user.click(screen.getByRole('button', { name: /open bag/i }))
    const drawer = screen.getByRole('dialog', { name: /your bag/i })

    await user.click(within(drawer).getByRole('button', { name: 'Increase quantity' }))
    await user.click(within(drawer).getByRole('button', { name: 'Increase quantity' }))
    expect(useCart.getState().lines[0].quantity).toBe(3)
    expect(within(drawer).getAllByText('£54').length).toBeGreaterThan(0)

    await user.click(within(drawer).getByRole('button', { name: 'Decrease quantity' }))
    expect(useCart.getState().lines[0].quantity).toBe(2)

    await user.click(within(drawer).getByRole('button', { name: /remove paceline race belt/i }))
    expect(within(drawer).getByText(/your bag is empty/i)).toBeInTheDocument()
  })

  it('keeps focus inside the drawer and closes it with Escape', async () => {
    const { user } = renderApp('/')
    const trigger = screen.getByRole('button', { name: /open bag/i })
    await user.click(trigger)
    const drawer = screen.getByRole('dialog', { name: /your bag/i })
    expect(drawer).toHaveAttribute('aria-modal', 'true')
    expect(drawer.contains(document.activeElement)).toBe(true)
    for (let i = 0; i < 5; i++) {
      await user.tab()
      expect(drawer.contains(document.activeElement)).toBe(true)
    }
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: /your bag/i })).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })
})

describe('Cart store', () => {
  beforeEach(resetStores)

  it('merges lines, caps quantity and ignores unavailable products', () => {
    const { add, setQuantity } = useCart.getState()
    add('paceline-race-belt')
    add('paceline-race-belt', undefined, 3)
    add('nike-vaporfly-4-volt-ice', '9')
    add('nike-vaporfly-4-volt-ice', '10')
    add('hoka-speedgoat-6', '9') // sold out in demo data
    const { lines } = useCart.getState()
    expect(lines).toHaveLength(3)
    expect(cartCount(lines)).toBe(6)
    expect(cartTotal(lines)).toBe(18 * 4 + 240 * 2)

    setQuantity('paceline-race-belt', undefined, 99)
    expect(useCart.getState().lines[0].quantity).toBe(MAX_QUANTITY)
    setQuantity('paceline-race-belt', undefined, 0)
    expect(useCart.getState().lines).toHaveLength(2)
  })
})

describe('Search', () => {
  it('finds products by brand, handles no results and clears', async () => {
    const { user } = renderApp('/')
    await user.click(screen.getByRole('button', { name: 'Search products' }))
    const dialog = screen.getByRole('dialog', { name: /search the shop/i })
    const input = within(dialog).getByRole('searchbox')
    expect(input).toHaveFocus()

    await user.type(input, 'hoka')
    expect(await within(dialog).findByText(/2 results for “hoka”/i)).toBeInTheDocument()
    expect(within(dialog).getByRole('link', { name: /tecton x 4/i })).toBeInTheDocument()

    await user.keyboard('{ArrowDown}')
    expect(within(dialog).getAllByRole('link')[0]).toHaveFocus()

    await user.clear(input)
    await user.type(input, 'zzzz')
    expect(await within(dialog).findByText(/no products match “zzzz”/i)).toBeInTheDocument()

    await user.click(within(dialog).getByRole('button', { name: 'Clear' }))
    expect(input).toHaveValue('')
  })

  it('filters a collection by query and shows an empty state', async () => {
    const { user } = renderApp('/shop/footwear?q=vaporfly')
    expect(await screen.findByText(/1 product matching “vaporfly”/i)).toBeInTheDocument()
    await user.clear(screen.getByRole('searchbox', { name: /search within footwear/i }))
    await user.type(screen.getByRole('searchbox', { name: /search within footwear/i }), 'nothing-here')
    expect(screen.getByText(/no products match your filters/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /clear filters/i }))
    expect(screen.getByText(new RegExp(`${products.filter((p) => p.category === 'footwear').length} products`))).toBeInTheDocument()
  })
})
