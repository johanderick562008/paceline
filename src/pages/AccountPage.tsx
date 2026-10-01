import { Link } from 'react-router'
import { Heart, ShoppingCart } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { cartCount, useCart } from '../store/cart'
import { useUi } from '../store/ui'
import { useWishlist } from '../store/wishlist'

export default function AccountPage() {
  useDocumentTitle('Account')
  const bagCount = useCart((s) => cartCount(s.lines))
  const wishCount = useWishlist((s) => s.ids.length)
  const setCartOpen = useUi((s) => s.setCartOpen)
  const tile = 'flex items-center gap-4 bg-white p-6 text-left transition-colors hover:bg-cream-light'

  return (
    <div className="pb-20 md:pb-24">
      <PageHeader
        title="Your account"
        crumb="Account"
        intro="Accounts aren't part of this demo site yet — there is no sign-in and no data leaves your browser. Your bag and wishlist are saved on this device."
      />
      <div className="container-site grid gap-4 sm:grid-cols-2 lg:max-w-3xl lg:px-0">
        <button type="button" className={tile} onClick={() => setCartOpen(true)}>
          <ShoppingCart aria-hidden className="size-6" strokeWidth={1.5} />
          <span>
            <span className="block font-bold">Your bag</span>
            <span className="text-sm text-muted">
              {bagCount} {bagCount === 1 ? 'item' : 'items'}
            </span>
          </span>
        </button>
        <Link to="/wishlist" className={tile}>
          <Heart aria-hidden className="size-6" strokeWidth={1.5} />
          <span>
            <span className="block font-bold">Wishlist</span>
            <span className="text-sm text-muted">
              {wishCount} saved {wishCount === 1 ? 'product' : 'products'}
            </span>
          </span>
        </Link>
      </div>
    </div>
  )
}
