import Link from 'next/link'
import { Icon } from '@/components/brand/icon'
import { buttonClass, Dot, Num, SectionHeader } from '@/components/sk/primitives'
import { SourceName } from '@/components/story/meta'
import { StoryCard, StoryRow } from '@/components/story/story-card'
import { COUNTRY_LABEL, IMPORTANCE_LABEL } from '@/lib/data/briefings'
import { formatDateShort, formatNumber, formatTime } from '@/lib/format'
import type { Briefing, CalendarEvent, Category, Story } from '@/lib/types'

export function BriefingTeaser({ briefing, count }: { briefing: Briefing; count: number }) {
  return (
    <section aria-labelledby="briefing-teaser" className="bg-ink text-paper">
      <div className="flex flex-col gap-4 p-5 md:p-6">
        <div className="flex items-center gap-2 text-meta text-paper/70">
          <Icon name="news" className="size-4" />
          <span>
            <Num>{formatDateShort(briefing.publishedAt)}</Num> · ساعت <Num>{formatTime(briefing.publishedAt)}</Num>
          </span>
        </div>
        <h2 id="briefing-teaser" className="text-h3 font-bold">
          سرخط امروز
        </h2>
        <p className="text-small text-paper/80">{briefing.intro}</p>
        <Link href="/today" className="inline-flex h-11 items-center justify-center gap-2 rounded-[4px] bg-brand px-4 text-[15px] font-semibold text-brand-on hover:bg-brand-hover">
          خواندن <Num>{formatNumber(count)}</Num> رویداد مهم امروز
        </Link>
      </div>
    </section>
  )
}

export function LatestStream({ stories }: { stories: Story[] }) {
  return (
    <section aria-labelledby="latest">
      <SectionHeader id="latest" title="تازه‌ترین رویدادها" meta="به ترتیب زمان انتشار" />
      <div>
        {stories.map((s) => (
          <StoryRow key={s.slug} story={s} />
        ))}
      </div>
    </section>
  )
}

export function UpcomingCalendar({ events }: { events: CalendarEvent[] }) {
  return (
    <section aria-labelledby="upcoming">
      <SectionHeader
        id="upcoming"
        title="پیش رو"
        size="sm"
        action={
          <Link href="/calendar" className={buttonClass('link', 'sm', 'text-small')}>
            تقویم کامل
          </Link>
        }
      />
      <ol className="flex flex-col">
        {events.map((e) => (
          <li key={e.id} className="flex gap-3 border-b border-line py-3">
            <div className="w-14 flex-none text-meta text-ink-3">
              <Num>{formatDateShort(e.scheduledAt)}</Num>
              {!e.dateOnly && (
                <div>
                  <Num>{formatTime(e.scheduledAt)}</Num>
                </div>
              )}
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <p className="text-small font-semibold text-ink">{e.title}</p>
              <p className="flex flex-wrap items-center gap-x-2 text-meta text-ink-3">
                <Dot kind={e.status === 'confirmed' ? 'upcoming' : 'unverified'} size={8} />
                <span>{e.status === 'confirmed' ? 'تأییدشده' : 'زمان قطعی نیست'}</span>
                <span aria-hidden="true">·</span>
                <span>{COUNTRY_LABEL[e.country]}</span>
                <span aria-hidden="true">·</span>
                <span>اهمیت {IMPORTANCE_LABEL[e.importance]}</span>
                <span aria-hidden="true">·</span>
                <SourceName slug={e.sourceSlug} />
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function CategorySection({ category, stories }: { category: Category; stories: Story[] }) {
  if (stories.length === 0) return null
  return (
    <section aria-labelledby={`cat-${category.slug}`}>
      <SectionHeader
        id={`cat-${category.slug}`}
        title={category.name}
        action={
          <Link href={`/category/${category.slug}`} className={buttonClass('link', 'sm', 'text-small')}>
            همهٔ رویدادهای {category.name}
          </Link>
        }
      />
      <div className="grid gap-x-6 gap-y-2 md:grid-cols-3">
        {stories.slice(0, 3).map((s) => (
          <StoryCard key={s.slug} story={s} />
        ))}
      </div>
    </section>
  )
}

export function TrustNote() {
  return (
    <aside aria-label="روش کار سرخط" className="border border-line bg-surface p-5">
      <div className="mb-2 flex items-center gap-2">
        <Icon name="source" className="size-5 text-ink" />
        <h2 className="text-h4 font-bold text-ink">سرخط چطور کار می‌کند</h2>
      </div>
      <p className="mb-3 text-small text-ink-2">
        هر رویداد از چند منبع گردآوری می‌شود، خلاصه‌اش با کمک هوش مصنوعی نوشته و پیش از انتشار مرور می‌شود. نوع هر جمله، منبع و زمان هر عدد همیشه کنارش نمایش داده می‌شود.
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        <Link href="/editorial-policy" className="text-small text-ink underline underline-offset-4">
          سیاست تحریریه
        </Link>
        <Link href="/ai-policy" className="text-small text-ink underline underline-offset-4">
          سیاست هوش مصنوعی
        </Link>
      </div>
    </aside>
  )
}
