import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BriefingView } from '@/components/briefing/briefing-view'
import { getBriefing, getBriefingDates, getTodayBriefing } from '@/lib/api'
import { formatDateShort } from '@/lib/format'

export async function generateStaticParams() {
  return (await getBriefingDates()).map((date) => ({ date }))
}

export async function generateMetadata({ params }: { params: Promise<{ date: string }> }): Promise<Metadata> {
  const { date } = await params
  const b = await getBriefing(date)
  if (!b) return {}
  return { title: `سرخط ${formatDateShort(b.publishedAt)}`, description: b.intro, alternates: { canonical: `/briefing/${date}` } }
}

export default async function DatedBriefingPage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params
  const [briefing, today] = await Promise.all([getBriefing(date), getTodayBriefing()])
  if (!briefing) notFound()
  return <BriefingView briefing={briefing} isToday={briefing.date === today.date} />
}
