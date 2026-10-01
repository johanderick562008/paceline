import { ButtonLink } from '../ui/Button'

export function CtaSection() {
  return (
    <section aria-labelledby="cta-title" className="bg-lime px-5 py-20 text-center text-ink md:pt-[100px] md:pb-[100px]">
      <p className="text-[11px] font-bold tracking-[0.24em] uppercase">Ready to run?</p>
      <h2
        id="cta-title"
        className="mx-auto mt-8 max-w-[960px] text-[3rem] leading-[0.98] font-black tracking-[-0.05em] sm:text-[4.5rem] md:mt-[34px] lg:text-[5.75rem]"
      >
        Come find your next pair of shoes.
      </h2>
      <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row md:mt-[34px]">
        <ButtonLink to="/shop/footwear" variant="ink" className="min-h-[52px]">
          Shop footwear
        </ButtonLink>
        <ButtonLink to="/gait-analysis" variant="outline-dark" className="min-h-[54px]">
          Book gait analysis
        </ButtonLink>
      </div>
    </section>
  )
}
