/**
 * Content for footer destinations that are outside the assignment's two
 * designed pages. These are short informational placeholders so no footer
 * link is dead. Policies shown here are placeholders, not confirmed terms.
 */
export interface InfoPage {
  title: string
  eyebrow: string
  intro: string
  body: string[]
}

const placeholderNote =
  'This page is a placeholder for the PACELINE demo site. Final wording will be supplied by the shop before launch.'

export const infoPages: Record<string, InfoPage> = {
  contact: {
    eyebrow: 'Help',
    title: 'Contact us',
    intro: 'Questions about an order, a shoe or the run club? The quickest way to reach us is in the shop.',
    body: ['Pop into the store on Great Western Road, Glasgow, and the team will help you out.', placeholderNote],
  },
  shipping: {
    eyebrow: 'Help',
    title: 'Shipping',
    intro: 'Free UK delivery on orders over £75.',
    body: ['Delivery times and rates for smaller orders and international shipping will be published here.', placeholderNote],
  },
  returns: {
    eyebrow: 'Help',
    title: 'Returns',
    intro: '30-day returns on unworn items.',
    body: ['Full returns instructions will be published here.', placeholderNote],
  },
  'size-guides': {
    eyebrow: 'Help',
    title: 'Size guides',
    intro: 'Not sure on sizing? Our free gait analysis includes a proper fitting.',
    body: ['Brand-by-brand size charts will be published here.', placeholderNote],
  },
  faqs: {
    eyebrow: 'Help',
    title: 'FAQs',
    intro: 'Answers to the questions we hear most in the shop.',
    body: [placeholderNote],
  },
  sustainability: {
    eyebrow: 'Company',
    title: 'Sustainability',
    intro: 'How we think about the footprint of the kit we sell.',
    body: [placeholderNote],
  },
  careers: { eyebrow: 'Company', title: 'Careers', intro: 'Love running? We sometimes hire runners.', body: [placeholderNote] },
  wholesale: { eyebrow: 'Company', title: 'Wholesale', intro: 'Club and team orders.', body: [placeholderNote] },
  press: { eyebrow: 'Company', title: 'Press', intro: 'Media enquiries and brand assets.', body: [placeholderNote] },
  blog: { eyebrow: 'Follow', title: 'Journal', intro: 'Race reports, shoe reviews and training notes from the team.', body: [placeholderNote] },
  social: {
    eyebrow: 'Follow',
    title: 'Find us online',
    intro: 'Instagram, Strava, TikTok and YouTube channels are listed in the design.',
    body: ['Official account handles have not been supplied yet, so we have not linked to any third-party profiles.', placeholderNote],
  },
  privacy: { eyebrow: 'Legal', title: 'Privacy', intro: 'How we handle your data.', body: ['This demo site stores your bag and wishlist only in your own browser (localStorage). Nothing is sent to a server.', placeholderNote] },
  terms: { eyebrow: 'Legal', title: 'Terms', intro: 'Terms of sale and use.', body: [placeholderNote] },
  cookies: { eyebrow: 'Legal', title: 'Cookies', intro: 'This demo site does not set tracking cookies.', body: ['Bag and wishlist contents are saved in localStorage on your device so they survive a page refresh.', placeholderNote] },
  accessibility: {
    eyebrow: 'Legal',
    title: 'Accessibility',
    intro: 'We want everyone to be able to shop with us.',
    body: [
      'The site is built with semantic HTML, keyboard-operable menus and dialogs, visible focus styles, and support for reduced motion.',
      'If anything is hard to use, please tell us in the shop so we can fix it.',
    ],
  },
}
