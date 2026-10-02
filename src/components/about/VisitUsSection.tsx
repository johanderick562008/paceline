import map from '../../assets/About/visit_us_section/map.webp'
import { site } from '../../config/site'

/**
 * About.png shows "Visit us in" with the city left blank; the city comes from
 * the design's announcement bar ("Store: Glasgow"). No full postal address or
 * opening hours were supplied, so none are shown — edit `site.store` to add them.
 */
export function VisitUsSection() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="on-dark grid scroll-mt-20 bg-ink text-white md:grid-cols-2">
      <div className="flex items-center px-5 py-16 sm:px-8 md:px-12 lg:px-24">
        <div>
          <p className="eyebrow text-lime">04 · Come say hi</p>
          <h2 id="visit-title" className="display mt-6 text-[2.75rem] leading-[1.02] sm:text-[3.5rem] md:mt-[30px]">
            Visit us in{' '}
            <br />
            <span className="text-lime">{site.store.city}.</span>
          </h2>
          <p className="mt-6 max-w-sm text-base leading-[1.6] text-white/80">
            Find us on {site.store.street}. Pop in for a fitting, a free gait analysis or a chat about your next race.
          </p>
        </div>
      </div>
      <div className="relative">
      <img
        src={map}
        alt={`Illustrative street map with a marker showing the shop's location in ${site.store.city}`}
        width={720}
        height={720}
        loading="lazy"
        decoding="async"
        className="aspect-square size-full object-cover md:aspect-[720/695]"
      />
      {/* Location pin shown in About.png (not part of the supplied map asset). */}
      <span aria-hidden className="absolute top-[48%] left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-orange/30">
        <span className="size-[22px] rounded-full border-[3px] border-white bg-orange shadow" />
      </span>
      </div>
    </section>
  )
}
