export type ProductCategory = 'footwear' | 'apparel' | 'accessories'
export type Gender = 'men' | 'women' | 'unisex'
export type Terrain = 'road' | 'trail'
export type ProductTag = 'new' | 'bestseller' | 'race' | 'trail'
export type Badge = 'new' | 'sale'

export interface Product {
  id: string
  brand: string
  name: string
  /** Price in GBP (demo values, not verified retail pricing). */
  price: number
  originalPrice?: number
  category: ProductCategory
  gender: Gender
  terrain?: Terrain
  tags: ProductTag[]
  badge?: Badge
  image: string
  imageAlt: string
  description: string
  /** Optional selectable options, e.g. UK shoe sizes. Demo data only. */
  sizes?: string[]
  available: boolean
}

export interface CartLine {
  productId: string
  size?: string
  quantity: number
}
