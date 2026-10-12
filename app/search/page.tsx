import type { Metadata } from 'next'
import Link from 'next/link'
import { HubLayout } from '@/components/listing/hub'
import { Icon } from '@/components/brand/icon'
import { Num, SectionHeader, buttonClass } from '@/components/sk/primitives'
import { StoryRow } from '@/components/story/story-card'
import { getCategories, search, type SearchSort } from '@/lib/api'
import { formatNumber, normalizeFa } from '@/lib/format'

export const metadata: Metadata = {
  title: 'جست‌وجو',
  robots: { index: false, follow: true },
}

function makeHighlighter(tokens: string[]) {
  if (tokens.length === 0) return undefined
  return (text: string) => {
    const norm = normalizeFa(text)
    if (norm.length !== text.length) return text
    const marks: [number, number][] = []
    for (const t of tokens) {
      let i = norm.indexOf(t)
      while (i !== -1) {
        marks.push([i, i + t.length])
        i = norm.indexOf(t, i + t.length)
      }
    }
    if (marks.length === 0) return text
    marks.sort((a, b) => a[0] - b[0])
    const out: React.ReactNode[] = []
    let cursor = 0
    for (const [s, e] of marks) {
      if (s < cursor) continue
      if (s > cursor) out.push(text.slice(cursor, s))
      out.push(
        <mark key={s} className="bg-brand-subtle text-ink">
          {text.slice(s, e)}
        </mark>,
      )
      cursor = e
    }
    out.push(text.slice(cursor))
    return out
  }
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string; sort?: string }> }) {
  const sp = await searchParams
  const q = (sp.q ?? '').trim().slice(0, 120)
  const sort: SearchSort = sp.sort === 'newest' ? 'newest' : 'relevance'
  const category = sp.category || undefined
  const [result, categories] = await Promise.all([q ? search({ q, category, sort }) : null, getCategories()])
  const highlight = result ? makeHighlighter(result.tokens) : undefined
  const total = result ? result.stories.length + result.assets.length + result.terms.length : 0

  return (
    <HubLayout>
      <h1 className="mb-6 text-h1 font-bold text-ink">جست‌وجو</h1>
      <form action="/search" method="get" role="search" className="mb-8 flex flex-col gap-3 border-b-2 border-ink pb-6">
        <label htmlFor="q" className="sr-only">
          عبارت جست‌وجو
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Icon name="search" className="pointer-events-none absolute start-3 top-1/2 size-5 -translate-y-1/2 text-ink-3" />
            <input
              id="q"
              name="q"
              type="search"
              defaultValue={q}
              placeholder="خبر، دارایی، نهاد یا موضوع؛ مثلاً دلار یا بانک مرکزی"
              className="h-12 w-full rounded-sm border border-line-strong bg-surface ps-11 pe-3 text-body text-ink placeholder:text-ink-3 focus-visible:border-ink focus-visible:outline-none"
              autoComplete="off"
              enterKeyHint="search"
            />
          </div>
          <button type="submit" className={buttonClass('primary', 'lg')}>
            جست‌وجو
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-small">
          <label className="flex items-center gap-2 text-ink-2">
            دسته
            <select name="category" defaultValue={category ?? ''} className="h-9 rounded-sm border border-line bg-surface px-2 text-ink">
              <option value="">همه</option>
              {categories
                .filter((c) => !c.isGroup)
                .map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-ink-2">
            ترتیب
            <select name="sort" defaultValue={sort} className="h-9 rounded-sm border border-line bg-surface px-2 text-ink">
              <option value="relevance">مرتبط‌ترین</option>
              <option value="newest">تازه‌ترین</option>
            </select>
          </label>
        </div>
      </form>

      {!result ? (
        <p className="text-body text-ink-2">عبارتی بنویسید تا در خبرها، دارایی‌ها، نهادها و موضوع‌ها جست‌وجو کنیم.</p>
      ) : total === 0 ? (
        <div className="flex flex-col gap-3 border border-dashed border-line-strong p-6">
          <p className="text-body font-semibold text-ink">
            {'نتیجه‌ای برای «'}
            {q}
            {'» پیدا نشد.'}
          </p>
          <p className="text-small text-ink-2">املای دیگری امتحان کنید، فیلتر دسته را بردارید، یا از نام رایج‌تر استفاده کنید؛ مثلاً «دلار» به‌جای «USD».</p>
          <Link href="/" className={buttonClass('secondary', 'md', 'self-start')}>
            بازگشت به صفحهٔ اول
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          <p className="text-small text-ink-3" aria-live="polite">
            <Num>{formatNumber(total)}</Num> نتیجه برای «{q}»
          </p>
          {(result.assets.length > 0 || result.terms.length > 0) && (
            <section aria-labelledby="r-hubs">
              <SectionHeader id="r-hubs" title="دارایی‌ها و موضوع‌ها" size="sm" />
              <ul className="flex flex-wrap gap-2">
                {result.assets.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/asset/${a.slug}`} className={buttonClass('secondary', 'sm')}>
                      {a.name}
                    </Link>
                  </li>
                ))}
                {result.terms.map((t) => (
                  <li key={`${t.type}-${t.slug}`}>
                    <Link href={`/${t.type}/${t.slug}`} className={buttonClass('ghost', 'sm')}>
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {result.stories.length > 0 && (
            <section aria-labelledby="r-stories">
              <SectionHeader id="r-stories" title="خبرها" size="sm" />
              <div className="flex flex-col">
                {result.stories.map((s) => (
                  <StoryRow key={s.slug} story={s} highlight={highlight} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </HubLayout>
  )
}
