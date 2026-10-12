import { ASSETS } from '@/lib/data/assets'
import { BRIEFINGS, CALENDAR } from '@/lib/data/briefings'
import { CATEGORIES } from '@/lib/data/categories'
import { SOURCES } from '@/lib/data/sources'
import { STORIES } from '@/lib/data/stories'
import { TERMS } from '@/lib/data/terms'
import { normalizeFa } from '@/lib/format'
import type { Asset, Briefing, CalendarEvent, Category, Source, Story, Term } from '@/lib/types'

/**
 * Data access layer. Every function mirrors one endpoint of the public WordPress REST API in
 * Master Plan V2 §18 (`/wp-json/sarkhat/v1/*`). To go live, replace each body with a
 * `fetch(`${process.env.SARKHAT_API_URL}/...`, { next: { revalidate } })` call and map the
 * snake_case JSON fields to the types in `lib/types.ts`. Page code does not need to change.
 */

const bySlug = <T extends { slug: string }>(list: T[], slug: string) => list.find((x) => x.slug === slug)
const newestFirst = (a: Story, b: Story) => b.publishedAt.localeCompare(a.publishedAt)

/** Homepage ranking overrides from §14.2: max two events per category in the top five, and no
 *  story without a tier 1–2 source in the lead slots. */
export function rankForHomepage(stories: Story[], limit = 5): Story[] {
  const sorted = [...stories].sort((a, b) => b.importance - a.importance)
  const picked: Story[] = []
  const perCategory = new Map<string, number>()
  for (const s of sorted) {
    if (picked.length >= limit) break
    const n = perCategory.get(s.categorySlug) ?? 0
    if (n >= 2) continue
    if (!hasTrustedSource(s)) continue
    picked.push(s)
    perCategory.set(s.categorySlug, n + 1)
  }
  return picked
}

export function hasTrustedSource(story: Story): boolean {
  return story.sources.some((item) => {
    const src = getSourceSync(item.sourceSlug)
    return src ? src.tier <= 2 : false
  })
}

/** GET /stories?category=&asset=&topic=&cursor= */
export async function getStories(filter: {
  category?: string
  asset?: string
  topic?: string
  entity?: string
  source?: string
  limit?: number
} = {}): Promise<Story[]> {
  let list = [...STORIES]
  if (filter.category) {
    const slugs = categoryWithChildren(filter.category)
    list = list.filter((s) => slugs.includes(s.categorySlug))
  }
  if (filter.asset) list = list.filter((s) => s.affectedAssets.some((a) => a.assetSlug === filter.asset))
  if (filter.topic) list = list.filter((s) => s.topicSlugs.includes(filter.topic!))
  if (filter.entity) list = list.filter((s) => s.entitySlugs.includes(filter.entity!))
  if (filter.source) list = list.filter((s) => s.sources.some((x) => x.sourceSlug === filter.source))
  list.sort(newestFirst)
  return filter.limit ? list.slice(0, filter.limit) : list
}

/** GET /story/{slug} */
export async function getStory(slug: string): Promise<Story | undefined> {
  return bySlug(STORIES, slug)
}

export async function getStoriesBySlugs(slugs: string[]): Promise<Story[]> {
  return slugs.map((s) => bySlug(STORIES, s)).filter((s): s is Story => Boolean(s))
}

export async function getAllStorySlugs(): Promise<string[]> {
  return STORIES.map((s) => s.slug)
}

/** GET /briefing/today */
export async function getTodayBriefing(): Promise<Briefing> {
  return [...BRIEFINGS].sort((a, b) => b.date.localeCompare(a.date))[0]
}

export async function getBriefing(date: string): Promise<Briefing | undefined> {
  return BRIEFINGS.find((b) => b.date === date)
}

export async function getBriefingDates(): Promise<string[]> {
  return BRIEFINGS.map((b) => b.date).sort((a, b) => b.localeCompare(a))
}

/** GET /assets */
export async function getAssets(): Promise<Asset[]> {
  return ASSETS
}

/** GET /asset/{slug}/prices */
export async function getAsset(slug: string): Promise<Asset | undefined> {
  return bySlug(ASSETS, slug)
}

export function getAssetSync(slug: string): Asset | undefined {
  return bySlug(ASSETS, slug)
}

/** GET /calendar */
export async function getCalendar(): Promise<CalendarEvent[]> {
  return [...CALENDAR].sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt))
}

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  return bySlug(CATEGORIES, slug)
}

export function getCategorySync(slug: string): Category | undefined {
  return bySlug(CATEGORIES, slug)
}

export function categoryWithChildren(slug: string): string[] {
  return [slug, ...CATEGORIES.filter((c) => c.parentSlug === slug).map((c) => c.slug)]
}

export async function getTerm(type: Term['type'], slug: string): Promise<Term | undefined> {
  return TERMS.find((t) => t.type === type && t.slug === slug)
}

export function getTermSync(type: Term['type'], slug: string): Term | undefined {
  return TERMS.find((t) => t.type === type && t.slug === slug)
}

export async function getTerms(type?: Term['type']): Promise<Term[]> {
  return type ? TERMS.filter((t) => t.type === type) : TERMS
}

export async function getSource(slug: string): Promise<Source | undefined> {
  return bySlug(SOURCES, slug)
}

export function getSourceSync(slug: string): Source | undefined {
  return bySlug(SOURCES, slug)
}

export async function getSources(): Promise<Source[]> {
  return SOURCES
}

/* ---------------------------------- Search --------------------------------- */

export type SearchSort = 'relevance' | 'newest'

export interface SearchParams {
  q: string
  category?: string
  sort?: SearchSort
}

export interface SearchResult {
  stories: Story[]
  assets: Asset[]
  terms: Term[]
  /** normalised tokens, used for highlighting */
  tokens: string[]
}

/** Persian-aware search over headline, dek, summary, categories, assets (incl. aliases), topics, entities. */
export async function search({ q, category, sort = 'relevance' }: SearchParams): Promise<SearchResult> {
  const tokens = normalizeFa(q).split(' ').filter((t) => t.length > 1)
  if (tokens.length === 0) return { stories: [], assets: [], terms: [], tokens }

  const matchesAll = (haystack: string) => tokens.every((t) => haystack.includes(t))

  const assets = ASSETS.filter((a) => matchesAll(normalizeFa([a.name, a.symbol ?? '', ...a.aliases].join(' '))))
  const terms = TERMS.filter((t) => matchesAll(normalizeFa([t.name, t.latinName ?? ''].join(' '))))

  const scored = STORIES.map((s) => {
    const cat = getCategorySync(s.categorySlug)
    const assetText = s.affectedAssets
      .map((a) => getAssetSync(a.assetSlug))
      .flatMap((a) => (a ? [a.name, a.symbol ?? '', ...a.aliases] : []))
    const termText = [...s.topicSlugs.map((t) => getTermSync('topic', t)?.name), ...s.entitySlugs.map((e) => getTermSync('entity', e)?.name)]
    const title = normalizeFa(s.title)
    const body = normalizeFa(
      [s.dek, ...s.summary.map((x) => x.text), s.whyItMatters, cat?.name ?? '', ...assetText, ...termText].join(' '),
    )
    if (!tokens.every((t) => title.includes(t) || body.includes(t))) return null
    const score = tokens.reduce((acc, t) => acc + (title.includes(t) ? 3 : 0) + (body.includes(t) ? 1 : 0), 0) + s.importance
    return { s, score }
  }).filter((x): x is { s: Story; score: number } => x !== null)

  let stories = scored
    .sort((a, b) => (sort === 'newest' ? b.s.publishedAt.localeCompare(a.s.publishedAt) : b.score - a.score))
    .map((x) => x.s)

  if (category) {
    const allowed = categoryWithChildren(category)
    stories = stories.filter((s) => allowed.includes(s.categorySlug))
  }

  return { stories, assets, terms, tokens }
}
