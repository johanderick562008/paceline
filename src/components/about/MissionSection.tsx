export function MissionSection() {
  return (
    <section aria-labelledby="mission-title" className="container-site grid gap-8 py-20 md:grid-cols-[minmax(0,612px)_1fr] md:gap-6 md:pt-[150px] md:pb-[98px]">
      <div>
        <p className="eyebrow text-orange-ink">01 · Why we exist</p>
        <h2 id="mission-title" className="display mt-6 text-[2.75rem] leading-[1] sm:text-[4rem] md:mt-[24px]">
          We&apos;re all{' '}
          <br />
          about the run.
        </h2>
      </div>
      <div className="max-w-[560px] space-y-3.5 text-base leading-[1.7] text-body md:pt-0.5">
        <p>
          If your aim is 5K or 26.2 miles, on road or trail, we&apos;re here to prepare, empower and equip you — from your
          first training run through to race-day. Our tried-and-tested range covers road, trail, track and field, apparel
          and accessories, with zero compromise on performance or style.
        </p>
        <p>
          Paceline is small and independent, but the community around it is anything but. We run our own weekly club, host
          free gait analysis, and partner with local charities so 20% of profits from kids&apos; kits go to Girls Run
          Glasgow.
        </p>
        <p>Whatever mile you&apos;re on, we want to be your shop. Come say hello.</p>
        <p className="pt-12 text-[15px] font-semibold text-ink md:pt-[60px]">— Rae &amp; Jamie, Founders</p>
      </div>
    </section>
  )
}
