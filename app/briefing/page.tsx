import type { Metadata } from 'next'
import { BriefingView } from '@/components/briefing/briefing-view'
import { getTodayBriefing } from '@/lib/api'

export const metadata: Metadata = {
  title: 'سرخط امروز',
  description: 'مهم‌ترین رویدادهای اقتصادی امروز در چند دقیقه؛ هر خبر با منبع و اینکه چرا برای شما مهم است.',
  alternates: { canonical: '/briefing' },
}

export default async function TodayBriefingPage() {
  const briefing = await getTodayBriefing()
  return <BriefingView briefing={briefing} isToday />
}
