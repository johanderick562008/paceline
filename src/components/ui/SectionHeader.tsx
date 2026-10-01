import type { ReactNode } from 'react'
import { cn } from '../../utils/format'

interface SectionHeaderProps {
  eyebrow: string
  title: ReactNode
  id?: string
  action?: ReactNode
  className?: string
}

/** "01 · SHOP BY CATEGORY" eyebrow + large heading, with an optional right-aligned action. */
export function SectionHeader({ eyebrow, title, id, action, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between', className)}>
      <div>
        <p className="eyebrow text-orange-ink">{eyebrow}</p>
        <h2 id={id} className="mt-2.5 text-[2rem] leading-[1.08] font-bold tracking-[-0.03em] sm:text-[2.5rem]">
          {title}
        </h2>
      </div>
      {action}
    </div>
  )
}
