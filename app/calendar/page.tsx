import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb, HubHeader, HubLayout } from '@/components/listing/hub'
import { Badge, Dot, Num, SectionHeader } from '@/components/sk/primitives'
import { SourceName } from '@/components/story/meta'
import { getCalendar, getCategorySync } from '@/lib/api'
import { formatDateWithWeekday, formatTime, tehranDateKey } from '@/lib/format'
import type { CalendarEvent, CalendarImportance } from '@/lib/types'

export const metadata: Metadata = {
  title: 'تقویم اقتصادی',
  description: 'رویدادهای پیش‌روی اقتصاد ایران و جهان؛ نشست‌ها، انتشار داده‌ها و مهلت‌ها، با منبع اعلام.',
  alternates: { canonical: '/calendar' },
}

const COUNTRY: Record<CalendarEvent['country'], string> = { IR: 'ایران', US: 'آمریکا', EU: 'اروپا', GLOBAL: 'جهانی' }
const IMPORTANCE: Record<CalendarImportance, { label: string; tone: 'brand' | 'neutral' | 'info' }> = {
  high: { label: 'اهمیت بالا', tone: 'brand' },
  medium: { label: 'اهمیت متوسط', tone: 'info' },
  low: { label: 'اهمیت کم', tone: 'neutral' },
}

export default async function CalendarPage() {
  const events = (await getCalendar()).slice().sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt))
  const days = new Map<string, CalendarEvent[]>()
  for (const e of events) {
    const k = tehranDateKey(e.scheduledAt)
    days.set(k, [...(days.get(k) ?? []), e])
  }

  return (
    <HubLayout>
      <Breadcrumb items={[{ label: 'تقویم اقتصادی' }]} />
      <HubHeader
        kicker="پیش‌رو"
        title="تقویم اقتصادی"
        icon="calendar"
        description="زمان‌ها به وقت تهران است. رویدادهایی که فقط تاریخشان اعلام شده، بدون ساعت نمایش داده می‌شوند."
      />
      {events.length === 0 ? (
        <p className="border border-dashed border-line-strong p-6 text-small text-ink-2">فعلاً رویداد اعلام‌شده‌ای در تقویم نیست.</p>
      ) : (
        <div className="flex flex-col gap-10">
          {[...days.entries()].map(([key, list]) => (
            <section key={key} aria-labelledby={`d-${key}`}>
              <SectionHeader id={`d-${key}`} title={formatDateWithWeekday(list[0].scheduledAt)} size="sm" />
              <ul className="flex flex-col">
                {list.map((e) => {
                  const imp = IMPORTANCE[e.importance]
                  const cat = getCategorySync(e.categorySlug)
                  return (
                    <li key={e.id} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-4 border-b border-line py-4">
                      <span className="pt-0.5 text-small font-semibold text-ink">
                        {e.dateOnly ? <span className="text-ink-3">بدون ساعت</span> : <Num>{formatTime(e.scheduledAt)}</Num>}
                      </span>
                      <div className="flex flex-col gap-2">
                        <h3 className="flex items-start gap-2 text-body font-semibold text-ink">
                          <Dot kind="upcoming" className="mt-2" />
                          {e.relatedStorySlug ? (
                            <Link href={`/story/${e.relatedStorySlug}`} className="hover:underline hover:underline-offset-4">
                              {e.title}
                            </Link>
                          ) : (
                            e.title
                          )}
                        </h3>
                        {e.note && <p className="text-small text-ink-2">{e.note}</p>}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-meta text-ink-3">
                          <Badge tone={imp.tone}>{imp.label}</Badge>
                          {e.status === 'tentative' && <Badge tone="warning">زمان قطعی نیست</Badge>}
                          <span>{COUNTRY[e.country]}</span>
                          {cat && (
                            <Link href={`/category/${cat.slug}`} className="hover:underline">
                              {cat.name}
                            </Link>
                          )}
                          <span>
                            منبع: <SourceName slug={e.sourceSlug} />
                          </span>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </HubLayout>
  )
}
