import { BriefingTeaser, CategorySection, LatestStream, TrustNote, UpcomingCalendar } from '@/components/home/sections'
import { MarketStrip } from '@/components/market/market-strip'
import { Container, SectionHeader } from '@/components/sk/primitives'
import { LeadStory, StoryCard } from '@/components/story/story-card'
import { getCalendar, getCategory, getStories, getTodayBriefing, rankForHomepage } from '@/lib/api'
import { DEMO_NOW } from '@/lib/site'

export default async function HomePage() {
  const [stories, briefing, calendar, fxGold, policy] = await Promise.all([
    getStories(),
    getTodayBriefing(),
    getCalendar(),
    getCategory('fx-gold'),
    getCategory('policy'),
  ])
  const top = rankForHomepage(stories, 5)
  const [lead, ...rest] = top
  const topSlugs = new Set(top.map((s) => s.slug))
  const latest = stories.filter((s) => !topSlugs.has(s.slug)).slice(0, 8)
  const upcoming = calendar.filter((e) => e.scheduledAt >= DEMO_NOW).slice(0, 4)
  const [fxStories, policyStories] = await Promise.all([getStories({ category: 'fx-gold' }), getStories({ category: 'policy' })])

  return (
    <>
      <MarketStrip />
      <Container className="flex flex-col gap-14 py-8">
        <h1 className="sr-only">سرخط — مهم‌ترین رویدادهای مالی امروز</h1>
        <section aria-labelledby="top-stories" className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div>
            <SectionHeader id="top-stories" title="مهم‌ترین‌های امروز" meta="رتبه‌بندی بر اساس اهمیت، اعتبار منبع و اثر مالی" />
            {lead && <LeadStory story={lead} rank={1} />}
            <div className="mt-8 grid gap-x-6 gap-y-6 md:grid-cols-2">
              {rest.map((s, i) => (
                <StoryCard key={s.slug} story={s} rank={i + 2} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <BriefingTeaser briefing={briefing} count={briefing.storySlugs.length} />
            <UpcomingCalendar events={upcoming} />
          </div>
        </section>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <LatestStream stories={latest} />
          <div className="flex flex-col gap-8">
            <TrustNote />
          </div>
        </div>

        {fxGold && <CategorySection category={fxGold} stories={fxStories} />}
        {policy && <CategorySection category={policy} stories={policyStories} />}
      </Container>
    </>
  )
}
