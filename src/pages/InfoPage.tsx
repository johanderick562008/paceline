import { useParams } from 'react-router'
import { ArrowLink } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { infoPages } from '../data/pages'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import NotFoundPage from './NotFoundPage'

export default function InfoPage() {
  const { slug = '' } = useParams()
  const page = Object.hasOwn(infoPages, slug) ? infoPages[slug] : undefined
  useDocumentTitle(page?.title)
  if (!page) return <NotFoundPage />

  return (
    <div className="pb-20 md:pb-24">
      <PageHeader title={page.title} crumb={page.title} intro={page.intro} />
      <div className="container-site">
        <div className="max-w-3xl space-y-4 leading-relaxed text-body">
        {page.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <div className="pt-6">
          <ArrowLink to="/">Back to the shop</ArrowLink>
          </div>
        </div>
      </div>
    </div>
  )
}
