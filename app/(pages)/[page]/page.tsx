import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { StaticPage } from '@/components/listing/static-page'
import { STATIC_PAGES } from '@/lib/data/pages'

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(STATIC_PAGES).map((page) => ({ page }))
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params
  const data = STATIC_PAGES[page]
  if (!data) return {}
  return { title: data.title, description: data.description, alternates: { canonical: `/${page}` } }
}

export default async function TrustPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params
  const data = STATIC_PAGES[page]
  if (!data) notFound()
  return <StaticPage title={data.title} intro={data.intro} sections={data.sections} updatedAt={data.updatedAt} />
}
