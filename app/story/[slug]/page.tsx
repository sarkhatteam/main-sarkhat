import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container, SectionHeader, Tag } from '@/components/sk/primitives'
import {
  AffectedAssetsPanel,
  ConflictBlock,
  CorrectionNote,
  DateStamp,
  SourcesSection,
  SummaryBlock,
  TimelineSection,
  WatchNext,
  WhyItMatters,
} from '@/components/story/detail'
import { AiDisclosure, CategoryLink } from '@/components/story/meta'
import { ShareBar } from '@/components/story/share-bar'
import { StoryRow } from '@/components/story/story-card'
import { getAllStorySlugs, getStoriesBySlugs, getStory, getTermSync, getCategorySync } from '@/lib/api'
import { SITE } from '@/lib/site'

export async function generateStaticParams() {
  return (await getAllStorySlugs()).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const story = await getStory(slug)
  if (!story) return {}
  return {
    title: story.title,
    description: story.dek,
    alternates: { canonical: `/story/${story.slug}` },
    openGraph: { type: 'article', title: story.title, description: story.dek, publishedTime: story.publishedAt, modifiedTime: story.updatedAt },
  }
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = await getStory(slug)
  if (!story) notFound()

  const related = await getStoriesBySlugs(story.relatedSlugs)
  const category = getCategorySync(story.categorySlug)
  const terms = [
    ...story.topicSlugs.map((s) => ({ t: getTermSync('topic', s), href: `/topic/${s}` })),
    ...story.entitySlugs.map((s) => ({ t: getTermSync('entity', s), href: `/entity/${s}` })),
  ].filter((x) => x.t)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: story.title,
    description: story.dek,
    datePublished: story.publishedAt,
    dateModified: story.updatedAt,
    inLanguage: 'fa-IR',
    articleSection: category?.name,
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/story/${story.slug}`,
  }

  return (
    <Container className="py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <nav aria-label="مسیر" className="mb-6 text-meta text-ink-3">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-ink hover:underline">
              صفحهٔ اول
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <CategoryLink slug={story.categorySlug} />
          </li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="min-w-0">
          <header className="mb-8 border-b-2 border-ink pb-6">
            <h1 className="mb-4 max-w-reading text-display font-bold text-ink text-balance">{story.title}</h1>
            <p className="mb-5 max-w-reading text-body-l text-ink-2">{story.dek}</p>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <DateStamp story={story} />
              <div className="flex flex-wrap items-center gap-3">
                <AiDisclosure review={story.reviewState} />
                <ShareBar title={story.title} path={`/story/${story.slug}`} />
              </div>
            </div>
          </header>

          <div className="flex max-w-reading flex-col gap-10">
            {story.correction && <CorrectionNote correction={story.correction} />}
            <SummaryBlock story={story} />
            <WhyItMatters story={story} />
            {story.conflict && <ConflictBlock conflict={story.conflict} />}
            <div className="lg:hidden">
              <AffectedAssetsPanel story={story} />
            </div>
            {story.watchNext.length > 0 && <WatchNext items={story.watchNext} />}
            <SourcesSection story={story} />
            {story.timeline.length > 0 && <TimelineSection items={story.timeline} />}
            {terms.length > 0 && (
              <section aria-labelledby="terms">
                <SectionHeader id="terms" title="موضوع‌ها و نهادها" size="sm" rule="rule" />
                <ul className="flex flex-wrap gap-2">
                  {terms.map(({ t, href }) => (
                    <li key={href}>
                      <Tag href={href}>{t!.name}</Tag>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <p className="border-t border-line pt-4 text-meta text-ink-3">
              این صفحه گزارش رویداد است و توصیهٔ خرید، فروش یا نگهداری هیچ دارایی‌ای نیست.{' '}
              <Link href="/disclaimer" className="underline underline-offset-4">
                سلب مسئولیت مالی
              </Link>
            </p>
          </div>
        </article>

        <aside className="flex flex-col gap-10" aria-label="اطلاعات تکمیلی">
          <div className="hidden lg:block">
            <AffectedAssetsPanel story={story} />
          </div>
          {related.length > 0 && (
            <section aria-labelledby="related">
              <SectionHeader id="related" title="رویدادهای مرتبط" size="sm" />
              <div>
                {related.map((s) => (
                  <StoryRow key={s.slug} story={s} />
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </Container>
  )
}
