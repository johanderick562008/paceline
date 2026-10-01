// Served from /public so index.html can preload it before the JS bundle runs.
const heroLarge = '/images/hero-1440.webp'
const heroSmall = '/images/hero-800.webp'
import { Button, ButtonLink } from '../ui/Button'

/**
 * Home.png shows a three-bar slide indicator in the hero. Only one hero image
 * was supplied, so we render the indicator as decoration (first bar active)
 * rather than inventing extra campaigns. See README → "Inferred behaviour".
 */
const INDICATOR_BARS = 3

export function HeroSection() {
  const scrollToArrivals = () => {
    const target = document.getElementById('new-arrivals')
    target?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })
    target?.focus({ preventScroll: true })
  }

  return (
    <section aria-labelledby="hero-title" className="on-dark relative isolate flex min-h-[600px] items-center overflow-hidden text-white md:h-[720px] md:min-h-0">
      {/* srcSet/sizes must match the preload in index.html so only one file is fetched. */}
      <img
        src={heroLarge}
        srcSet={`${heroSmall} 800w, ${heroLarge} 1440w`}
        sizes="100vw"
        alt="A runner in a white T-shirt strides across pale desert hills beneath a blue sky"
        width={1440}
        height={720}
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full object-cover object-[72%_center] md:object-center"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/40 md:bg-ink/25" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/45 via-ink/15 to-transparent md:from-ink/30 md:via-transparent"
      />

      <div className="container-site py-16 md:pt-[24px] md:pb-0">
        <div className="md:pl-8">
          <p className="text-xs font-bold tracking-[0.2em] text-lime uppercase sm:text-[13px]">Autumn / Winter ’26 Collection</p>
          <h1
            id="hero-title"
            className="display mt-4 text-[3.5rem] leading-[0.92] sm:text-[5.5rem] md:mt-[22px] lg:text-[7.25rem]"
          >
            Chase{' '}
            <br />
            Every Second.
          </h1>
          <p className="mt-6 max-w-[34rem] text-base leading-[1.5] text-white/90 sm:text-lg md:mt-[26px]">
            Race-day gear, trail-tested essentials, and everyday kit — curated by runners, worn on every terrain.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row md:mt-[64px]">
            <Button variant="lime" arrow onClick={scrollToArrivals}>
              Shop new arrivals
            </Button>
            <ButtonLink to="/about" variant="outline-light" className="min-h-[54px]">
              Read our story
            </ButtonLink>
          </div>
        </div>
      </div>

      <div aria-hidden className="absolute right-5 bottom-8 flex gap-2 sm:right-8 xl:right-[84px] xl:bottom-[57px]">
        {Array.from({ length: INDICATOR_BARS }, (_, i) => (
          <span key={i} className={i === 0 ? 'h-[3px] w-8 bg-white' : 'h-[3px] w-3 bg-white/50'} />
        ))}
      </div>
    </section>
  )
}
