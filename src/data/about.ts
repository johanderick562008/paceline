/** About page copy — transcribed from design/About.png. Edit here, not in components. */
import rae from '../assets/About/founders_section/image1.webp'
import jamie from '../assets/About/founders_section/image2.webp'

export const values = [
  {
    title: 'Curated, not sold to us.',
    body: "Every brand we carry has been tested, worn and vouched for by our team. If it doesn't perform on a Glasgow winter long run, it doesn't hit our wall.",
    accent: 'text-orange',
  },
  {
    title: 'Community over transaction.',
    body: "Free gait analysis, weekly run clubs, and race-day support. Come in for shoes, stay for the miles. Ask for Rae — she'll get you laced up right.",
    accent: 'text-lime',
  },
  {
    title: 'Craft in every detail.',
    body: "From how we lay out the store to how we pack an order — the small stuff matters. We've spent a decade sweating the details so your run is smoother.",
    accent: 'text-tan',
  },
]

export const timeline = [
  { year: '2015', title: 'Doors open.', body: 'Rae opens a 40-sqm shop on Great Western Road with 3 shoe brands and a lot of hope.' },
  { year: '2018', title: 'The clinic launches.', body: 'Free gait analysis and injury consults every Saturday — booked out in weeks.' },
  { year: '2022', title: 'Weekly run club.', body: 'Every Wednesday, rain or shine. Started with 6 runners, now averages 80+.' },
  { year: '2026', title: '40 brands & counting.', body: 'Twenty seasons in, still hand-picking every product. Same team, same goal.' },
]

export const founders = [
  {
    name: 'Rae Sinclair',
    role: 'Founder & Head Buyer',
    badge: '12x sub-3 marathoner',
    bio: 'A former GB triathlete turned shopkeeper. Rae hand-picks every shoe on the wall and still runs the Wednesday club — sub-3 marathoner, twelve times over.',
    image: rae,
    alt: 'Rae Sinclair smiling with arms folded on an athletics track',
  },
  {
    name: 'Jamie Roy',
    role: 'Co-Founder & Coach',
    badge: '20+ years coaching',
    bio: 'Sports physio and coach with two decades in the sport. Runs our free Saturday clinic, coaches the club, and knows more about your gait than you do.',
    image: jamie,
    alt: 'Jamie Roy smiling in a gym, holding a clipboard with a stopwatch on a lanyard',
  },
]
