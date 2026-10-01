import type { ReactNode } from 'react'
import type { Product } from '../../types'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  empty?: ReactNode
  eager?: boolean
}

export function ProductGrid({ products, empty, eager }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div role="status" className="border border-dashed border-line-strong px-6 py-16 text-center">
        {empty ?? <p className="font-semibold">No products found.</p>}
      </div>
    )
  }
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
      {products.map((p) => (
        <li key={p.id}>
          <ProductCard product={p} eager={eager} />
        </li>
      ))}
    </ul>
  )
}
