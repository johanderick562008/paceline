import { site } from '../../config/site'

const Dot = () => (
  <span aria-hidden className="px-2 text-on-dark-muted">
    ·
  </span>
)

export function AnnouncementBar() {
  const { left, center, right } = site.announcement
  return (
    <div className="on-dark bg-ink text-[10px] font-medium tracking-[0.08em] text-white uppercase sm:text-[11px]">
      <div className="container-site flex min-h-[33px] items-center justify-center py-2 lg:grid lg:grid-cols-3 lg:py-0">
        <p className="hidden lg:block">
          {left[0]}
          <Dot />
          {left[1]}
        </p>
        <p className="text-center font-semibold text-lime">{center}</p>
        <p className="hidden text-right lg:block">
          {right[0]}
          <Dot />
          {right[1]}
        </p>
      </div>
    </div>
  )
}
