import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { CircleAlert, RotateCcw, Truck } from 'lucide-react'
import { ProductBadge } from '../components/shop/ProductCard'
import { ProductGrid } from '../components/shop/ProductGrid'
import { WishlistButton } from '../components/shop/WishlistButton'
import { Button } from '../components/ui/Button'
import { site } from '../config/site'
import { getProduct, products } from '../data/products'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useCart } from '../store/cart'
import { useUi } from '../store/ui'
import { cn, formatPrice } from '../utils/format'
import NotFoundPage from './NotFoundPage'

export default function ProductPage() {
  const { id } = useParams()
  const product = getProduct(id)
  useDocumentTitle(product ? `${product.brand} ${product.name}` : 'Product not found')
  // Remount the purchase form when navigating between products so size state resets.
  if (!product) return <NotFoundPage />
  return <ProductDetails key={product.id} productId={product.id} />
}

function ProductDetails({ productId }: { productId: string }) {
  const product = getProduct(productId)!
  const [size, setSize] = useState<string>()
  const [sizeError, setSizeError] = useState(false)
  const add = useCart((s) => s.add)
  const notify = useUi((s) => s.notify)
  const setCartOpen = useUi((s) => s.setCartOpen)
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)

  const addToBag = () => {
    if (product.sizes && !size) {
      setSizeError(true)
      return
    }
    add(product.id, size)
    notify(`Added ${product.name}${size ? ` (UK ${size})` : ''} to your bag`)
    setCartOpen(true)
  }

  return (
    <div className="pb-20 md:pb-24">
      <div className="container-site pt-8 md:pt-12">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-2 text-[11px] font-medium tracking-[0.16em] text-muted uppercase">
            <li>
              <Link to="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link to={`/shop/${product.category}`} className="hover:text-ink">
                {product.category}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <span aria-current="page">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-20">
          <div className="relative self-start bg-[#e9a85a]">
            <img
              src={product.image}
              alt={product.imageAlt}
              width={626}
              height={680}
              className="aspect-[313/340] w-full object-cover"
            />
            <ProductBadge badge={product.badge} className="absolute top-5 left-5" />
          </div>

          <div className="md:pt-4">
            <p className="text-sm text-muted">{product.brand}</p>
            <h1 className="mt-1 text-3xl leading-tight font-bold tracking-[-0.03em] sm:text-4xl">{product.name}</h1>
            <p className="mt-3 text-xl font-bold">
              {product.originalPrice && (
                <>
                  <span className="sr-only">Was </span>
                  <s className="mr-2 font-normal text-muted">{formatPrice(product.originalPrice)}</s>
                  <span className="sr-only">now </span>
                </>
              )}
              {formatPrice(product.price)}
            </p>
            <p className="mt-6 max-w-prose leading-relaxed text-body">{product.description}</p>

            {product.sizes && (
              <fieldset className="mt-8" aria-describedby={sizeError ? 'size-error' : undefined}>
                <legend className="text-[11px] font-bold tracking-[0.14em] uppercase">Select UK size</legend>
                <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
                  {product.sizes.map((s) => (
                    <label key={s} className="relative">
                      <input
                        type="radio"
                        name="size"
                        value={s}
                        checked={size === s}
                        onChange={() => {
                          setSize(s)
                          setSizeError(false)
                        }}
                        className="peer sr-only"
                      />
                      <span
                        className={cn(
                          'flex min-h-11 cursor-pointer items-center justify-center border text-sm font-medium transition-colors',
                          'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange-ink',
                          size === s ? 'border-ink bg-ink text-white' : 'border-line-strong hover:border-ink',
                        )}
                      >
                        {s}
                      </span>
                    </label>
                  ))}
                </div>
                {sizeError && (
                  <p id="size-error" role="alert" className="mt-3 flex items-center gap-2 text-sm font-medium text-orange-ink">
                    <CircleAlert aria-hidden className="size-4" /> Please select a size.
                  </p>
                )}
              </fieldset>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="ink" arrow onClick={addToBag} disabled={!product.available} className="sm:flex-1">
                {product.available ? 'Add to bag' : 'Sold out'}
              </Button>
              <WishlistButton
                product={product}
                withLabel
                className="min-h-12 border-[1.5px] border-ink px-6 text-[13px] font-bold tracking-[0.12em] uppercase hover:bg-white"
              />
            </div>

            <ul className="mt-8 space-y-3 border-t border-line pt-6 text-sm text-body">
              <li className="flex items-center gap-3">
                <Truck aria-hidden className="size-5 shrink-0" strokeWidth={1.5} /> Free UK delivery over {formatPrice(site.freeDeliveryThreshold)}
              </li>
              <li className="flex items-center gap-3">
                <RotateCcw aria-hidden className="size-5 shrink-0" strokeWidth={1.5} /> 30-day returns
              </li>
            </ul>
            <p className="mt-6 text-xs text-muted">
              Demo product: name, price, sizes and availability are sample content. The photo is the single product image supplied
              with the design and is shared across demo footwear.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="container-site pt-20 md:pt-28">
          <h2 id="related-title" className="text-[2rem] font-bold tracking-[-0.03em]">
            You might also like
          </h2>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  )
}
