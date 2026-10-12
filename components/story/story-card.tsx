import Link from 'next/link'
import { Dot, Num } from '@/components/sk/primitives'
import { AiDisclosure, AssetChips, StoryMetaLine } from '@/components/story/meta'
import { hasTrustedSource } from '@/lib/api'
import { formatNumber } from '@/lib/format'
import type { Story } from '@/lib/types'
import { cn } from '@/lib/utils'

/** Lead story: 2px ink head-rule, big headline, dek, why-it-matters. One per view. */
export function LeadStory({ story, rank }: { story: Story; rank?: number }) {
  return (
    <article className="sk-card-interactive border-t-2 border-ink pt-5">
      <div className="mb-3 flex items-center gap-3">
        {rank !== undefined && (
          <span className="flex items-center gap-2 text-meta font-bold text-ink">
            <Dot kind="important" />
            رویداد <Num>{formatNumber(rank)}</Num>
          </span>
        )}
        <StoryMetaLine story={story} />
      </div>
      <h3 className="mb-3 text-h1 font-bold text-ink">
        <Link href={`/story/${story.slug}`} className="after:absolute after:inset-0 hover:underline hover:decoration-2 hover:underline-offset-8">
          {story.title}
        </Link>
      </h3>
      <p className="mb-4 max-w-reading text-body-l text-ink-2">{story.dek}</p>
      <div className="mb-4 max-w-reading border-s-2 border-brand ps-4">
        <p className="mb-1 text-meta font-bold text-ink">چرا مهم است</p>
        <p className="text-small text-ink-2">{story.whyItMatters}</p>
      </div>
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
        <AssetChips story={story} />
        <AiDisclosure review={story.reviewState} />
      </div>
    </article>
  )
}

/** Standard card for grids and rails. */
export function StoryCard({ story, rank, showDek = true, className }: { story: Story; rank?: number; showDek?: boolean; className?: string }) {
  const unverified = !hasTrustedSource(story)
  return (
    <article className={cn('sk-card-interactive relative flex flex-col gap-2 border-t border-line pt-4', className)}>
      <div className="flex items-center gap-2">
        {rank !== undefined && (
          <span className="text-meta font-bold text-ink">
            <Num>{formatNumber(rank)}</Num>
            <span className="sr-only">. </span>
          </span>
        )}
        <StoryMetaLine story={story} />
      </div>
      <h3 className="text-h4 font-bold text-ink">
        <Link href={`/story/${story.slug}`} className="after:absolute after:inset-0 hover:underline hover:underline-offset-4">
          {unverified && <Dot kind="unverified" size={9} className="me-2 align-middle" />}
          {story.title}
        </Link>
      </h3>
      {showDek && <p className="line-clamp-3 text-small text-ink-2">{story.dek}</p>}
      <div className="relative z-10 mt-1">
        <AssetChips story={story} limit={2} />
      </div>
    </article>
  )
}

/** Dense row for lists, search results and rails. */
export function StoryRow({ story, withDate = true, highlight }: { story: Story; withDate?: boolean; highlight?: (t: string) => React.ReactNode }) {
  return (
    <article className="relative flex flex-col gap-1.5 border-b border-line py-4 transition-colors hover:bg-hover/50">
      <StoryMetaLine story={story} withDate={withDate} />
      <h3 className="text-body font-bold text-ink">
        <Link href={`/story/${story.slug}`} className="after:absolute after:inset-0 hover:underline hover:underline-offset-4">
          {highlight ? highlight(story.title) : story.title}
        </Link>
      </h3>
      <p className="line-clamp-2 text-small text-ink-2">{highlight ? highlight(story.dek) : story.dek}</p>
    </article>
  )
}
