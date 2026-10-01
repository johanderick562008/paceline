import { useEffect, useRef, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/format'

type Placement = 'right' | 'left' | 'top'

interface DialogProps {
  open: boolean
  onClose: () => void
  labelledBy: string
  placement?: Placement
  initialFocus?: RefObject<HTMLElement | null>
  className?: string
  children: ReactNode
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const panelPlacement: Record<Placement, string> = {
  right: 'right-0 top-0 h-dvh w-full max-w-md animate-slide-in',
  left: 'left-0 top-0 h-dvh w-full max-w-sm animate-fade-in',
  top: 'inset-x-0 top-0 max-h-dvh animate-fade-in',
}

/**
 * Accessible modal surface used for the cart drawer, mobile menu and search.
 * Traps focus, closes on Escape / backdrop click, locks page scroll and
 * returns focus to the trigger when closed.
 */
export function Dialog({ open, onClose, labelledBy, placement = 'right', initialFocus, className, children }: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    const target =
      initialFocus?.current ??
      panel?.querySelector<HTMLElement>('[data-autofocus]') ??
      panel?.querySelector<HTMLElement>(FOCUSABLE) ??
      panel
    target?.focus()

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => !el.hasAttribute('inert'))
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      previouslyFocused?.focus?.()
    }
  }, [open, initialFocus])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div className="animate-fade-in absolute inset-0 bg-ink/50" aria-hidden onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={cn('absolute flex flex-col overflow-y-auto bg-cream shadow-xl outline-none', panelPlacement[placement], className)}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
