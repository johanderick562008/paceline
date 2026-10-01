import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { cn } from '../../utils/format'

export type ButtonVariant = 'lime' | 'ink' | 'outline-light' | 'outline-dark'

const base =
  'inline-flex min-h-12 items-center justify-center gap-3 px-6 sm:px-8 text-[13px] font-bold uppercase tracking-[0.12em] ' +
  'transition-[background-color,color,border-color,transform] duration-200 active:translate-y-px ' +
  'disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0'

const variants: Record<ButtonVariant, string> = {
  lime: 'bg-lime text-ink hover:bg-lime-dark',
  ink: 'bg-ink text-lime hover:bg-ink-soft',
  'outline-light': 'border-[1.5px] border-white text-white hover:bg-white hover:text-ink',
  'outline-dark': 'border-[1.5px] border-ink text-ink hover:bg-ink hover:text-lime',
}

export const buttonClass = (variant: ButtonVariant = 'lime', className?: string) =>
  cn(base, variants[variant], className)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  loading?: boolean
  arrow?: boolean
}

export function Button({ variant = 'lime', loading, arrow, className, children, disabled, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={buttonClass(variant, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <LoaderCircle aria-hidden className="size-4 animate-spin" />}
      {children}
      {arrow && !loading && <ArrowRight aria-hidden className="size-4" strokeWidth={2.25} />}
    </button>
  )
}

interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant
  arrow?: boolean
  children: ReactNode
}

export function ButtonLink({ variant = 'lime', arrow, className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={buttonClass(variant, typeof className === 'string' ? className : undefined)} {...rest}>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4" strokeWidth={2.25} />}
    </Link>
  )
}

/** Small uppercase arrow link: "VIEW ALL COLLECTIONS →", "SHOP →". */
export function ArrowLink({ className, children, ...rest }: LinkProps & { children: ReactNode }) {
  return (
    <Link
      className={cn(
        'group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em]',
        typeof className === 'string' ? className : undefined,
      )}
      {...rest}
    >
      {children}
      <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
    </Link>
  )
}
