import type { BrandIconName } from '@/lib/types'
import { cn } from '@/lib/utils'

/**
 * Sarkhat financial icon set from the design system: 24×24, 1.75px stroke, square caps, miter joins.
 * Brand green appears only as the marker dot in `follow` and `watchlist`.
 */
const PATHS: Record<BrandIconName, React.ReactNode> = {
  ai: (<><circle cx="12" cy="9" r="4" /><line x1="4" y1="18" x2="20" y2="18" /></>),
  alert: (<><polygon points="6,17 6,10 9,6 15,6 18,10 18,17" /><line x1="4" y1="17" x2="20" y2="17" /><line x1="10" y1="20" x2="14" y2="20" /></>),
  calendar: (<><rect x="4" y="5" width="16" height="15" /><line x1="4" y1="10" x2="20" y2="10" /><line x1="8" y1="3" x2="8" y2="7" /><line x1="16" y1="3" x2="16" y2="7" /></>),
  crypto: (<><polygon points="12,3 20,7.5 20,16.5 12,21 4,16.5 4,7.5" /><line x1="12" y1="12" x2="12" y2="21" /><polyline points="4,7.5 12,12 20,7.5" /></>),
  currency: (<><rect x="3" y="6" width="18" height="12" /><circle cx="12" cy="12" r="2.5" /></>),
  follow: (<><line x1="4" y1="16" x2="20" y2="16" /><circle cx="16" cy="9" r="2.2" fill="var(--sk-brand)" stroke="none" /><line x1="9" y1="6" x2="9" y2="12" /><line x1="6" y1="9" x2="12" y2="9" /></>),
  gold: (<><polygon points="7,9 17,9 20,18 4,18" /><line x1="9" y1="5" x2="15" y2="5" /></>),
  housing: (<><polyline points="3,11 12,4 21,11" /><rect x="6" y="11" width="12" height="9" /><rect x="10" y="14" width="4" height="6" /></>),
  index: (<><circle cx="12" cy="12" r="8" /><line x1="12" y1="12" x2="17" y2="8" /></>),
  market: (<><polyline points="3,17 9,11 13,14 21,6" /><line x1="3" y1="21" x2="21" y2="21" /></>),
  news: (<><rect x="4" y="4" width="16" height="16" /><line x1="8" y1="9" x2="16" y2="9" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="13" y2="17" /></>),
  oil: (<><rect x="6" y="5" width="12" height="15" /><line x1="6" y1="10" x2="18" y2="10" /><line x1="6" y1="15" x2="18" y2="15" /></>),
  save: <polygon points="6,4 18,4 18,20 12,15 6,20" />,
  search: (<><circle cx="13" cy="10" r="6" /><line x1="8.8" y1="14.2" x2="4" y2="19" /></>),
  share: (<><polyline points="10,8 5,12 10,16" /><polyline points="5,12 19,12 19,19" /></>),
  source: (<><rect x="4" y="4" width="16" height="16" /><circle cx="12" cy="12" r="2.5" fill="currentColor" /></>),
  stocks: (<><line x1="6" y1="20" x2="6" y2="12" /><line x1="12" y1="20" x2="12" y2="6" /><line x1="18" y1="20" x2="18" y2="9" /><line x1="3" y1="20" x2="21" y2="20" /></>),
  timeline: (<><line x1="3" y1="12" x2="21" y2="12" /><circle cx="18" cy="12" r="2" fill="currentColor" /><circle cx="11" cy="12" r="2" fill="var(--sk-surface)" /><circle cx="5" cy="12" r="2" fill="var(--sk-surface)" /></>),
  watchlist: (<><line x1="5" y1="7" x2="19" y2="7" /><line x1="5" y1="12" x2="19" y2="12" /><line x1="5" y1="17" x2="13" y2="17" /><circle cx="17" cy="17" r="1.5" fill="var(--sk-brand)" stroke="none" /></>),
}

interface IconProps {
  name: BrandIconName
  className?: string
  label?: string
}

export function Icon({ name, className, label }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={cn('size-5 flex-none', className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {PATHS[name]}
    </svg>
  )
}
