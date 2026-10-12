/**
 * Content model mirrored from Master Plan V2 §14 (data architecture) and §17 (WordPress CPT/taxonomy fields).
 * Field names are camelCase versions of the WordPress `sarkhat-core` fields so the REST mapping is 1:1:
 *   summary_json → summary, why_json → whyItMatters, claims_json → claim types on summary,
 *   sources_json → sources, timeline_json → timeline, affected_assets → affectedAssets.
 */

export type SourceTier = 1 | 2 | 3 | 4

export type SourceKind =
  | 'official'
  | 'central-bank'
  | 'market-operator'
  | 'corporate-disclosure'
  | 'media-financial'
  | 'media-general'
  | 'media-international'
  | 'data-api'

export interface Source {
  slug: string
  name: string
  latinName?: string
  kind: SourceKind
  tier: SourceTier
  lang: 'fa' | 'en'
  domain?: string
  description: string
}

/** claim_type values from §15.1 */
export type ClaimType = 'fact' | 'reported' | 'market_data' | 'official_data' | 'analysis' | 'uncertain'

export interface SummarySentence {
  text: string
  claimType: ClaimType
  sourceSlugs: string[]
}

export interface StorySourceItem {
  sourceSlug: string
  title: string
  publishedAt: string
  primary?: boolean
}

export interface TimelineItem {
  at: string
  label: string
  kind: 'past' | 'today' | 'upcoming' | 'conflict'
  storySlug?: string
}

export interface ConflictNarrative {
  claim: string
  sourceSlug: string
  at: string
}

export interface Correction {
  at: string
  before: string
  after: string
  reason: string
}

export type AssetRelation = 'affected' | 'mentioned'

export type ReviewState = 'reviewed' | 'sampled' | 'auto'

export type FinancialRelevance = 'direct' | 'indirect'

export interface Story {
  slug: string
  title: string
  /** One-sentence executive summary (dek). */
  dek: string
  categorySlug: string
  publishedAt: string
  updatedAt: string
  /** 0..1, from the ranking score in §14.2 */
  importance: number
  summary: SummarySentence[]
  whyItMatters: string
  whatChanged?: string
  watchNext: string[]
  affectedAssets: { assetSlug: string; relation: AssetRelation }[]
  topicSlugs: string[]
  entitySlugs: string[]
  sources: StorySourceItem[]
  timeline: TimelineItem[]
  relatedSlugs: string[]
  reviewState: ReviewState
  financialRelevance: FinancialRelevance
  financialImpactNote?: string
  conflict?: { title: string; narratives: ConflictNarrative[] }
  correction?: Correction
}

export interface Category {
  slug: string
  name: string
  description: string
  parentSlug?: string
  /** group = navigation section aggregating child categories */
  isGroup?: boolean
  icon: BrandIconName
  inNav?: boolean
}

export type AssetClass = 'currency' | 'gold' | 'crypto' | 'equity-index' | 'energy' | 'real-estate' | 'macro'

/** freshness_type values from §28 */
export type FreshnessType = 'realtime' | 'near_realtime' | 'delayed' | 'eod' | 'indicative' | 'official'

export interface PricePoint {
  date: string
  value: number
}

export interface AssetQuote {
  value: number
  unit: string
  changePercent?: number
  freshness: FreshnessType
  delayMinutes?: number
  provider: string
  fetchedAt: string
  decimals?: number
  history?: PricePoint[]
  /** Demonstration values only — never presented as live market data. */
  demo: true
}

export interface Asset {
  slug: string
  name: string
  symbol?: string
  assetClass: AssetClass
  unitLabel: string
  aliases: string[]
  description: string
  dataNote: string
  /** MVP data phase (§28). null quote = licensed data not connected yet. */
  dataPhase: 'mvp' | 'post-mvp'
  quote: AssetQuote | null
  categorySlug: string
  faq?: { q: string; a: string }[]
}

export type TermType = 'topic' | 'entity'

export interface Term {
  slug: string
  name: string
  latinName?: string
  type: TermType
  entityKind?: 'institution' | 'organization' | 'country' | 'company'
  description: string
}

export interface Briefing {
  date: string
  publishedAt: string
  intro: string
  storySlugs: string[]
}

export type CalendarImportance = 'high' | 'medium' | 'low'

export interface CalendarEvent {
  id: string
  title: string
  country: 'IR' | 'US' | 'EU' | 'GLOBAL'
  categorySlug: string
  importance: CalendarImportance
  scheduledAt: string
  /** true if only a date is announced, without a time */
  dateOnly?: boolean
  sourceSlug: string
  status: 'confirmed' | 'tentative'
  relatedStorySlug?: string
  note?: string
}

export type BrandIconName =
  | 'news'
  | 'market'
  | 'currency'
  | 'gold'
  | 'crypto'
  | 'stocks'
  | 'housing'
  | 'oil'
  | 'index'
  | 'calendar'
  | 'search'
  | 'watchlist'
  | 'alert'
  | 'source'
  | 'ai'
  | 'timeline'
  | 'share'
  | 'save'
  | 'follow'
