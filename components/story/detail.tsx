import Link from 'next/link'
import { Icon } from '@/components/brand/icon'
import { Change, FreshnessMeta } from '@/components/market/quote'
import { Badge, Dot, Latin, Num, SectionHeader } from '@/components/sk/primitives'
import { ClaimLabel, SourceName } from '@/components/story/meta'
import { getAssetSync, getSourceSync } from '@/lib/api'
import { TIER_LABEL } from '@/lib/data/sources'
import { formatDate, formatDateTime, formatNumber, formatTime } from '@/lib/format'
import type { Story, TimelineItem } from '@/lib/types'
import { cn } from '@/lib/utils'

export function SummaryBlock({ story }: { story: Story }) {
  return (
    <section aria-labelledby="summary-title" className="mb-10">
      <SectionHeader title="خلاصه" id="summary-title" meta="هر جمله با نوع ادعا و منبعش" />
      <ol className="flex flex-col gap-4">
        {story.summary.map((s, i) => (
          <li key={i} className="flex flex-col gap-2 border-b border-line pb-4 last:border-b-0 md:flex-row md:items-start md:gap-4">
            <div className="flex-none md:w-28 md:pt-1">
              <ClaimLabel type={s.claimType} />
            </div>
            <div className="flex-1">
              <p className="mb-1.5 text-body text-ink">{s.text}</p>
              <p className="text-meta text-ink-3">
                {s.sourceSlugs.length === 0 ? (
                  <span className="text-unverified">بدون منبع تأییدکننده</span>
                ) : (
                  <>
                    منبع:{' '}
                    {s.sourceSlugs.map((slug, j) => (
                      <span key={slug}>
                        {j > 0 && '، '}
                        <SourceName slug={slug} />
                      </span>
                    ))}
                  </>
                )}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function WhyItMatters({ story }: { story: Story }) {
  return (
    <section aria-labelledby="why-title" className="mb-10 border-s-2 border-brand bg-brand-subtle/40 px-5 py-4">
      <h2 id="why-title" className="mb-2 text-h4 font-bold text-ink">
        چرا مهم است
      </h2>
      <p className="mb-3 text-body text-ink-2">{story.whyItMatters}</p>
      {story.whatChanged && (
        <p className="text-small text-ink-2">
          <span className="font-bold text-ink">چه چیزی تغییر کرد: </span>
          {story.whatChanged}
        </p>
      )}
      {story.financialImpactNote && (
        <p className="mt-2 text-small text-ink-2">
          <span className="font-bold text-ink">اثر مالی: </span>
          {story.financialImpactNote}
        </p>
      )}
    </section>
  )
}

export function WatchNext({ items }: { items: string[] }) {
  if (items.length === 0) return null
  return (
    <section aria-labelledby="watch-title" className="mb-10">
      <SectionHeader title="چه چیزی را دنبال کنیم" id="watch-title" size="sm" rule="rule" />
      <ul className="flex flex-col gap-2">
        {items.map((w) => (
          <li key={w} className="flex items-start gap-3 text-body text-ink-2">
            <Dot kind="upcoming" size={10} className="mt-2.5" />
            {w}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function ConflictBlock({ conflict }: { conflict: NonNullable<Story['conflict']> }) {
  return (
    <section aria-labelledby="conflict-title" className="mb-10 border border-unverified/40 bg-unverified-subtle/50 p-5">
      <div className="mb-3 flex items-center gap-2">
        <Dot kind="unverified" size={12} />
        <h2 id="conflict-title" className="text-h4 font-bold text-ink">
          {conflict.title}
        </h2>
      </div>
      <p className="mb-4 text-small text-ink-2">
        منابع روایت‌های متفاوتی منتشر کرده‌اند. سرخط هر دو روایت را با منبع نشان می‌دهد و میان آن‌ها داوری نمی‌کند.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {conflict.narratives.map((n, i) => (
          <figure key={i} className="flex flex-col gap-2 border-t-2 border-ink bg-surface p-4">
            <figcaption className="flex items-center justify-between text-meta text-ink-3">
              <SourceName slug={n.sourceSlug} withTier />
              <Num>{formatTime(n.at)}</Num>
            </figcaption>
            <blockquote className="text-body text-ink">{n.claim}</blockquote>
          </figure>
        ))}
      </div>
    </section>
  )
}

export function CorrectionNote({ correction }: { correction: NonNullable<Story['correction']> }) {
  return (
    <aside aria-labelledby="correction-title" className="mb-10 border-t-2 border-warning bg-warning-subtle/40 p-5">
      <h2 id="correction-title" className="mb-2 flex items-center gap-2 text-small font-bold text-ink">
        <Icon name="alert" className="size-4 text-warning" />
        تصحیح · <Num>{formatDateTime(correction.at)}</Num>
      </h2>
      <dl className="grid gap-2 text-small text-ink-2">
        <div className="flex flex-wrap gap-2">
          <dt className="font-semibold text-ink-3">پیش از تصحیح:</dt>
          <dd className="line-through decoration-ink-3">{correction.before}</dd>
        </div>
        <div className="flex flex-wrap gap-2">
          <dt className="font-semibold text-ink-3">پس از تصحیح:</dt>
          <dd className="font-semibold text-ink">{correction.after}</dd>
        </div>
        <div className="flex flex-wrap gap-2">
          <dt className="font-semibold text-ink-3">دلیل:</dt>
          <dd>{correction.reason}</dd>
        </div>
      </dl>
      <Link href="/corrections" className="mt-3 inline-block text-meta text-brand-text underline underline-offset-4">
        همهٔ تصحیح‌ها
      </Link>
    </aside>
  )
}

export function SourcesSection({ story }: { story: Story }) {
  return (
    <section aria-labelledby="sources-title" className="mb-10">
      <SectionHeader
        title="منابع"
        id="sources-title"
        meta={
          <>
            <Num>{formatNumber(story.sources.length)}</Num> منبع · مرتب بر اساس زمان انتشار
          </>
        }
      />
      <ol className="flex flex-col">
        {[...story.sources]
          .sort((a, b) => a.publishedAt.localeCompare(b.publishedAt))
          .map((item) => {
            const src = getSourceSync(item.sourceSlug)
            if (!src) return null
            return (
              <li key={item.sourceSlug + item.title} className="flex flex-col gap-1 border-b border-line py-3 md:flex-row md:items-baseline md:gap-4">
                <div className="flex flex-none items-center gap-2 md:w-48">
                  <SourceName slug={src.slug} />
                  {item.primary && <Badge tone="verified">منبع اصلی</Badge>}
                </div>
                <p className="flex-1 text-small text-ink-2">
                  {src.lang === 'en' ? <Latin>{item.title}</Latin> : item.title}
                </p>
                <div className="flex flex-none items-center gap-3 text-meta text-ink-3">
                  <span>{TIER_LABEL[src.tier]}</span>
                  <Num>{formatTime(item.publishedAt)}</Num>
                </div>
              </li>
            )
          })}
      </ol>
      <p className="mt-3 text-meta text-ink-3">
        سرخط متن کامل منابع را بازنشر نمی‌کند. سطح‌بندی منابع در{' '}
        <Link href="/editorial-policy#sources" className="text-brand-text underline underline-offset-4">
          سیاست تحریریه
        </Link>{' '}
        توضیح داده شده است.
      </p>
    </section>
  )
}

const TL_DOT: Record<TimelineItem['kind'], 'past' | 'important' | 'upcoming' | 'unverified'> = {
  past: 'past',
  today: 'important',
  upcoming: 'upcoming',
  conflict: 'unverified',
}

export function TimelineSection({ items }: { items: TimelineItem[] }) {
  if (items.length < 2) return null
  const sorted = [...items].sort((a, b) => a.at.localeCompare(b.at))
  return (
    <section aria-labelledby="timeline-title" className="mb-10">
      <SectionHeader title="خط زمانی" id="timeline-title" />
      <ol className="relative flex flex-col gap-5 border-s border-line-strong ps-6">
        {sorted.map((t, i) => {
          const body = (
            <>
              <span className="block text-meta text-ink-3">
                <Num>{formatDate(t.at)}</Num>
                {t.kind === 'upcoming' && <span className="ms-2 font-semibold text-ink">· پیش رو</span>}
                {t.kind === 'conflict' && <span className="ms-2 font-semibold text-unverified">· روایت متناقض</span>}
              </span>
              <span className={cn('text-body text-ink', t.kind === 'today' && 'font-bold')}>{t.label}</span>
            </>
          )
          return (
            <li key={i} className="relative">
              <Dot
                kind={TL_DOT[t.kind]}
                size={12}
                className={cn('absolute -start-[30.5px] top-1.5', (t.kind === 'upcoming' || t.kind === 'conflict') && 'bg-surface')}
              />
              {t.storySlug ? (
                <Link href={`/story/${t.storySlug}`} className="flex flex-col hover:underline hover:underline-offset-4">
                  {body}
                </Link>
              ) : (
                <div className="flex flex-col">{body}</div>
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export function AffectedAssetsPanel({ story }: { story: Story }) {
  if (story.affectedAssets.length === 0) return null
  return (
    <section aria-labelledby="assets-title" className="border-t-2 border-ink pt-3">
      <h2 id="assets-title" className="mb-1 text-h4 font-bold text-ink">
        دارایی‌های مرتبط
      </h2>
      <p className="mb-3 text-meta text-ink-3">«اثرپذیر» یعنی رویداد مستقیماً به این دارایی مربوط است؛ «ذکرشده» یعنی فقط در متن آمده.</p>
      <ul className="flex flex-col">
        {story.affectedAssets.map(({ assetSlug, relation }) => {
          const a = getAssetSync(assetSlug)
          if (!a) return null
          return (
            <li key={assetSlug} className="border-b border-line py-3 last:border-b-0">
              <Link href={`/asset/${a.slug}`} className="group flex flex-col gap-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-ink group-hover:underline group-hover:underline-offset-4">{a.name}</span>
                  <Badge tone={relation === 'affected' ? 'brand' : 'neutral'}>{relation === 'affected' ? 'اثرپذیر' : 'ذکرشده'}</Badge>
                </span>
                {a.quote ? (
                  <>
                    <span className="flex items-baseline gap-2">
                      <Num className="text-h4 font-bold text-ink">{formatNumber(a.quote.value, a.quote.decimals ?? 0)}</Num>
                      <span className="text-meta text-ink-3">{a.quote.unit}</span>
                      <Change value={a.quote.changePercent} />
                    </span>
                    <FreshnessMeta quote={a.quote} />
                  </>
                ) : (
                  <span className="text-meta text-ink-3">در انتظار دادهٔ دارای مجوز</span>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function DateStamp({ story }: { story: Story }) {
  const updated = story.updatedAt !== story.publishedAt
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-meta text-ink-3">
      <span>
        انتشار: <time dateTime={story.publishedAt}><Num>{formatDateTime(story.publishedAt)}</Num></time>
      </span>
      {updated && (
        <span>
          به‌روزرسانی: <time dateTime={story.updatedAt}><Num>{formatTime(story.updatedAt)}</Num></time>
        </span>
      )}
    </div>
  )
}
