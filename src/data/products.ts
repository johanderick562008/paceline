/**
 * DEMO CATALOGUE — design/demo content only.
 *
 * Names, prices, sizes and availability are sample values for this frontend
 * assignment (the first four mirror the Home.png reference). They are not
 * verified retail inventory or pricing. Only one product photo was supplied
 * (arrivals_section/image.png), so every footwear item shares it; apparel and
 * accessory items reuse the matching supplied category photography.
 */
import shoe from '../assets/Home/arrivals_section/image.webp'
import apparelPhoto from '../assets/Home/category_section/image3.webp'
import accessoriesPhoto from '../assets/Home/category_section/image4.webp'
import type { Product } from '../types'

const SHOE_ALT = 'Dark green running shoe with a white midsole, photographed on an amber background'
const UK_SIZES = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12']
const APPAREL_SIZES = ['XS', 'S', 'M', 'L', 'XL']

export const products: Product[] = [
  {
    id: 'on-cloudmonster-3-hyper-lily',
    brand: 'ON',
    name: 'Cloudmonster 3 — Hyper Lily',
    price: 210,
    category: 'footwear',
    gender: 'women',
    terrain: 'road',
    tags: ['new', 'bestseller'],
    badge: 'new',
    image: shoe,
    imageAlt: SHOE_ALT,
    description:
      'A max-cushioned daily trainer for long, easy road miles. Soft underfoot with a rolling ride that keeps tired legs moving.',
    sizes: UK_SIZES,
    available: true,
  },
  {
    id: 'nike-vaporfly-4-volt-ice',
    brand: 'Nike',
    name: 'Vaporfly 4 — Volt Ice',
    price: 240,
    category: 'footwear',
    gender: 'unisex',
    terrain: 'road',
    tags: ['new', 'race', 'bestseller'],
    badge: 'new',
    image: shoe,
    imageAlt: SHOE_ALT,
    description:
      'A carbon-plated racer built for race day. Light, springy and stripped back for fast 10Ks through to the marathon.',
    sizes: UK_SIZES,
    available: true,
  },
  {
    id: 'hoka-tecton-x-4-frost-tangerine',
    brand: 'Hoka',
    name: 'Tecton X 4 — Frost / Tangerine',
    price: 220,
    category: 'footwear',
    gender: 'men',
    terrain: 'trail',
    tags: ['new', 'trail', 'race'],
    badge: 'new',
    image: shoe,
    imageAlt: SHOE_ALT,
    description:
      'A plated trail racer with an aggressive outsole for technical ground. Built for ultras, hill races and fast days off-road.',
    sizes: UK_SIZES,
    available: true,
  },
  {
    id: 'asics-megablast-white-orange-glow',
    brand: 'Asics',
    name: 'Megablast — White / Orange Glow',
    price: 210,
    category: 'footwear',
    gender: 'unisex',
    terrain: 'road',
    tags: ['new', 'race'],
    badge: 'sale',
    image: shoe,
    imageAlt: SHOE_ALT,
    description:
      'A bouncy, lightweight trainer for tempo sessions and long runs. Equally at home on the track or the Saturday parkrun.',
    sizes: UK_SIZES,
    available: true,
  },
  {
    id: 'saucony-endorphin-speed-5',
    brand: 'Saucony',
    name: 'Endorphin Speed 5 — Ink / Lime',
    price: 170,
    category: 'footwear',
    gender: 'men',
    terrain: 'road',
    tags: ['bestseller', 'race'],
    image: shoe,
    imageAlt: SHOE_ALT,
    description: 'A nylon-plated uptempo trainer for intervals, threshold runs and race day alike.',
    sizes: UK_SIZES,
    available: true,
  },
  {
    id: 'brooks-ghost-17',
    brand: 'Brooks',
    name: 'Ghost 17 — Coconut / Ember',
    price: 135,
    category: 'footwear',
    gender: 'women',
    terrain: 'road',
    tags: ['bestseller'],
    image: shoe,
    imageAlt: SHOE_ALT,
    description: 'A dependable neutral daily trainer. Smooth transitions and plenty of cushion for everyday miles.',
    sizes: UK_SIZES,
    available: true,
  },
  {
    id: 'salomon-speedcross-7',
    brand: 'Salomon',
    name: 'Speedcross 7 — Moss',
    price: 140,
    originalPrice: 160,
    category: 'footwear',
    gender: 'women',
    terrain: 'trail',
    tags: ['trail', 'bestseller'],
    badge: 'sale',
    image: shoe,
    imageAlt: SHOE_ALT,
    description: 'Deep lugs and a snug fit for muddy hills, wet rock and everything a Scottish winter throws at you.',
    sizes: UK_SIZES,
    available: true,
  },
  {
    id: 'hoka-speedgoat-6',
    brand: 'Hoka',
    name: 'Speedgoat 6 — Stone / Sun',
    price: 155,
    category: 'footwear',
    gender: 'men',
    terrain: 'trail',
    tags: ['trail'],
    image: shoe,
    imageAlt: SHOE_ALT,
    description: 'Cushioned, grippy and stable — a long-distance trail shoe for mixed terrain.',
    sizes: UK_SIZES,
    available: false,
  },
  {
    id: 'paceline-club-singlet',
    brand: 'Paceline',
    name: 'Club Singlet — Slate',
    price: 35,
    category: 'apparel',
    gender: 'men',
    tags: ['new', 'race'],
    badge: 'new',
    image: apparelPhoto,
    imageAlt: 'Runner in a slate vest and shorts sprinting past a stone building',
    description: 'A breathable race singlet in our club colours. Light mesh panels and flatlock seams.',
    sizes: APPAREL_SIZES,
    available: true,
  },
  {
    id: 'paceline-split-shorts',
    brand: 'Paceline',
    name: 'Split Shorts 5" — Ink',
    price: 40,
    originalPrice: 50,
    category: 'apparel',
    gender: 'women',
    tags: ['race'],
    badge: 'sale',
    image: apparelPhoto,
    imageAlt: 'Runner in a slate vest and shorts sprinting past a stone building',
    description: 'Lightweight split shorts with a rear zip pocket for gels and keys.',
    sizes: APPAREL_SIZES,
    available: true,
  },
  {
    id: 'trail-gps-watch',
    brand: 'Coros',
    name: 'Trail GPS Watch — Graphite',
    price: 349,
    category: 'accessories',
    gender: 'unisex',
    terrain: 'trail',
    tags: ['trail', 'bestseller'],
    image: accessoriesPhoto,
    imageAlt: 'GPS sports watch resting on moss, showing the time 18:15',
    description: 'A long-battery GPS watch with route navigation for big days in the hills.',
    available: true,
  },
  {
    id: 'paceline-race-belt',
    brand: 'Paceline',
    name: 'Race Belt — Lime',
    price: 18,
    category: 'accessories',
    gender: 'unisex',
    tags: ['race'],
    image: accessoriesPhoto,
    imageAlt: 'GPS sports watch resting on moss, showing the time 18:15',
    description: 'An elastic race-number belt with gel loops. One size fits most.',
    available: true,
  },
]

export const brands = [...new Set(products.map((p) => p.brand))].sort((a, b) => a.localeCompare(b))

export function getProduct(id: string | undefined) {
  return products.find((p) => p.id === id)
}

export function searchProducts(query: string, list: Product[] = products) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return list.filter((p) => `${p.brand} ${p.name} ${p.category}`.toLowerCase().includes(q))
}
