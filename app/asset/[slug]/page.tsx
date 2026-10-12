import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb, HubLayout, StoryFeed } from '@/components/listing/hub'
import { Change, FreshnessMeta, Sparkline } from '@/components/market/quote'
import { Badge, Dot, Latin, Num, SectionHeader } from '@/components/sk/primitives'
import { getAsset, getAssets, getCategorySync, getStories } from '@/lib/api'
import { formatDateShort, formatNumber } from '@/lib/format'
import { DEMO_MODE } from '@/lib/site'

export async function generateStaticParams() {
  return (await getAssets()).map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const a = await getAsset(slug)
  if (!a) return {}
  return { title: `${a.name}؛ اخبار و رویدادهای اثرگذار`, description: a.description, alternates: { canonical: `/asset/${a.slug}` } }
}

export default async function AssetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const asset = await getAsset(slug)
  if (!asset) notFound()
  const stories = await getStories({ asset: slug })
  const q = asset.quote
  const history = q?.history ?? []
  const category = getCategorySync(asset.categorySlug)

  return (
    <HubLayout
      aside={
        <>
          <section aria-labelledby="data-note" className="border border-line bg-surface p-5">
            <h2 id="data-note" className="mb-2 text-h4 font-bold text-ink">
              دربارهٔ داده
            </h2>
            <p className="text-small text-ink-2">{asset.dataNote}</p>
          </section>
          {asset.aliases.length > 0 && (
            <section aria-labelledby="aliases">
              <SectionHeader id="aliases" title="نام‌های دیگر" size="sm" rule="rule" />
              <p className="text-small text-ink-2">{asset.aliases.join('، ')}</p>
            </section>
          )}
        </>
      }
    >
      <Breadcrumb items={[...(category ? [{ href: `/category/${category.slug}`, label: category.name }] : []), { label: asset.name }]} />

      <header className="mb-10 border-b-2 border-ink pb-6">
        <p className="mb-2 flex items-center gap-2 text-meta font-bold text-ink-3">
          دارایی
          {asset.symbol && <Latin className="font-medium">{asset.symbol}</Latin>}
        </p>
        <h1 className="mb-3 text-display font-bold text-ink">{asset.name}</h1>
        <p className="mb-6 max-w-reading text-body-l text-ink-2">{asset.description}</p>

        {q ? (
          <div className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:items-end">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {DEMO_MODE && <Badge tone="warning">مقدار نمایشی</Badge>}
                <FreshnessMeta quote={q} long />
              </div>
              <p className="flex items-baseline gap-3">
                <Num className="text-display font-bold text-ink">{formatNumber(q.value, q.decimals ?? 0)}</Num>
                <span className="text-small text-ink-3">{q.unit}</span>
              </p>
              <Change value={q.changePercent} className="text-body" />
            </div>
            {history.length > 1 && (
              <figure className="flex flex-col gap-1">
                <Sparkline
                  points={history.map((p) => p.value)}
                  label={`روند ${asset.name} از ${formatDateShort(history[0].date)} تا ${formatDateShort(history[history.length - 1].date)}`}
                />
                <figcaption className="flex justify-between text-meta text-ink-3">
                  <Num>{formatDateShort(history[0].date)}</Num>
                  <Num>{formatDateShort(history[history.length - 1].date)}</Num>
                </figcaption>
              </figure>
            )}
          </div>
        ) : (
          <p className="flex items-center gap-2 border border-dashed border-line-strong p-4 text-small text-ink-2">
            <Dot kind="neutral" />
            دادهٔ این دارایی پس از اتصال به ارائه‌دهندهٔ دارای مجوز نمایش داده می‌شود. سرخط هیچ عددی را بدون منبع و زمان دریافت منتشر نمی‌کند.
          </p>
        )}
      </header>

      <StoryFeed stories={stories} title={`رویدادهای اثرگذار بر ${asset.name}`} />

      {asset.faq && asset.faq.length > 0 && (
        <section aria-labelledby="faq" className="mt-12">
          <SectionHeader id="faq" title="پرسش‌های رایج" />
          <div className="flex flex-col">
            {asset.faq.map((f) => (
              <details key={f.q} className="group border-b border-line py-4">
                <summary className="cursor-pointer list-none text-body font-semibold text-ink marker:hidden">
                  <span className="me-2 inline-block text-ink-3 transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                  {f.q}
                </summary>
                <p className="mt-2 max-w-reading text-small text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </HubLayout>
  )
}
