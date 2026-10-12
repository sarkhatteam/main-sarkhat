import type { Metadata } from 'next'
import { TermPage } from '@/components/listing/term-page'
import { getTerm, getTerms } from '@/lib/api'

export async function generateStaticParams() {
  return (await getTerms('entity')).map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const t = await getTerm('entity', slug)
  if (!t) return {}
  return { title: t.name, description: t.description, alternates: { canonical: `/entity/${t.slug}` } }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <TermPage type="entity" slug={slug} />
}
