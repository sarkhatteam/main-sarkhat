import { cn } from '@/lib/utils'

/** Official Sarkhat wordmark geometry, redrawn 1:1 from the brand files. Never typeset the name in a font. */
const WORD: [number, number, number, number][] = [
  [0, 5, 3.5, 1], [0, 3, 3.5, 1], [0, 3, 1, 3], [2.5, 3, 1, 3], [1, 0, 1, 3.2], [3.4, 5, 1.2, 1],
  [4.5, 3, 1, 3], [4.5, 3, 3.5, 1], [9.6, 5, 1, 2.8], [8.5, 6.8, 2.1, 1], [9.6, 5, 7, 1],
  [11.2, 3.8, 1, 1.3], [13.4, 3.8, 1, 1.3], [15.6, 3.8, 1, 1.3],
]

interface LogoProps {
  variant?: 'wordmark' | 'symbol'
  tone?: 'auto' | 'inverse' | 'mono'
  className?: string
  title?: string
}

export function Logo({ variant = 'wordmark', tone = 'auto', className, title = 'سرخط' }: LogoProps) {
  const ink = tone === 'inverse' ? 'var(--sk-text-inverse)' : tone === 'mono' ? 'currentColor' : 'var(--sk-brand-ink)'
  const dot = tone === 'mono' ? 'currentColor' : 'var(--sk-brand)'

  if (variant === 'symbol') {
    return (
      <svg viewBox="0 0 4.5 3" className={cn('block h-3.5 w-auto flex-none', className)} role="img" aria-label={title}>
        <rect x="0" y="2" width="4.5" height="1" fill={ink} />
        <circle cx="3.65" cy="0.75" r="0.65" fill={dot} />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 16.6 7.8" className={cn('block h-8 w-auto flex-none', className)} role="img" aria-label={title}>
      <g fill={ink}>
        {WORD.map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} />
        ))}
      </g>
      <circle cx="7.15" cy="1.75" r="0.65" fill={dot} />
    </svg>
  )
}
