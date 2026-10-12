import Link from 'next/link'
import { Dot, Num } from '@/components/sk/primitives'
import { changeDirection, formatNumber, formatPercent, formatTime, formatDateTime } from '@/lib/format'
import type { Asset, AssetQuote, FreshnessType } from '@/lib/types'
import { cn } from '@/lib/utils'

export const FRESHNESS_LABEL: Record<FreshnessType, string> = {
  realtime: 'لحظه‌ای',
  near_realtime: 'نزدیک به لحظه',
  delayed: 'با تأخیر',
  eod: 'پایان روز',
  indicative: 'شاخص‌گونه',
  official: 'نرخ رسمی',
}

export function freshnessText(q: AssetQuote): string {
  if (q.freshness === 'delayed' && q.delayMinutes) return `با تأخیر ${formatNumber(q.delayMinutes)} دقیقه`
  return FRESHNESS_LABEL[q.freshness]
}

/** Change is always conveyed by sign + arrow + colour together (WCAG 1.4.1). */
export function Change({ value, className }: { value?: number; className?: string }) {
  if (value === undefined) return null
  const dir = changeDirection(value)
  const arrow = dir === 'up' ? '▲' : dir === 'down' ? '▼' : '•'
  const label = dir === 'up' ? 'افزایش' : dir === 'down' ? 'کاهش' : 'بدون تغییر'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-small font-semibold',
        dir === 'up' && 'text-up',
        dir === 'down' && 'text-down',
        dir === 'flat' && 'text-flat',
        className,
      )}
    >
      <span aria-hidden="true" className="text-[0.7em]">
        {arrow}
      </span>
      <span className="sr-only">{label}</span>
      <Num>{formatPercent(value, Math.abs(value) < 1 ? 2 : 1)}</Num>
    </span>
  )
}

export function FreshnessMeta({ quote, long = false }: { quote: AssetQuote; long?: boolean }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-x-1.5 text-meta text-ink-3">
      <span>{freshnessText(quote)}</span>
      <span aria-hidden="true">·</span>
      <span>{quote.provider}</span>
      <span aria-hidden="true">·</span>
      <Num>{long ? formatDateTime(quote.fetchedAt) : formatTime(quote.fetchedAt)}</Num>
    </span>
  )
}

/** Compact cell for the market strip. Shows an explicit "awaiting licensed data" state instead of a fake number. */
export function MarketCell({ asset }: { asset: Asset }) {
  const q = asset.quote
  return (
    <Link
      href={`/asset/${asset.slug}`}
      className="group flex min-w-[168px] flex-col gap-1 px-4 py-3 transition-colors hover:bg-hover md:min-w-0"
    >
      <span className="text-small font-semibold text-ink group-hover:underline group-hover:underline-offset-4">{asset.name}</span>
      {q ? (
        <>
          <span className="flex items-baseline gap-2">
            <Num className="text-price font-bold text-ink">{formatNumber(q.value, q.decimals ?? 0)}</Num>
            <span className="text-meta text-ink-3">{q.unit}</span>
          </span>
          <span className="flex items-center gap-2">
            <Change value={q.changePercent} />
            <span className="text-meta text-ink-3">{freshnessText(q)}</span>
          </span>
        </>
      ) : (
        <span className="flex items-center gap-2 py-1 text-meta text-ink-3">
          <Dot kind="neutral" size={6} />
          در انتظار دادهٔ دارای مجوز
        </span>
      )}
    </Link>
  )
}

/** Minimal price line. Plain SVG polyline; no fill, no gridlines — the number is the hero. */
export function Sparkline({ points, className, label }: { points: number[]; className?: string; label: string }) {
  if (points.length < 2) return null
  const w = 320
  const h = 96
  const min = Math.min(...points)
  const max = Math.max(...points)
  const span = max - min || 1
  // RTL reading: time flows right → left, so the latest value sits at the left edge.
  const coords = points.map((v, i) => {
    const x = w - (i / (points.length - 1)) * w
    const y = h - 6 - ((v - min) / span) * (h - 12)
    return [x, y] as const
  })
  const last = coords[coords.length - 1]
  const dir = points[points.length - 1] >= points[0] ? 'var(--sk-up)' : 'var(--sk-down)'
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn('h-24 w-full overflow-visible', className)} role="img" aria-label={label} preserveAspectRatio="none">
      <line x1="0" x2={w} y1={h} y2={h} stroke="var(--sk-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <polyline
        points={coords.map(([x, y]) => `${x},${y}`).join(' ')}
        fill="none"
        stroke={dir}
        strokeWidth="2"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={last[0]} cy={last[1]} r="4" fill={dir} />
    </svg>
  )
}
