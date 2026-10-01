import { timeline } from '../../data/about'
import { SectionHeader } from '../ui/SectionHeader'

export function TimelineSection() {
  return (
    <section aria-labelledby="timeline-title" className="container-site py-20 md:pt-[100px] md:pb-[130px]">
      <SectionHeader id="timeline-title" eyebrow="03 · Ten seasons in" title="How we got here." />
      <ol className="mt-10 grid gap-10 sm:grid-cols-2 md:mt-[50px] lg:grid-cols-4 lg:gap-6">
        {timeline.map((m) => (
          <li key={m.year} className="border-t-2 border-line-strong pt-7 md:pt-[30px]">
            <p className="text-5xl leading-none font-extrabold tracking-[-0.04em] text-orange-display">
              <time dateTime={m.year}>{m.year}</time>
            </p>
            <h3 className="mt-6 text-xl font-bold tracking-[-0.02em] md:mt-[30px]">{m.title}</h3>
            <p className="mt-4 max-w-[280px] text-[13px] leading-[1.65] text-body md:mt-[22px]">{m.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
