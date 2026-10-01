import { useMemo } from 'react'
import { NavLink, useParams, useSearchParams } from 'react-router'
import { Search, X } from 'lucide-react'
import { ProductGrid } from '../components/shop/ProductGrid'
import { PageHeader } from '../components/ui/PageHeader'
import { collections, getCollection } from '../data/collections'
import { brands, products } from '../data/products'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { cn } from '../utils/format'
import NotFoundPage from './NotFoundPage'

const sorts = {
  featured: 'Featured',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
} as const
type SortKey = keyof typeof sorts

const chipSlugs = ['all', 'new', 'road', 'trail', 'footwear', 'apparel', 'accessories', 'sale']

const selectClass =
  'min-h-11 w-full border border-line-strong bg-cream px-3 text-sm focus:border-ink focus:outline-none sm:w-auto'

export default function CollectionPage() {
  const { slug } = useParams()
  const collection = getCollection(slug)
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const brand = params.get('brand') ?? ''
  const sortParam = params.get('sort') ?? 'featured'
  const sort: SortKey = sortParam in sorts ? (sortParam as SortKey) : 'featured'
  useDocumentTitle(collection?.title)

  const results = useMemo(() => {
    if (!collection) return []
    const needle = q.trim().toLowerCase()
    const list = products.filter(
      (p) =>
        collection.filter(p) &&
        (!brand || p.brand === brand) &&
        (!needle || `${p.brand} ${p.name}`.toLowerCase().includes(needle)),
    )
    if (sort === 'price-asc') return [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...list].sort((a, b) => b.price - a.price)
    return list
  }, [collection, q, brand, sort])

  if (!collection) return <NotFoundPage />

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }
  const hasFilters = Boolean(q || brand)

  return (
    <div className="pb-20 md:pb-24">
      <PageHeader title={collection.title} crumb={collection.title} intro={collection.description}>
        <nav aria-label="Collections" className="mt-8 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <ul className="flex gap-2">
            {[...chipSlugs, ...(chipSlugs.includes(collection.slug) ? [] : [collection.slug])].map((s) => {
              const c = collections.find((x) => x.slug === s)!
              return (
                <li key={s} className="shrink-0">
                  <NavLink
                    to={`/shop/${s}`}
                    className={({ isActive }) =>
                      cn(
                        'inline-flex min-h-[38px] items-center rounded-full border px-[18px] text-[13px] font-medium whitespace-nowrap transition-colors',
                        isActive ? 'border-ink bg-ink text-white' : 'border-line-strong hover:border-ink',
                      )
                    }
                  >
                    {c.title}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
      </PageHeader>

      <div className="container-site">
        <div className="flex flex-col gap-3 border-y border-line py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-xs">
            <label htmlFor="collection-search" className="sr-only">
              Search within {collection.title}
            </label>
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
            <input
              id="collection-search"
              type="search"
              value={q}
              placeholder="Search name or brand"
              onChange={(e) => update('q', e.target.value)}
              className="min-h-11 w-full border border-line-strong bg-cream pr-10 pl-9 text-sm focus:border-ink focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {q && (
              <button
                type="button"
                onClick={() => update('q', '')}
                aria-label="Clear search"
                className="absolute top-1/2 right-1 inline-flex size-9 -translate-y-1/2 items-center justify-center"
              >
                <X aria-hidden className="size-4" />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex items-center gap-2 text-sm">
              <span className="shrink-0 text-muted">Brand</span>
              <select value={brand} onChange={(e) => update('brand', e.target.value)} className={selectClass}>
                <option value="">All brands</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <span className="shrink-0 text-muted">Sort</span>
              <select value={sort} onChange={(e) => update('sort', e.target.value === 'featured' ? '' : e.target.value)} className={selectClass}>
                {Object.entries(sorts).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <p role="status" className="py-5 text-sm text-muted">
          {results.length} {results.length === 1 ? 'product' : 'products'}
          {q && <> matching “{q}”</>}
          {brand && <> from {brand}</>}
        </p>
        <ProductGrid
          products={results}
          eager
          empty={
            <>
              <p className="text-lg font-semibold">No products match your filters.</p>
              <p className="mt-1 text-sm text-muted">Try a different search or brand.</p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={() => setParams({}, { replace: true })}
                  className="mt-5 text-[11px] font-bold tracking-[0.14em] uppercase underline underline-offset-4"
                >
                  Clear filters
                </button>
              )}
            </>
          }
        />
        <p className="mt-12 text-xs text-muted">
          Demo catalogue: product names, prices and sizes are sample content for this design project, not live stock.
        </p>
      </div>
    </div>
  )
}
