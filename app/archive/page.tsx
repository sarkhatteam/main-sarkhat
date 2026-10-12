import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb, HubHeader, HubLayout } from '@/components/listing/hub'
import { Num } from '@/components/sk/primitives'
import { getBriefing, getBriefingDates } from '@/lib/api'
import { formatDateWithWeekday, formatNumber } from '@/lib/format'

export const metadata: Metadata = {
  title: 'آرشیو روزانه',
  description: 'همهٔ سرخط‌های روزانه، به ترتیب تاریخ.',
  alternates: { canonical: '/archive' },
}

export default async function ArchivePage() {
  const dates = await getBriefingDates()
  const briefings = (await Promise.all(dates.map((d) => getBriefing(d)))).filter((b) => b !== undefined)

  return (
    <HubLayout>
      <Breadcrumb items={[{ label: 'آرشیو روزانه' }]} />
      <HubHeader kicker="آرشیو" title="آرشیو روزانه" icon="news" description="هر روز یک سرخط؛ خلاصهٔ مهم‌ترین رویدادهای اقتصادی همان روز، با منبع." />
      <ul className="flex flex-col">
        {briefings.map((b) => (
          <li key={b.date} className="border-b border-line">
            <Link href={`/briefing/${b.date}`} className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <span className="text-h4 font-semibold text-ink group-hover:underline group-hover:underline-offset-4">{formatDateWithWeekday(b.publishedAt)}</span>
              <span className="text-meta text-ink-3">
                <Num>{formatNumber(b.storySlugs.length)}</Num> رویداد
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </HubLayout>
  )
}
