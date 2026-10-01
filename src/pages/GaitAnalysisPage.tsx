import { CalendarX2 } from 'lucide-react'
import { ButtonLink } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { site } from '../config/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

/**
 * Informational page for the About CTA "Book gait analysis". There is no
 * booking service behind this site, so it explains how the clinic works
 * (as described in About.png) without pretending to take a booking.
 */
const steps = [
  { title: 'Free, every Saturday', body: 'Our in-store clinic runs free gait analysis and injury consults every Saturday.' },
  { title: 'Led by a physio', body: 'Jamie Roy — sports physio and coach with two decades in the sport — runs the clinic.' },
  { title: 'Fitted properly', body: 'We watch you run, talk through your goals, then fit shoes that suit your stride.' },
]

export default function GaitAnalysisPage() {
  useDocumentTitle('Gait analysis')
  return (
    <div className="pb-20 md:pb-24">
      <PageHeader title="Gait analysis" crumb="Gait analysis" intro="Find the right shoe for the way you run." />
      <div className="container-site">
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="bg-white p-8">
              <span aria-hidden className="text-5xl font-extrabold tracking-[-0.04em] text-orange">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-4 text-xl font-bold">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-body">{s.body}</p>
            </li>
          ))}
        </ol>

        <div role="note" className="on-dark mt-10 flex flex-col gap-6 bg-ink p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
          <div className="flex gap-4">
            <CalendarX2 aria-hidden className="size-7 shrink-0 text-lime" />
            <div>
              <h2 className="text-xl font-bold">Online booking isn&apos;t available yet</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80">
                This demo site doesn&apos;t have a booking system, so no appointment can be made here. Ask the team in the{' '}
                {site.store.city} shop on {site.store.street} to arrange a slot.
              </p>
            </div>
          </div>
          <ButtonLink to="/about#visit" variant="lime" arrow className="shrink-0">
            Find the store
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}
