import { MarketCell } from '@/components/market/quote'
import { Badge } from '@/components/sk/primitives'
import { getAssets } from '@/lib/api'

const STRIP = ['usd', 'eur', 'bitcoin', 'ethereum', 'inflation', 'gold-18']

export async function MarketStrip() {
  const all = await getAssets()
  const assets = STRIP.map((s) => all.find((a) => a.slug === s)).filter((a) => a !== undefined)

  return (
    <section aria-labelledby="market-strip-title" className="border-y border-line bg-surface">
      <div className="mx-auto flex max-w-content items-stretch">
        <div className="hidden flex-none flex-col justify-center gap-1.5 border-e border-line px-4 py-3 lg:flex">
          <h2 id="market-strip-title" className="text-small font-bold text-ink">
            نمای بازار
          </h2>
          <Badge tone="warning">داده نمایشی</Badge>
        </div>
        <h2 className="sr-only lg:hidden">نمای بازار — داده نمایشی</h2>
        <ul className="flex flex-1 snap-x gap-px overflow-x-auto bg-line md:grid md:grid-cols-3 lg:grid-cols-6">
          {assets.map((a) => (
            <li key={a.slug} className="snap-start bg-surface">
              <MarketCell asset={a} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
