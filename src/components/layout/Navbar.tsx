import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Menu, Search, ShoppingCart, User } from 'lucide-react'
import { cartCount, useCart } from '../../store/cart'
import { useUi } from '../../store/ui'
import { cn } from '../../utils/format'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { navItems } from './navItems'

const iconButton =
  'relative inline-flex size-11 items-center justify-center text-ink transition-colors hover:text-orange-ink'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const count = useCart((s) => cartCount(s.lines))
  const setCartOpen = useUi((s) => s.setCartOpen)
  const setSearchOpen = useUi((s) => s.setSearchOpen)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream">
      <div className="container-site flex h-16 items-center justify-between gap-2 sm:gap-6 lg:grid lg:h-[73px] lg:grid-cols-[1fr_auto_1fr]">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[15px] font-medium">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'relative py-2 transition-colors hover:text-orange-ink',
                      isActive && 'font-bold',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="-mr-2.5 flex items-center justify-end lg:gap-1">
          <button type="button" className={iconButton} aria-label="Search products" onClick={() => setSearchOpen(true)}>
            <Search aria-hidden className="size-5" strokeWidth={1.75} />
          </button>
          <Link to="/account" className={cn(iconButton, 'hidden sm:inline-flex')} aria-label="Account">
            <User aria-hidden className="size-5" strokeWidth={1.75} />
          </Link>
          <button
            type="button"
            className={iconButton}
            aria-label={`Open bag, ${count} ${count === 1 ? 'item' : 'items'}`}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart aria-hidden className="size-5" strokeWidth={1.75} />
            {count > 0 && (
              <span
                aria-hidden
                className="absolute top-1.5 right-1 grid min-w-4 place-items-center rounded-full bg-sale px-1 text-[9px] leading-4 font-bold text-white"
              >
                {count > 9 ? '9+' : count}
              </span>
            )}
          </button>
          <button
            type="button"
            className={cn(iconButton, 'lg:hidden')}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu aria-hidden className="size-6" strokeWidth={1.75} />
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
