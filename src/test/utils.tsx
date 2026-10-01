import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import App from '../App'
import { useCart } from '../store/cart'
import { useUi } from '../store/ui'
import { useWishlist } from '../store/wishlist'

export function resetStores() {
  useCart.setState({ lines: [] })
  useWishlist.setState({ ids: [] })
  useUi.setState({ cartOpen: false, searchOpen: false, toast: null })
}

export function renderApp(route = '/') {
  resetStores()
  const user = userEvent.setup()
  const utils = render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  )
  return { user, ...utils }
}
