import type { Metadata } from 'next'
import { Breadcrumb, HubHeader, HubLayout } from '@/components/listing/hub'
import { MarketCell } from '@/components/market/quote'
import { SectionHeader } from '@/components/sk/primitives'
import { getAssets } from '@/lib/api'
import type { AssetClass } from '@/lib/types'

export const metadata: Metadata = {
  title: 'بازارها',
  description: 'نمای کلی دارایی‌هایی که سرخط پوشش می‌دهد؛ هر عدد با منبع، نوع تازگی و زمان دریافت.',
  alternates: { canonical: '/markets' },
}

const CLASS_LABEL: Record<AssetClass, string> = {
  currency: 'ارز',
  gold: 'طلا و سکه',
  crypto: 'رمزارز',
  'equity-index': 'شاخص‌های سهام',
  energy: 'انرژی',
  'real-estate': 'مسکن',
  macro: 'شاخص‌های کلان',
}

export default async function MarketsPage() {
  const assets = await getAssets()
  const groups = (Object.keys(CLASS_LABEL) as AssetClass[])
    .map((k) => ({ key: k, label: CLASS_LABEL[k], items: assets.filter((a) => a.assetClass === k) }))
    .filter((g) => g.items.length > 0)

  return (
    <HubLayout>
      <Breadcrumb items={[{ label: 'بازارها' }]} />
      <HubHeader
        kicker="دارایی‌ها"
        title="بازارها"
        icon="market"
        description="سرخط سایت قیمت نیست؛ این اعداد زمینهٔ رویدادها را نشان می‌دهند. کنار هر عدد منبع، نوع تازگی و زمان دریافت آمده است."
      />
      <div className="flex flex-col gap-10">
        {groups.map((g) => (
          <section key={g.key} aria-labelledby={`g-${g.key}`}>
            <SectionHeader id={`g-${g.key}`} title={g.label} />
            <div className="grid grid-cols-2 border-s border-t border-line md:grid-cols-4 [&>*]:min-w-0 [&>*]:border-b [&>*]:border-e [&>*]:border-line">
              {g.items.map((a) => (
                <MarketCell key={a.slug} asset={a} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </HubLayout>
  )
}
