import { founders } from '../../data/about'
import { SectionHeader } from '../ui/SectionHeader'

export function FoundersSection() {
  return (
    <section aria-labelledby="founders-title" className="container-site py-20 md:pt-[138px] md:pb-24">
      <SectionHeader id="founders-title" eyebrow="05 · Meet the founders" title="The people behind the shop." />
      <ul className="mt-10 grid gap-5 md:mt-[50px] md:grid-cols-2 md:gap-6">
        {founders.map((f) => (
          <li key={f.name} className="flex flex-col bg-white">
            <div className="relative">
              <img
                src={f.image}
                alt={f.alt}
                width={644}
                height={460}
                loading="lazy"
                decoding="async"
                className="aspect-[644/460] w-full object-cover"
              />
              <span className="absolute bottom-5 left-5 rounded-full bg-lime px-3.5 py-1.5 text-[11px] font-bold text-ink sm:bottom-9 sm:left-8">
                {f.badge}
              </span>
            </div>
            <div className="flex-1 px-6 pt-8 pb-10 sm:px-10 sm:pt-[38px] sm:pb-12">
              <h3 className="text-[28px] leading-tight font-bold tracking-[-0.025em]">{f.name}</h3>
              <p className="mt-2 text-[13px] font-medium tracking-[0.08em] text-orange-ink">{f.role}</p>
              <p className="mt-4 text-[15px] leading-[1.65] text-body">{f.bio}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
