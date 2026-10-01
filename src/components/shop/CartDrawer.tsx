import { Link } from 'react-router'
import { Minus, Plus, ShoppingCart, X } from 'lucide-react'
import { site } from '../../config/site'
import { getProduct } from '../../data/products'
import { cartCount, cartTotal, MAX_QUANTITY, useCart } from '../../store/cart'
import { useUi } from '../../store/ui'
import { formatPrice } from '../../utils/format'
import { ButtonLink } from '../ui/Button'
import { Dialog } from '../ui/Dialog'

export function CartDrawer() {
  const open = useUi((s) => s.cartOpen)
  const setOpen = useUi((s) => s.setCartOpen)
  const notify = useUi((s) => s.notify)
  const { lines, setQuantity, remove } = useCart()
  const close = () => setOpen(false)
  const count = cartCount(lines)
  const total = cartTotal(lines)
  const toFreeDelivery = site.freeDeliveryThreshold - total

  return (
    <Dialog open={open} onClose={close} labelledBy="cart-title" placement="right">
      <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
        <h2 id="cart-title" className="text-xl font-bold tracking-tight">
          Your bag <span className="font-medium text-muted">({count})</span>
        </h2>
        <button type="button" onClick={close} aria-label="Close bag" className="-mr-2.5 inline-flex size-11 items-center justify-center">
          <X aria-hidden className="size-6" strokeWidth={1.75} />
        </button>
      </div>

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
          <ShoppingCart aria-hidden className="size-10 text-muted" strokeWidth={1.25} />
          <p className="text-lg font-semibold">Your bag is empty.</p>
          <p className="max-w-xs text-sm text-muted">Find your next pair — new arrivals are dropping weekly.</p>
          <ButtonLink to="/shop/new" onClick={close} variant="ink" arrow className="mt-2">
            Shop new arrivals
          </ButtonLink>
        </div>
      ) : (
        <>
          <p className="bg-ink px-5 py-2.5 text-[11px] font-semibold tracking-[0.08em] text-lime uppercase sm:px-6">
            {toFreeDelivery > 0
              ? `${formatPrice(toFreeDelivery)} away from free UK delivery`
              : 'You qualify for free UK delivery'}
          </p>
          <ul className="flex-1 divide-y divide-line px-5 sm:px-6" aria-label="Items in your bag">
            {lines.map((line) => {
              const product = getProduct(line.productId)
              if (!product) return null
              const label = `${product.brand} ${product.name}${line.size ? `, size ${line.size}` : ''}`
              return (
                <li key={`${line.productId}-${line.size ?? ''}`} className="flex gap-4 py-5">
                  <Link to={`/product/${product.id}`} onClick={close} className="shrink-0">
                    <img src={product.image} alt="" width={88} height={96} className="h-24 w-22 object-cover" />
                    <span className="sr-only">{label}</span>
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs text-muted">{product.brand}</p>
                        <p className="font-medium leading-snug">{product.name}</p>
                        {line.size && <p className="mt-0.5 text-xs text-muted">Size: UK {line.size}</p>}
                      </div>
                      <p className="font-bold whitespace-nowrap">{formatPrice(product.price * line.quantity)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-line-strong" role="group" aria-label={`Quantity for ${label}`}>
                        <button
                          type="button"
                          className="inline-flex size-9 items-center justify-center hover:bg-white disabled:opacity-40"
                          aria-label="Decrease quantity"
                          disabled={line.quantity <= 1}
                          onClick={() => setQuantity(line.productId, line.size, line.quantity - 1)}
                        >
                          <Minus aria-hidden className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          className="inline-flex size-9 items-center justify-center hover:bg-white disabled:opacity-40"
                          aria-label="Increase quantity"
                          disabled={line.quantity >= MAX_QUANTITY}
                          onClick={() => setQuantity(line.productId, line.size, line.quantity + 1)}
                        >
                          <Plus aria-hidden className="size-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="min-h-9 text-xs font-semibold underline underline-offset-4 hover:text-orange-ink"
                        aria-label={`Remove ${label}`}
                        onClick={() => {
                          remove(line.productId, line.size)
                          notify(`Removed ${product.name} from your bag`)
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="sticky bottom-0 border-t border-line bg-cream px-5 py-5 sm:px-6">
            <dl className="flex items-center justify-between text-lg font-bold">
              <dt>Subtotal</dt>
              <dd>{formatPrice(total)}</dd>
            </dl>
            <p className="mt-1 text-xs text-muted">Demo bag — prices are sample values. Delivery calculated at checkout.</p>
            <ButtonLink to="/checkout" onClick={close} variant="ink" arrow className="mt-4 w-full">
              Checkout
            </ButtonLink>
          </div>
        </>
      )}
    </Dialog>
  )
}
