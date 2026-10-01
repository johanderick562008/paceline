import { NavLink } from 'react-router'
import { ArrowRight, Heart, User, X } from 'lucide-react'
import { site } from '../../config/site'
import { cn } from '../../utils/format'
import { Dialog } from '../ui/Dialog'
import { Logo } from './Logo'
import { navItems } from './navItems'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <Dialog open={open} onClose={onClose} labelledBy="mobile-menu-title" placement="left">
      <div id="mobile-menu" className="flex min-h-full flex-col">
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <Logo onClick={onClose} />
          <h2 id="mobile-menu-title" className="sr-only">
            Menu
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="-mr-2.5 inline-flex size-11 items-center justify-center"
          >
            <X aria-hidden className="size-6" strokeWidth={1.75} />
          </button>
        </div>
        <nav aria-label="Mobile" className="px-5 py-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.to} className="border-b border-line">
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn('flex items-center justify-between py-4 text-2xl font-bold tracking-tight', isActive && 'text-orange-ink')
                  }
                >
                  {item.label}
                  <ArrowRight aria-hidden className="size-5" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="mt-auto grid gap-1 px-5 pb-6 text-sm font-medium">
          <li>
            <NavLink to="/account" onClick={onClose} className="flex min-h-11 items-center gap-3">
              <User aria-hidden className="size-5" strokeWidth={1.75} /> Account
            </NavLink>
          </li>
          <li>
            <NavLink to="/wishlist" onClick={onClose} className="flex min-h-11 items-center gap-3">
              <Heart aria-hidden className="size-5" strokeWidth={1.75} /> Wishlist
            </NavLink>
          </li>
          <li className="pt-3 text-[11px] tracking-[0.08em] text-muted uppercase">
            {site.announcement.left.join(' · ')}{' '}
            <br />
            {site.announcement.right.join(' · ')}
          </li>
        </ul>
      </div>
    </Dialog>
  )
}
