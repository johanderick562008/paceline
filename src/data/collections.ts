import type { Product, ProductTag } from '../types'
import road from '../assets/Home/category_section/image1.webp'
import trail from '../assets/Home/category_section/image2.webp'
import apparel from '../assets/Home/category_section/image3.webp'
import accessories from '../assets/Home/category_section/image4.webp'

export interface Collection {
  slug: string
  title: string
  description: string
  filter: (p: Product) => boolean
}

export const collections: Collection[] = [
  { slug: 'all', title: 'All collections', description: 'Every shoe, layer and accessory in the shop.', filter: () => true },
  { slug: 'new', title: 'New in', description: 'Fresh arrivals, dropping weekly.', filter: (p) => p.tags.includes('new') },
  { slug: 'men', title: "Men's running", description: 'Shoes and kit for road, track and trail.', filter: (p) => p.gender === 'men' || p.gender === 'unisex' },
  { slug: 'women', title: "Women's running", description: 'Shoes and kit for road, track and trail.', filter: (p) => p.gender === 'women' || p.gender === 'unisex' },
  { slug: 'footwear', title: 'Footwear', description: 'Daily trainers, race shoes and trail shoes.', filter: (p) => p.category === 'footwear' },
  { slug: 'road', title: 'Road running', description: 'Speed, cushion, race-day.', filter: (p) => p.category === 'footwear' && p.terrain === 'road' },
  { slug: 'trail', title: 'Trail running', description: 'Grip, protection, adventure.', filter: (p) => p.terrain === 'trail' },
  { slug: 'apparel', title: 'Apparel', description: 'Layers built for every mile.', filter: (p) => p.category === 'apparel' },
  { slug: 'accessories', title: 'Accessories', description: 'Watches, packs, fuel.', filter: (p) => p.category === 'accessories' },
  { slug: 'sale', title: 'Sale', description: 'Reduced lines while they last.', filter: (p) => p.badge === 'sale' },
]

export function getCollection(slug: string | undefined) {
  return collections.find((c) => c.slug === slug)
}

/** Home "Shop by category" cards (design: Home.png, section 01). */
export const categoryCards = [
  { slug: 'road', title: 'Road Running', blurb: 'Speed, cushion, race-day.', image: road },
  { slug: 'trail', title: 'Trail Running', blurb: 'Grip, protection, adventure.', image: trail },
  { slug: 'apparel', title: 'Apparel', blurb: 'Layers built for every mile.', image: apparel },
  { slug: 'accessories', title: 'Accessories', blurb: 'Watches, packs, fuel.', image: accessories },
]

/** Home "New arrivals" filter tabs (design: Home.png, section 02). */
export const arrivalTabs: { id: ProductTag; label: string }[] = [
  { id: 'new', label: 'New In' },
  { id: 'bestseller', label: 'Best Sellers' },
  { id: 'race', label: 'Race Day' },
  { id: 'trail', label: 'Trail' },
]
