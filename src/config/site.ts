/**
 * Editable brand/business content. Everything here is taken from the supplied
 * design references; change it in one place rather than inside components.
 */
export const site = {
  name: 'PACELINE',
  legalName: 'Paceline Running Co.',
  founded: 2015,
  announcement: {
    left: ['Free UK delivery over £75', '30-day returns'],
    center: "Autumn '26 — New arrivals dropping weekly",
    right: ['Store: Glasgow', 'EN / £ GBP'],
  },
  freeDeliveryThreshold: 75,
  store: {
    city: 'Glasgow',
    /** Only the street named in the design is used — no full postal address was supplied. */
    street: 'Great Western Road',
    mapsQuery: 'Great Western Road, Glasgow',
  },
  stats: [
    { value: '10+', label: 'Years in sport' },
    { value: '40+', label: 'Brands stocked' },
    { value: '1', label: 'Store in Glasgow' },
  ],
  newsletterEndpoint: import.meta.env.VITE_NEWSLETTER_ENDPOINT as string | undefined,
} as const
