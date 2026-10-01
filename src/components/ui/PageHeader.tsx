import type { ReactNode } from 'react'
import { Link } from 'react-router'

interface PageHeaderProps {
  title: string
  crumb: string
  intro?: ReactNode
  children?: ReactNode
}

/** Header for secondary pages (collections, info pages) — echoes the About intro styling. */
export function PageHeader({ title, crumb, intro, children }: PageHeaderProps) {
  return (
    <div className="container-site pt-12 pb-8 md:pt-16 md:pb-10">
      <nav aria-label="Breadcrumb">
        <ol className="flex gap-2 text-[11px] font-medium tracking-[0.16em] text-muted uppercase">
          <li>
            <Link to="/" className="hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <span aria-current="page">{crumb}</span>
          </li>
        </ol>
      </nav>
      <h1 className="display mt-5 text-[2.75rem] leading-none sm:text-6xl">{title}</h1>
      {intro && <p className="mt-4 max-w-xl text-base leading-relaxed text-body">{intro}</p>}
      {children}
    </div>
  )
}
