import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { brands, products } from '../data/products'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function BrandsPage() {
  useDocumentTitle('Brands')
  return (
    <div className="pb-20 md:pb-24">
      <PageHeader
        title="Brands"
        crumb="Brands"
        intro="The shop stocks 40+ brands. These are the brands in this demo catalogue — every one tested and vouched for by the team."
      />
      <div className="container-site">
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {brands.map((b) => {
          const count = products.filter((p) => p.brand === b).length
          return (
            <li key={b} className="bg-cream">
              <Link to={`/shop/all?brand=${encodeURIComponent(b)}`} className="group flex items-center justify-between p-6 transition-colors hover:bg-white">
                <span>
                  <span className="block text-2xl font-bold tracking-[-0.02em]">{b}</span>
                  <span className="text-sm text-muted">
                    {count} {count === 1 ? 'product' : 'products'}
                  </span>
                </span>
                <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          )
        })}
        </ul>
      </div>
    </div>
  )
}
