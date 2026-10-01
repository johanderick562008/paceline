import { useState } from 'react'
import { arrivalTabs } from '../../data/collections'
import { products } from '../../data/products'
import type { ProductTag } from '../../types'
import { cn } from '../../utils/format'
import { ArrowLink } from '../ui/Button'
import { ProductGrid } from '../shop/ProductGrid'
import { SectionHeader } from '../ui/SectionHeader'

const GRID_SIZE = 4

export function ArrivalsSection() {
  const [active, setActive] = useState<ProductTag>('new')
  const visible = products.filter((p) => p.tags.includes(active)).slice(0, GRID_SIZE)
  const activeLabel = arrivalTabs.find((t) => t.id === active)?.label

  return (
    <section
      id="new-arrivals"
      tabIndex={-1}
      aria-labelledby="arrivals-title"
      className="container-site scroll-mt-24 pt-20 outline-none md:pt-[135px]"
    >
      <SectionHeader
        id="arrivals-title"
        eyebrow="02 · Just landed"
        title="New arrivals for the run."
        action={
          <div role="group" aria-label="Filter new arrivals" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 lg:mb-0.5">
            {arrivalTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                aria-pressed={active === tab.id}
                onClick={() => setActive(tab.id)}
                className={cn(
                  'min-h-[38px] shrink-0 rounded-full border px-[18px] text-[13px] font-medium whitespace-nowrap transition-colors',
                  active === tab.id ? 'border-ink bg-ink text-white' : 'border-line-strong hover:border-ink',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        }
      />
      <div className="mt-8 md:mt-10" aria-live="polite">
        <ProductGrid
          products={visible}
          empty={
            <>
              <p className="font-semibold">Nothing in {activeLabel} right now.</p>
              <p className="mt-1 text-sm text-muted">New stock lands weekly — check back soon.</p>
            </>
          }
        />
      </div>
      <div className="mt-8 flex justify-center md:hidden">
        <ArrowLink to="/shop/new">View all new arrivals</ArrowLink>
      </div>
    </section>
  )
}
