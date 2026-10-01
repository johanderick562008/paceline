import { ButtonLink } from '../components/ui/Button'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFoundPage() {
  useDocumentTitle('Page not found')
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="eyebrow text-orange-ink">404 · Off course</p>
      <h1 className="display mt-4 text-5xl sm:text-7xl">Wrong turn.</h1>
      <p className="mt-4 max-w-md text-body">We couldn&apos;t find that page. It may have moved, or the link may be mistyped.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink to="/" variant="ink" arrow>
          Back to home
        </ButtonLink>
        <ButtonLink to="/shop/all" variant="outline-dark">
          Shop all
        </ButtonLink>
      </div>
    </div>
  )
}
