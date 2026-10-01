import { Heart } from 'lucide-react'
import { ProductGrid } from '../components/shop/ProductGrid'
import { ButtonLink } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { products } from '../data/products'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useWishlist } from '../store/wishlist'

export default function WishlistPage() {
  useDocumentTitle('Wishlist')
  const ids = useWishlist((s) => s.ids)
  const saved = products.filter((p) => ids.includes(p.id))

  return (
    <div className="pb-20 md:pb-24">
      <PageHeader title="Wishlist" crumb="Wishlist" intro="Saved on this device only — your wishlist isn't synced to an account." />
      <div className="container-site">
        <ProductGrid
          products={saved}
          empty={
            <div className="flex flex-col items-center gap-3">
              <Heart aria-hidden className="size-9 text-muted" strokeWidth={1.25} />
              <p className="text-lg font-semibold">Your wishlist is empty.</p>
              <p className="text-sm text-muted">Tap the heart on any product to save it for later.</p>
              <ButtonLink to="/shop/new" variant="ink" arrow className="mt-3">
                Browse new arrivals
              </ButtonLink>
            </div>
          }
        />
      </div>
    </div>
  )
}
