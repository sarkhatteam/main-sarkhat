import { notFound } from 'next/navigation'
import { Breadcrumb, HubHeader, HubLayout, StoryFeed } from '@/components/listing/hub'
import { getStories, getTerm } from '@/lib/api'
import type { TermType } from '@/lib/types'

const ENTITY_KIND: Record<string, string> = {
  institution: 'نهاد',
  organization: 'سازمان',
  country: 'کشور',
  company: 'شرکت',
}

export async function TermPage({ type, slug }: { type: TermType; slug: string }) {
  const term = await getTerm(type, slug)
  if (!term) notFound()
  const stories = await getStories(type === 'topic' ? { topic: slug } : { entity: slug })
  const kicker = type === 'topic' ? 'موضوع' : (term.entityKind && ENTITY_KIND[term.entityKind]) || 'نهاد'

  return (
    <HubLayout>
      <Breadcrumb items={[{ label: term.name }]} />
      <HubHeader kicker={kicker} title={term.name} latin={term.latinName} description={term.description} />
      <StoryFeed stories={stories} title={`رویدادهای مرتبط با ${term.name}`} />
    </HubLayout>
  )
}
