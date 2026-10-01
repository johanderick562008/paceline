import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { CartDrawer } from '../shop/CartDrawer'
import { SearchDialog } from '../shop/SearchDialog'
import { AnnouncementBar } from './AnnouncementBar'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { Toast } from './Toast'

/** Scroll to top on route change, or to the #hash target if one is given. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView?.()
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function PageFallback() {
  return (
    <div role="status" className="container-site flex min-h-screen items-center justify-center text-sm text-muted">
      <span className="mr-3 size-4 animate-spin rounded-full border-2 border-line-strong border-t-ink" aria-hidden />
      Loading…
    </div>
  )
}

export function Layout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] bg-lime px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <ScrollManager />
      <AnnouncementBar />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
      <SearchDialog />
      <Toast />
    </>
  )
}
