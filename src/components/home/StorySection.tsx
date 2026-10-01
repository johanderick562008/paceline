import storyImage from '../../assets/Home/story_section/image.webp'
import { site } from '../../config/site'
import { ButtonLink } from '../ui/Button'

export function StorySection() {
  return (
    <section aria-labelledby="story-title" className="on-dark mt-20 grid bg-ink text-white md:mt-24 md:grid-cols-2">
      <img
        src={storyImage}
        alt="A trail runner in an orange top crests a rocky summit above a sea of clouds"
        width={720}
        height={620}
        loading="lazy"
        decoding="async"
        className="aspect-[720/620] size-full object-cover md:aspect-auto md:min-h-[620px]"
      />
      <div className="flex items-center px-5 py-14 sm:px-10 md:px-12 lg:pr-16 lg:pl-24">
        <div className="max-w-[500px]">
          <p className="eyebrow text-lime">Our story</p>
          <h2 id="story-title" className="mt-6 text-[2.25rem] leading-[1.05] font-bold tracking-[-0.03em] sm:text-5xl md:mt-[26px]">
            Built by runners.{' '}
            <br />
            Worn on every terrain.
          </h2>
          <p className="mt-8 text-base leading-[1.65] text-white/80">
            PACELINE opened in {site.founded} with one goal — to become an all-inclusive hub for runners. Twenty seasons in,
            we still hand-pick every shoe, every layer and every accessory in our range. From your first Couch-to-5K to your
            third marathon, we prepare, empower and equip you with zero compromise on performance or style.
          </p>
          <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-6">
            {site.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1.5 text-[11px] font-medium tracking-[0.12em] text-on-dark-muted uppercase">{s.label}</dt>
                <dd className="text-[2.5rem] leading-none font-extrabold tracking-[-0.03em] text-lime">{s.value}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink to="/about" variant="outline-light" arrow className="mt-10">
            Read the full story
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
