import Link from 'next/link'
import { cn } from '@/lib/utils'

/** Numbers and Latin tokens are isolated with <bdi> so RTL never flips signs or digit order. */
export function Num({ children, className }: { children: React.ReactNode; className?: string }) {
  return <bdi className={cn('sk-num', className)}>{children}</bdi>
}

export function Latin({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <bdi dir="ltr" lang="en" className={cn('sk-latin', className)}>
      {children}
    </bdi>
  )
}

export type DotKind = 'important' | 'verified' | 'ai' | 'unverified' | 'upcoming' | 'past' | 'live' | 'stale' | 'neutral'

const DOT_CLASS: Record<DotKind, string> = {
  important: 'bg-brand',
  verified: 'bg-verified',
  ai: 'border-2 border-ai',
  unverified: 'border-2 border-dashed border-unverified',
  upcoming: 'border-2 border-ink',
  past: 'bg-ink',
  live: 'bg-success',
  stale: 'bg-warning',
  neutral: 'bg-ink-3',
}

/** The brand dot — one meaningful mark per view. Never decorative. */
export function Dot({ kind, size = 10, className }: { kind: DotKind; size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block flex-none rounded-full', DOT_CLASS[kind], className)}
      style={{ width: size, height: size }}
    />
  )
}

interface SectionHeaderProps {
  title: string
  as?: 'h1' | 'h2' | 'h3'
  size?: 'lg' | 'sm'
  meta?: React.ReactNode
  action?: React.ReactNode
  rule?: 'head' | 'rule'
  id?: string
  className?: string
}

/** Section title over a 2px ink head-rule — the system's main structural device. */
export function SectionHeader({ title, as: Tag = 'h2', size = 'lg', meta, action, rule = 'head', id, className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 pb-2',
        rule === 'head' ? 'border-b-2 border-ink' : 'border-b border-line',
        className,
      )}
    >
      <Tag id={id} className={cn('font-bold text-ink', size === 'lg' ? 'text-h3' : 'text-h4')}>
        {title}
      </Tag>
      {meta && <span className="text-meta text-ink-3">{meta}</span>}
      {action && <div className="ms-auto">{action}</div>}
    </div>
  )
}

export function Tag({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex h-8 items-center gap-2 rounded-sm border border-line-tag px-2.5 text-small leading-none text-ink transition-colors hover:border-line-strong hover:bg-hover',
        className,
      )}
    >
      {children}
    </Link>
  )
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

const VARIANT: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-brand-on hover:bg-brand-hover active:bg-brand-active',
  secondary: 'border border-line-strong bg-transparent text-ink hover:bg-hover active:bg-pressed',
  ghost: 'bg-transparent text-ink hover:bg-hover active:bg-pressed',
  link: 'bg-transparent px-1 text-brand-text underline underline-offset-4 hover:text-ink',
}
const SIZE: Record<ButtonSize, string> = {
  sm: 'h-9 min-w-9 px-3 text-small',
  md: 'h-11 min-w-11 px-4 text-[15px]',
  lg: 'h-13 min-w-13 px-5 text-body',
}

export function buttonClass(variant: ButtonVariant = 'secondary', size: ButtonSize = 'md', className?: string) {
  return cn(
    'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-[4px] font-semibold leading-none transition-colors disabled:pointer-events-none disabled:opacity-50',
    VARIANT[variant],
    variant !== 'link' && SIZE[size],
    className,
  )
}

type BadgeTone = 'neutral' | 'brand' | 'verified' | 'unverified' | 'ai' | 'warning' | 'error' | 'info' | 'success'

const BADGE: Record<BadgeTone, string> = {
  neutral: 'bg-sunken text-ink-2 border-line',
  brand: 'bg-brand-subtle text-brand-text border-brand-muted',
  verified: 'bg-verified-subtle text-verified border-transparent',
  unverified: 'bg-unverified-subtle text-unverified border-transparent',
  ai: 'bg-ai-subtle text-ai border-transparent',
  warning: 'bg-warning-subtle text-warning border-transparent',
  error: 'bg-error-subtle text-error border-transparent',
  info: 'bg-info-subtle text-info border-transparent',
  success: 'bg-success-subtle text-success border-transparent',
}

export function Badge({ tone = 'neutral', children, className }: { tone?: BadgeTone; children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex h-6 items-center gap-1.5 rounded-sm border px-2 text-label font-semibold leading-none', BADGE[tone], className)}>
      {children}
    </span>
  )
}

/** Shared container: 1240px max, 24px gutters on desktop, 16px on mobile. */
export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-content px-4 md:px-6', className)}>{children}</div>
}
