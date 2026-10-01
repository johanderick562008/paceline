import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleAlert, CircleCheck } from 'lucide-react'
import { newsletterSchema, type NewsletterValues } from '../../schemas/newsletter'
import { subscribe, type SubscribeResult } from '../../utils/newsletter'
import { cn } from '../../utils/format'
import { Button } from '../ui/Button'

type Status = { type: 'idle' } | { type: 'success'; result: SubscribeResult; email: string } | { type: 'error' }

export function Newsletter() {
  const [status, setStatus] = useState<Status>({ type: 'idle' })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema), defaultValues: { email: '' } })

  const onSubmit = async ({ email }: NewsletterValues) => {
    setStatus({ type: 'idle' })
    try {
      const result = await subscribe(email)
      setStatus({ type: 'success', result, email })
      reset()
    } catch {
      setStatus({ type: 'error' })
    }
  }

  const fieldError = errors.email?.message

  return (
    <section id="newsletter" aria-labelledby="newsletter-title" className="scroll-mt-24">
      <div className="container-site grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-center md:py-[100px] md:pb-16">
        <div>
          <h2 id="newsletter-title" className="text-[1.75rem] leading-tight font-bold tracking-[-0.03em] sm:text-4xl">
            Join the Paceline club.
          </h2>
          <p className="mt-2 text-sm text-on-dark-muted">Early access to new drops, race-day tips, and 10% off your first order.</p>
        </div>

        <div className="w-full md:w-[462px]">
          <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              aria-invalid={fieldError ? true : undefined}
              aria-describedby={fieldError ? 'newsletter-error' : undefined}
              className={cn(
                'min-h-14 min-w-0 flex-1 border bg-transparent px-5 text-[15px] text-white placeholder:text-on-dark-muted/80 focus:border-white focus:outline-none',
                fieldError ? 'border-orange' : 'border-white/30',
              )}
              {...register('email')}
            />
            <Button type="submit" variant="lime" loading={isSubmitting} className="min-h-14 sm:min-h-0">
              {isSubmitting ? 'Joining…' : 'Subscribe'}
            </Button>
          </form>
          <div aria-live="polite" className="mt-3 min-h-5 text-sm">
            {fieldError && (
              <p id="newsletter-error" className="flex items-center gap-2 text-[#ff9b7a]">
                <CircleAlert aria-hidden className="size-4 shrink-0" /> {fieldError}
              </p>
            )}
            {status.type === 'error' && (
              <p className="flex items-center gap-2 text-[#ff9b7a]">
                <CircleAlert aria-hidden className="size-4 shrink-0" /> Something went wrong. Please try again in a moment.
              </p>
            )}
            {status.type === 'success' && (
              <p className="flex items-start gap-2 text-lime">
                <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0" />
                <span>
                  {status.result.mode === 'api'
                    ? `Thanks — ${status.email} is on the list.`
                    : `Thanks! Demo mode: ${status.email} was validated but not stored or sent anywhere.`}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
