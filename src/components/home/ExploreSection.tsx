import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import male from '../../assets/Home/explore_section/image_male.webp'
import female from '../../assets/Home/explore_section/image_female.webp'
import { cn } from '../../utils/format'

const promos = [
  {
    to: '/shop/men',
    title: "Men's Running",
    blurb: 'Pyjamas & running kit from race-day heroes.',
    image: male,
    linkColor: 'text-[#ff8a5c]',
  },
  {
    to: '/shop/women',
    title: "Women's Running",
    blurb: '20% of profits from kits go to Girls Run Glasgow.',
    image: female,
    linkColor: 'text-lime',
  },
]

export function ExploreSection() {
  return (
    <section aria-label="Shop by collection" className="container-site grid gap-5 pt-20 md:grid-cols-2 md:gap-6 md:pt-24">
      {promos.map((p) => (
        <Link
          key={p.to}
          to={p.to}
          className="group on-dark relative block aspect-[4/3] overflow-hidden bg-ink text-white sm:aspect-[644/480]"
        >
          <img
            src={p.image}
            alt=""
            width={644}
            height={480}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-ink/5" />
          <span className="absolute inset-x-0 bottom-0 p-6 sm:p-10 sm:pb-[70px]">
            <h2 className="display text-[2rem] leading-none sm:text-[2.75rem]">{p.title}</h2>
            <span className="mt-3 block text-sm text-white/90 sm:mt-[18px] sm:text-[15px]">{p.blurb}</span>
            <span
              className={cn(
                'mt-6 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase sm:mt-[38px]',
                p.linkColor,
              )}
            >
              Shop now
              <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </span>
          </span>
        </Link>
      ))}
    </section>
  )
}
