import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumb, HubHeader, HubLayout, StoryFeed } from '@/components/listing/hub'
import { Badge, Latin, Num } from '@/components/sk/primitives'
import { getSource, getSources, getStories } from '@/lib/api'
import { formatNumber } from '@/lib/format'

const TIER_LABEL: Record<number, string> = {
  1: 'منبع رسمی یا دست‌اول',
  2: 'رسانهٔ معتبر',
  3: 'رسانهٔ عمومی',
  4: 'منبع ثانویه؛ فقط همراه منبع دیگر',
}

export async function generateStaticParams() {
  return (await getSources()).map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = await getSource(slug)
  if (!s) return {}
  return { title: `منبع: ${s.name}`, description: s.description, alternates: { canonical: `/source/${s.slug}` } }
}

export default async function SourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const source = await getSource(slug)
  if (!source) notFound()
  const stories = await getStories({ source: slug })

  return (
    <HubLayout>
      <Breadcrumb items={[{ href: '/editorial-policy#sources', label: 'منابع' }, { label: source.name }]} />
      <HubHeader kicker="منبع" title={source.name} latin={source.latinName} description={source.description} icon="source">
        <div className="flex flex-wrap items-center gap-3 text-meta text-ink-3">
          <Badge tone={source.tier === 1 ? 'verified' : source.tier === 2 ? 'info' : 'neutral'}>
            ردهٔ <Num>{formatNumber(source.tier)}</Num> · {TIER_LABEL[source.tier]}
          </Badge>
          {source.domain && (
            <span>
              دامنه: <Latin>{source.domain}</Latin>
            </span>
          )}
          <span>زبان: {source.lang === 'fa' ? 'فارسی' : 'انگلیسی'}</span>
          <Link href="/editorial-policy#sources" className="underline underline-offset-4">
            ردهٔ منابع چطور تعیین می‌شود؟
          </Link>
        </div>
      </HubHeader>
      <StoryFeed stories={stories} title={`رویدادهایی که به ${source.name} استناد کرده‌اند`} />
    </HubLayout>
  )
}
