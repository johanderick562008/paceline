import { Link } from 'react-router'
import joggers from '../../assets/About/main_story_section/image_joggers.webp'
import joggersSmall from '../../assets/About/main_story_section/image_joggers-800.webp'

export function AboutIntro() {
  return (
    <section aria-labelledby="about-title" className="container-site pt-14 text-center md:pt-[80px]">
      <nav aria-label="Breadcrumb">
        <ol className="flex justify-center gap-2 text-[11px] font-medium tracking-[0.16em] text-muted uppercase">
          <li>
            <Link to="/" className="hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <span aria-current="page">About</span>
          </li>
        </ol>
      </nav>
      <h1
        id="about-title"
        className="mt-8 text-[4.5rem] leading-[0.95] font-black tracking-[-0.05em] sm:text-[7.5rem] md:mt-[54px] lg:text-[10rem]"
      >
        Our Story
      </h1>
      <p className="mx-auto mt-8 max-w-[660px] text-base leading-[1.6] text-body sm:text-lg md:mt-[44px]">
        We opened Paceline in 2015 with one goal — to build the running shop we&apos;d always wanted. A decade in,
        we&apos;re still hand-picking every shoe, every layer and every accessory for runners just like us.
      </p>
      <img
        src={joggers}
        srcSet={`${joggersSmall} 800w, ${joggers} 1312w`}
        sizes="(min-width: 1440px) 1312px, 100vw"
        alt="A pack of runners' legs and brightly coloured shoes mid-stride at the start of a road race"
        width={1312}
        height={480}
        fetchPriority="high"
        className="mt-8 aspect-[4/3] w-full object-cover sm:aspect-[1312/480] md:mt-[22px]"
      />
    </section>
  )
}
