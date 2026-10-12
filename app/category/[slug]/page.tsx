import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb, HubHeader, HubLayout, StoryFeed } from '@/components/listing/hub'
import { MarketCell } from '@/components/market/quote'
import { SectionHeader, Tag } from '@/components/sk/primitives'
import { getAssets, getCategories, getCategory, getStories } from '@/lib/api'

export async function generateStaticParams() {
  return (await getCategories()).map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const c = await getCategory(slug)
  if (!c) return {}
  return { title: `اخبار ${c.name}`, description: c.description, alternates: { canonical: `/category/${c.slug}` } }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategory(slug)
  if (!category) notFound()

  const [stories, categories, assets] = await Promise.all([getStories({ category: slug }), getCategories(), getAssets()])
  const children = categories.filter((c) => c.parentSlug === slug)
  const parent = category.parentSlug ? categories.find((c) => c.slug === category.parentSlug) : undefined
  const childSlugs = new Set([slug, ...children.map((c) => c.slug)])
  const relatedAssets = assets.filter((a) => childSlugs.has(a.categorySlug) && a.quote).slice(0, 4)

  return (
    <HubLayout
      aside={
        relatedAssets.length > 0 ? (
          <section aria-labelledby="cat-assets">
            <SectionHeader id="cat-assets" title="دارایی‌های این بخش" size="sm" />
            <div className="grid grid-cols-2 border-s border-t border-line [&>*]:min-w-0 [&>*]:border-e [&>*]:border-b [&>*]:border-line">
              {relatedAssets.map((a) => (
                <MarketCell key={a.slug} asset={a} />
              ))}
            </div>
          </section>
        ) : undefined
      }
    >
      <Breadcrumb items={[...(parent ? [{ href: `/category/${parent.slug}`, label: parent.name }] : []), { label: category.name }]} />
      <HubHeader kicker="دسته" title={category.name} description={category.description} icon={category.icon}>
        {children.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="زیربخش‌ها">
            {children.map((c) => (
              <li key={c.slug}>
                <Tag href={`/category/${c.slug}`}>{c.name}</Tag>
              </li>
            ))}
          </ul>
        )}
      </HubHeader>
      <StoryFeed stories={stories} title={`تازه‌ترین رویدادهای ${category.name}`} />
    </HubLayout>
  )
}
