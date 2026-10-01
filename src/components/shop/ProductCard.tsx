import { Link } from 'react-router'
import { useCart } from '../../store/cart'
import { useUi } from '../../store/ui'
import type { Product } from '../../types'
import { cn, formatPrice } from '../../utils/format'
import { WishlistButton } from './WishlistButton'

const overlayAction =
  'relative z-10 flex min-h-11 w-full items-center justify-center bg-ink/90 text-[11px] font-bold tracking-[0.14em] text-lime uppercase ' +
  'transition-opacity duration-200 hover:bg-ink [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100'

export function ProductBadge({ badge, className }: { badge: Product['badge']; className?: string }) {
  if (!badge) return null
  return (
    <span
      className={cn(
        'inline-block px-2.5 py-1 text-[10px] leading-none font-bold tracking-[0.12em] uppercase',
        badge === 'sale' ? 'bg-sale text-white' : 'bg-ink text-lime',
        className,
      )}
    >
      {badge}
    </span>
  )
}

export function ProductCard({ product, eager }: { product: Product; eager?: boolean }) {
  const add = useCart((s) => s.add)
  const notify = useUi((s) => s.notify)
  const setCartOpen = useUi((s) => s.setCartOpen)
  const href = `/product/${product.id}`

  return (
    <article className="group relative">
      <div className="relative aspect-[313/340] overflow-hidden bg-[#e9a85a]">
        <img
          src={product.image}
          alt={product.imageAlt}
          width={313}
          height={340}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <ProductBadge badge={product.badge} className="absolute top-4 left-4" />
        <WishlistButton product={product} className="absolute top-2 right-2 z-10 size-11" />
        <div className="absolute inset-x-0 bottom-0">
          {!product.available ? (
            <p className="flex min-h-11 items-center justify-center bg-cream/90 text-[11px] font-bold tracking-[0.14em] uppercase">
              Sold out
            </p>
          ) : product.sizes ? (
            <Link to={href} className={overlayAction} tabIndex={-1} aria-hidden>
              Select size
            </Link>
          ) : (
            <button
              type="button"
              className={overlayAction}
              onClick={() => {
                add(product.id)
                notify(`Added ${product.name} to your bag`)
                setCartOpen(true)
              }}
            >
              Add to bag<span className="sr-only">: {product.brand} {product.name}</span>
            </button>
          )}
        </div>
      </div>
      <div className="pt-[18px]">
        <p className="text-xs text-muted">{product.brand}</p>
        <h3 className="mt-1 text-[15px] leading-snug font-medium">
          <Link to={href} className="after:absolute after:inset-0 hover:underline hover:underline-offset-4">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-[15px] font-bold">
          {product.originalPrice && (
            <>
              <span className="sr-only">Was </span>
              <s className="mr-2 font-normal text-muted">{formatPrice(product.originalPrice)}</s>
              <span className="sr-only">now </span>
            </>
          )}
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  )
}
