import { Heart } from 'lucide-react'
import { useUi } from '../../store/ui'
import { useWishlist } from '../../store/wishlist'
import type { Product } from '../../types'
import { cn } from '../../utils/format'

interface WishlistButtonProps {
  product: Product
  className?: string
  withLabel?: boolean
}

export function WishlistButton({ product, className, withLabel }: WishlistButtonProps) {
  const active = useWishlist((s) => s.ids.includes(product.id))
  const toggle = useWishlist((s) => s.toggle)
  const notify = useUi((s) => s.notify)
  const name = `${product.brand} ${product.name}`

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={withLabel ? undefined : active ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
      onClick={() => {
        toggle(product.id)
        notify(active ? `Removed ${product.name} from your wishlist` : `Saved ${product.name} to your wishlist`)
      }}
      className={cn('inline-flex items-center justify-center gap-2 transition-transform active:scale-90', className)}
    >
      <Heart
        aria-hidden
        className={cn('size-[18px] transition-colors', active ? 'fill-sale text-sale' : 'text-ink')}
        strokeWidth={1.75}
      />
      {/* Label stays constant; the pressed state is exposed via aria-pressed and the filled heart. */}
      {withLabel && <span>Wishlist</span>}
    </button>
  )
}
