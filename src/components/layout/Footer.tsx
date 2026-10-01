import { Link } from 'react-router'
import { site } from '../../config/site'
import { Newsletter } from './Newsletter'

const columns = [
  {
    title: 'Shop',
    links: [
      { label: "Men's", to: '/shop/men' },
      { label: "Women's", to: '/shop/women' },
      { label: 'Footwear', to: '/shop/footwear' },
      { label: 'Apparel', to: '/shop/apparel' },
      { label: 'Accessories', to: '/shop/accessories' },
      { label: 'Sale', to: '/shop/sale' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Contact', to: '/info/contact' },
      { label: 'Shipping', to: '/info/shipping' },
      { label: 'Returns', to: '/info/returns' },
      { label: 'Size Guides', to: '/info/size-guides' },
      { label: 'Gait Analysis', to: '/gait-analysis' },
      { label: 'FAQs', to: '/info/faqs' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: `Store · ${site.store.city}`, to: '/about#visit' },
      { label: 'Sustainability', to: '/info/sustainability' },
      { label: 'Careers', to: '/info/careers' },
      { label: 'Wholesale', to: '/info/wholesale' },
      { label: 'Press', to: '/info/press' },
    ],
  },
  {
    title: 'Follow',
    links: [
      { label: 'Instagram', to: '/info/social' },
      { label: 'Strava', to: '/info/social' },
      { label: 'TikTok', to: '/info/social' },
      { label: 'YouTube', to: '/info/social' },
      { label: 'Newsletter', to: '#newsletter' },
      { label: 'Blog', to: '/info/blog' },
    ],
  },
]

const legal = [
  { label: 'Privacy', to: '/info/privacy' },
  { label: 'Terms', to: '/info/terms' },
  { label: 'Cookies', to: '/info/cookies' },
  { label: 'Accessibility', to: '/info/accessibility' },
]

const linkClass = 'text-on-dark-muted transition-colors hover:text-white'

export function Footer() {
  return (
    <footer className="on-dark bg-ink text-white">
      <Newsletter />
      <div className="container-site">
        <div className="grid gap-10 border-t border-white/15 py-14 lg:grid-cols-[418px_1fr] md:py-[60px]">
          <div>
            <Link to="/" className="text-[28px] leading-none font-black tracking-[0.06em] uppercase">
              Paceline
            </Link>
            <p className="mt-6 max-w-[270px] text-[13px] leading-[1.6] text-on-dark-muted">
              Race-day gear, trail-tested essentials, and everyday running kit — curated in {site.store.city} since {site.founded}.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:flex sm:justify-between">
            {columns.map((col) => (
              <nav key={col.title} aria-label={`${col.title} links`} className="min-w-0">
                <h2 className="text-[11px] font-bold tracking-[0.16em] uppercase">{col.title}</h2>
                <ul className="mt-[13px] space-y-[7px] text-[13px] leading-[19px]">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.to.startsWith('#') ? (
                        <a href={l.to} className={linkClass}>
                          {l.label}
                        </a>
                      ) : (
                        <Link to={l.to} className={linkClass}>
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/15 py-8 text-xs text-on-dark-muted sm:flex-row sm:items-center sm:justify-between md:py-14">
          <p>
            © {new Date().getFullYear()} {site.legalName} — All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
