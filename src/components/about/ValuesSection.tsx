import { values } from '../../data/about'
import { cn } from '../../utils/format'
import { SectionHeader } from '../ui/SectionHeader'

export function ValuesSection() {
  return (
    <section aria-labelledby="values-title" className="bg-cream-light py-20 md:py-[100px]">
      <div className="container-site">
        <SectionHeader id="values-title" eyebrow="02 · What we stand for" title="Three things we won't compromise on." />
        <ol className="mt-10 grid gap-5 md:mt-[58px] md:grid-cols-3 md:gap-6">
          {values.map((v, i) => (
            <li
              key={v.title}
              className="flex flex-col border border-transparent bg-white p-8 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-line md:p-10"
            >
              {/* The coloured numerals are decorative; list order is conveyed by <ol>. */}
              <span aria-hidden className={cn('text-[4rem] leading-none font-extrabold tracking-[-0.04em]', v.accent)}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 text-[22px] leading-tight font-bold tracking-[-0.02em] md:mt-[22px]">{v.title}</h3>
              <p className="mt-6 text-sm leading-[1.6] text-body md:mt-[46px]">{v.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
