import { Link } from 'react-router'
import { cn } from '../../utils/format'

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="PACELINE — home"
      className={cn('text-[19px] sm:text-[22px] leading-none font-black tracking-[0.06em] uppercase', className)}
    >
      Paceline
    </Link>
  )
}
