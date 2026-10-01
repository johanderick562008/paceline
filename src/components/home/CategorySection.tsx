import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { categoryCards } from '../../data/collections'
import { ArrowLink } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'

export function CategorySection() {
  return (
    <section aria-labelledby="categories-title" className="container-site pt-16 md:pt-[103px]">
      <SectionHeader
        id="categories-title"
        eyebrow="01 · Shop by category"
        title="Every discipline. Every distance."
        action={
          <ArrowLink to="/shop/all" className="lg:mb-3">
            View all collections
          </ArrowLink>
        }
      />
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:mt-10 lg:grid-cols-4">
        {categoryCards.map((c) => (
          <li key={c.slug}>
            <Link
              to={`/shop/${c.slug}`}
              className="group on-dark relative block aspect-[313/420] overflow-hidden bg-ink text-white"
            >
              <img
                src={c.image}
                alt=""
                width={313}
                height={420}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4 sm:p-6 sm:pb-[22px]">
                <span className="block text-lg leading-tight font-bold tracking-[-0.02em] sm:text-2xl">{c.title}</span>
                <span className="mt-1.5 hidden text-[13px] text-white/85 sm:block">{c.blurb}</span>
                <span className="mt-2 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] text-lime uppercase">
                  Shop
                  <ArrowRight aria-hidden className="size-3 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
