import Link from 'next/link'
import { Breadcrumb, HubLayout } from '@/components/listing/hub'
import { Num, SectionHeader } from '@/components/sk/primitives'
import { AiDisclosure, AssetChips, CategoryLink, SourceCount } from '@/components/story/meta'
import { getBriefingDates, getStoriesBySlugs } from '@/lib/api'
import { formatDateShort, formatDateWithWeekday, formatNumber, formatTime } from '@/lib/format'
import type { Briefing } from '@/lib/types'

export async function BriefingView({ briefing, isToday }: { briefing: Briefing; isToday: boolean }) {
  const [stories, dates] = await Promise.all([getStoriesBySlugs(briefing.storySlugs), getBriefingDates()])
  const others = dates.filter((d) => d !== briefing.date)

  return (
    <HubLayout
      aside={
        others.length > 0 ? (
          <nav aria-labelledby="archive">
            <SectionHeader id="archive" title="سرخط روزهای پیش" size="sm" />
            <ul className="flex flex-col">
              {others.map((d) => (
                <li key={d}>
                  <Link href={`/briefing/${d}`} className="flex border-b border-line py-3 text-small text-ink hover:underline hover:underline-offset-4">
                    {formatDateWithWeekday(`${d}T08:00:00+03:30`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : undefined
      }
    >
      <Breadcrumb items={[{ label: isToday ? 'سرخط امروز' : `سرخط ${formatDateShort(briefing.publishedAt)}` }]} />
      <header className="mb-10 border-b-2 border-ink pb-6">
        <p className="mb-2 text-meta font-bold text-ink-3">
          {formatDateWithWeekday(briefing.publishedAt)} · انتشار ساعت <Num>{formatTime(briefing.publishedAt)}</Num>
        </p>
        <h1 className="mb-3 text-display font-bold text-ink">{isToday ? 'سرخط امروز' : 'سرخط'}</h1>
        <p className="max-w-reading text-body-l text-ink-2">{briefing.intro}</p>
      </header>

      <ol className="flex flex-col">
        {stories.map((s, i) => (
          <li key={s.slug} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-b border-line py-6 first:pt-0">
            <span className="text-h2 font-bold leading-none text-brand-text" aria-hidden="true">
              <Num>{formatNumber(i + 1)}</Num>
            </span>
            <article className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-meta text-ink-3">
                <CategoryLink slug={s.categorySlug} />
                <SourceCount story={s} />
              </div>
              <h2 className="text-h3 font-bold text-ink text-balance">
                <Link href={`/story/${s.slug}`} className="hover:underline hover:underline-offset-4">
                  {s.title}
                </Link>
              </h2>
              <p className="max-w-reading text-body text-ink-2">{s.dek}</p>
              <p className="max-w-reading border-s-2 border-brand ps-3 text-small text-ink-2">
                <span className="font-semibold text-ink">چرا مهم است: </span>
                {s.whyItMatters}
              </p>
              <AssetChips story={s} />
            </article>
          </li>
        ))}
      </ol>
      <div className="mt-6">
        <AiDisclosure review="reviewed" />
      </div>
    </HubLayout>
  )
}
