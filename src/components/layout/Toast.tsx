import { useEffect } from 'react'
import { CircleCheck } from 'lucide-react'
import { useUi } from '../../store/ui'

/** Global polite status message (e.g. "Added to your bag"). */
export function Toast() {
  const toast = useUi((s) => s.toast)
  const dismiss = useUi((s) => s.dismissToast)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(dismiss, 3500)
    return () => clearTimeout(t)
  }, [toast, dismiss])

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex justify-center px-4">
      {toast && (
        <p
          key={toast.id}
          className="animate-fade-in on-dark flex items-center gap-2.5 bg-ink px-5 py-3 text-sm font-medium text-white shadow-lg"
        >
          <CircleCheck aria-hidden className="size-4 text-lime" />
          {toast.message}
        </p>
      )}
    </div>
  )
}
