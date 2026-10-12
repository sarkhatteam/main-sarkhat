import Link from 'next/link'
import { Icon } from '@/components/brand/icon'
import { Badge, Dot, Num } from '@/components/sk/primitives'
import { getAssetSync, getCategorySync, getSourceSync, hasTrustedSource } from '@/lib/api'
import { formatDateTime, formatNumber, formatTime } from '@/lib/format'
import type { ClaimType, ReviewState, Story } from '@/lib/types'
import { cn } from '@/lib/utils'

export const CLAIM_LABEL: Record<ClaimType, string> = {
  fact: 'واقعیت',
  official_data: 'دادهٔ رسمی',
  market_data: 'دادهٔ بازار',
  reported: 'گزارش‌شده',
  analysis: 'تحلیل',
  uncertain: 'نامشخص',
}

const CLAIM_TONE: Record<ClaimType, 'verified' | 'info' | 'neutral' | 'unverified' | 'ai'> = {
  fact: 'verified',
  official_data: 'verified',
  market_data: 'info',
  reported: 'neutral',
  analysis: 'ai',
  uncertain: 'unverified',
}

export function ClaimLabel({ type }: { type: ClaimType }) {
  return <Badge tone={CLAIM_TONE[type]}>{CLAIM_LABEL[type]}</Badge>
}

export const REVIEW_LABEL: Record<ReviewState, string> = {
  reviewed: 'بازبینی‌شده توسط تحریریه',
  sampled: 'در نمونهٔ بازبینی روزانه',
  auto: 'انتشار خودکار',
}

/** AI disclosure, always visible, never hidden in a tooltip (§30). */
export function AiDisclosure({ review, className }: { review: ReviewState; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2 text-meta text-ink-3', className)}>
      <Dot kind="ai" size={10} />
      <span>
        خلاصه با کمک هوش مصنوعی · {REVIEW_LABEL[review]}
      </span>
    </span>
  )
}

export function CategoryLink({ slug, className }: { slug: string; className?: string }) {
  const c = getCategorySync(slug)
  if (!c) return null
  return (
    <Link href={`/category/${c.slug}`} className={cn('text-meta font-semibold text-brand-text hover:underline hover:underline-offset-4', className)}>
      {c.name}
    </Link>
  )
}

export function SourceCount({ story }: { story: Story }) {
  const trusted = hasTrustedSource(story)
  return (
    <span className={cn('inline-flex items-center gap-1.5', trusted ? 'text-ink-3' : 'text-unverified')}>
      <Icon name="source" className="size-3.5" />
      <Num>{formatNumber(story.sources.length)}</Num> منبع
      {!trusted && <span className="font-semibold">· تأییدنشده</span>}
    </span>
  )
}

export function StoryMetaLine({ story, withDate = false }: { story: Story; withDate?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-meta text-ink-3">
      <CategoryLink slug={story.categorySlug} />
      <time dateTime={story.publishedAt}>
        <Num>{withDate ? formatDateTime(story.publishedAt) : formatTime(story.publishedAt)}</Num>
      </time>
      <SourceCount story={story} />
    </div>
  )
}

export function AssetChips({ story, limit = 3 }: { story: Story; limit?: number }) {
  const items = story.affectedAssets.slice(0, limit)
  if (items.length === 0) return null
  return (
    <ul className="flex flex-wrap gap-2" aria-label="دارایی‌های مرتبط">
      {items.map(({ assetSlug, relation }) => {
        const a = getAssetSync(assetSlug)
        if (!a) return null
        return (
          <li key={assetSlug}>
            <Link
              href={`/asset/${a.slug}`}
              className="inline-flex h-7 items-center gap-1.5 rounded-sm border border-line-tag px-2 text-meta text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
            >
              {relation === 'affected' && <Dot kind="past" size={6} />}
              {a.name}
              <span className="sr-only">{relation === 'affected' ? '(اثرپذیر)' : '(ذکرشده)'}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function SourceName({ slug, withTier = false }: { slug: string; withTier?: boolean }) {
  const s = getSourceSync(slug)
  if (!s) return null
  return (
    <Link href={`/source/${s.slug}`} className="font-semibold text-ink hover:underline hover:underline-offset-4">
      {s.name}
      {withTier && <span className="ms-1 font-normal text-ink-3">(سطح <Num>{formatNumber(s.tier)}</Num>)</span>}
    </Link>
  )
}
