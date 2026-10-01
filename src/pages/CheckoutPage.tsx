import { Link } from 'react-router'
import { Info } from 'lucide-react'
import { ButtonLink } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { site } from '../config/site'
import { getProduct } from '../data/products'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { cartTotal, useCart } from '../store/cart'
import { formatPrice } from '../utils/format'

/**
 * Order summary only. No payment provider is configured for this project, so
 * there is deliberately no payment form and no order is created.
 */
export default function CheckoutPage() {
  useDocumentTitle('Checkout')
  const lines = useCart((s) => s.lines)
  const total = cartTotal(lines)
  const freeDelivery = total >= site.freeDeliveryThreshold

  return (
    <div className="pb-20 md:pb-24">
      <PageHeader title="Checkout" crumb="Checkout" />
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_380px]">
        <div role="note" className="flex h-fit gap-4 border border-ink bg-white p-6">
          <Info aria-hidden className="size-6 shrink-0 text-orange-ink" />
          <div>
            <h2 className="text-lg font-bold">Online checkout isn&apos;t available in this demo</h2>
            <p className="mt-2 text-sm leading-relaxed text-body">
              This is a frontend design project with no payment provider connected, so no payment can be taken and no order will
              be placed. Your bag is stored only in this browser. To buy any of these products, please visit the shop in{' '}
              {site.store.city}.
            </p>
            <Link to="/about#visit" className="mt-4 inline-block text-[11px] font-bold tracking-[0.14em] uppercase underline underline-offset-4">
              Find the store
            </Link>
          </div>
        </div>

        <section aria-labelledby="summary-title" className="bg-cream-light p-6">
          <h2 id="summary-title" className="text-lg font-bold">
            Order summary
          </h2>
          {lines.length === 0 ? (
            <div className="mt-4">
              <p className="text-sm text-muted">Your bag is empty.</p>
              <ButtonLink to="/shop/new" variant="ink" className="mt-4 w-full">
                Shop new arrivals
              </ButtonLink>
            </div>
          ) : (
            <>
              <ul className="mt-4 divide-y divide-line">
                {lines.map((l) => {
                  const p = getProduct(l.productId)
                  if (!p) return null
                  return (
                    <li key={`${l.productId}-${l.size ?? ''}`} className="flex justify-between gap-4 py-3 text-sm">
                      <span>
                        {p.brand} {p.name}
                        {l.size && <span className="text-muted"> · UK {l.size}</span>}
                        <span className="text-muted"> × {l.quantity}</span>
                      </span>
                      <span className="font-semibold whitespace-nowrap">{formatPrice(p.price * l.quantity)}</span>
                    </li>
                  )
                })}
              </ul>
              <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="font-semibold">{formatPrice(total)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Delivery</dt>
                  <dd>{freeDelivery ? 'Free (UK)' : 'Calculated at checkout'}</dd>
                </div>
              </dl>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
