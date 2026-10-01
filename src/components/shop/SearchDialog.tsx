import { useDeferredValue, useRef, useState, type KeyboardEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { Search, X } from 'lucide-react'
import { searchProducts } from '../../data/products'
import { useUi } from '../../store/ui'
import { formatPrice } from '../../utils/format'
import { Dialog } from '../ui/Dialog'

const SUGGESTIONS = ['Hoka', 'Trail', 'Vaporfly', 'Singlet']

export function SearchDialog() {
  const open = useUi((s) => s.searchOpen)
  const setOpen = useUi((s) => s.setSearchOpen)
  const close = () => setOpen(false)
  return (
    <Dialog open={open} onClose={close} labelledBy="search-title" placement="top">
      <SearchPanel onClose={close} />
    </Dialog>
  )
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const deferred = useDeferredValue(query)
  const results = searchProducts(deferred).slice(0, 6)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const navigate = useNavigate()

  const focusResult = (index: number) => {
    const links = listRef.current?.querySelectorAll<HTMLAnchorElement>('a')
    if (!links?.length) return
    if (index < 0) return inputRef.current?.focus()
    links[Math.min(index, links.length - 1)].focus()
  }

  const onResultKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    const links = [...(listRef.current?.querySelectorAll('a') ?? [])]
    const current = links.indexOf(document.activeElement as HTMLAnchorElement)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      focusResult(current + 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      focusResult(current - 1)
    }
  }

  const submit = () => {
    const q = query.trim()
    if (!q) return
    onClose()
    navigate(`/shop/all?q=${encodeURIComponent(q)}`)
  }

  return (
    <div className="container-site py-5 sm:py-8">
      <div className="flex items-center justify-between">
        <h2 id="search-title" className="eyebrow text-orange-ink">
          Search the shop
        </h2>
        <button type="button" onClick={onClose} aria-label="Close search" className="-mr-2.5 inline-flex size-11 items-center justify-center">
          <X aria-hidden className="size-6" strokeWidth={1.75} />
        </button>
      </div>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        className="mt-2 flex items-center gap-3 border-b-2 border-ink pb-2"
      >
        <Search aria-hidden className="size-6 shrink-0" strokeWidth={1.75} />
        <label htmlFor="site-search" className="sr-only">
          Search products by name or brand
        </label>
        <input
          ref={inputRef}
          id="site-search"
          data-autofocus
          type="search"
          autoComplete="off"
          placeholder="Search shoes, brands, kit…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              focusResult(0)
            }
          }}
          aria-describedby="search-status"
          className="min-w-0 flex-1 bg-transparent py-2 text-2xl font-semibold tracking-tight placeholder:text-muted/70 focus:outline-none sm:text-3xl [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              inputRef.current?.focus()
            }}
            className="inline-flex min-h-11 items-center px-2 text-[11px] font-bold tracking-[0.14em] uppercase hover:text-orange-ink"
          >
            Clear
          </button>
        )}
      </form>

      <p id="search-status" role="status" className="mt-4 text-sm text-muted">
        {deferred.trim() === ''
          ? 'Type to search by product name or brand. Use the arrow keys to move through results.'
          : results.length === 0
            ? `No products match “${deferred.trim()}”. Try a brand like Hoka or Nike.`
            : `${results.length} ${results.length === 1 ? 'result' : 'results'} for “${deferred.trim()}”.`}
      </p>

      {deferred.trim() === '' && (
        <div className="mt-4 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQuery(s)}
              className="min-h-10 rounded-full border border-line-strong px-4 text-sm hover:border-ink"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {results.length > 0 && (
        <ul ref={listRef} className="mt-4 grid gap-2 sm:grid-cols-2">
          {results.map((p) => (
            <li key={p.id}>
              <Link
                to={`/product/${p.id}`}
                onClick={onClose}
                onKeyDown={onResultKeyDown}
                className="flex items-center gap-4 bg-white/60 p-2 transition-colors hover:bg-white focus-visible:bg-white"
              >
                <img src={p.image} alt="" width={64} height={64} className="size-16 shrink-0 object-cover" />
                <span className="min-w-0">
                  <span className="block text-xs text-muted">{p.brand}</span>
                  <span className="block truncate font-medium">{p.name}</span>
                  <span className="block text-sm font-bold">{formatPrice(p.price)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {query.trim() && (
        <button type="button" onClick={submit} className="mt-5 text-[11px] font-bold tracking-[0.14em] uppercase underline underline-offset-4">
          View all results
        </button>
      )}
    </div>
  )
}
