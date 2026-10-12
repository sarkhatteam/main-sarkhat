import type { Briefing, CalendarEvent } from '@/lib/types'

/** Daily briefings (§25: generated at 08:00, approved by the editor). Demonstration content. */
export const BRIEFINGS: Briefing[] = [
  {
    date: '2026-10-12',
    publishedAt: '2026-10-12T08:00:00+03:30',
    intro:
      'امروز سیاست پولی در مرکز توجه است: سقف سود سپرده تغییر کرد و آمار رسمی تورم شهریور منتشر شد. در کنار آن، قواعد عرضهٔ ارز صادراتی، تصمیم اوپک‌پلاس و حراج سکه را دنبال کنید.',
    storySlugs: [
      'deposit-rate-cap-23-percent',
      'inflation-report-shahrivar',
      'exchange-center-export-fx-rules',
      'opec-plus-holds-output',
      'gold-coin-auction-announced',
    ],
  },
  {
    date: '2026-10-11',
    publishedAt: '2026-10-11T08:00:00+03:30',
    intro:
      'مصوبهٔ تازهٔ سازمان بورس دربارهٔ دامنهٔ نوسان، زمان ارائهٔ لایحهٔ بودجهٔ ۱۴۰۶ و افشای گزارش‌های شش‌ماههٔ پتروشیمی‌ها رویدادهای اصلی روز بودند. شب گذشته صورت‌جلسهٔ فدرال رزرو نیز منتشر شد.',
    storySlugs: [
      'seo-price-limit-change',
      'fed-minutes-rate-path',
      'budget-1406-submission-date',
      'petrochemical-half-year-reports',
    ],
  },
]

/**
 * Economic calendar (§19, post-MVP week 5). Only scheduled releases from official sources.
 * Actual/forecast values are intentionally absent: they require a licensed data feed and the
 * product never publishes forecasts of its own.
 */
export const CALENDAR: CalendarEvent[] = [
  { id: 'c1', title: 'انتشار گزارش تورم مهرماه', country: 'IR', categorySlug: 'economic-indicators', importance: 'high', scheduledAt: '2026-11-11T10:00:00+03:30', dateOnly: true, sourceSlug: 'sci', status: 'tentative', note: 'زمان‌بندی بر اساس الگوی انتشار ماه‌های قبل؛ هنوز رسماً اعلام نشده است.' },
  { id: 'c2', title: 'جلسهٔ شورای پول و اعتبار', country: 'IR', categorySlug: 'monetary-policy', importance: 'high', scheduledAt: '2026-11-03T10:00:00+03:30', sourceSlug: 'cbi', status: 'confirmed', relatedStorySlug: 'deposit-rate-cap-23-percent' },
  { id: 'c3', title: 'نوبت اول حراج سکه در مرکز مبادله', country: 'IR', categorySlug: 'gold-coin', importance: 'medium', scheduledAt: '2026-10-19T10:00:00+03:30', sourceSlug: 'cbi', status: 'confirmed', relatedStorySlug: 'gold-coin-auction-announced' },
  { id: 'c4', title: 'آغاز اجرای دامنهٔ نوسان جدید بورس', country: 'IR', categorySlug: 'stock-market', importance: 'medium', scheduledAt: '2026-10-17T09:00:00+03:30', sourceSlug: 'seo', status: 'confirmed', relatedStorySlug: 'seo-price-limit-change' },
  { id: 'c5', title: 'شاخص قیمت مصرف‌کنندهٔ آمریکا (CPI)', country: 'US', categorySlug: 'global-markets', importance: 'high', scheduledAt: '2026-10-14T16:00:00+03:30', sourceSlug: 'bls', status: 'confirmed' },
  { id: 'c6', title: 'نشست کمیتهٔ بازار باز فدرال رزرو', country: 'US', categorySlug: 'global-markets', importance: 'high', scheduledAt: '2026-10-28T22:30:00+03:30', sourceSlug: 'fed', status: 'confirmed', relatedStorySlug: 'fed-minutes-rate-path' },
  { id: 'c7', title: 'نشست وزیران اوپک‌پلاس', country: 'GLOBAL', categorySlug: 'oil-energy', importance: 'medium', scheduledAt: '2026-12-01T12:00:00+03:30', dateOnly: true, sourceSlug: 'opec', status: 'confirmed', relatedStorySlug: 'opec-plus-holds-output' },
  { id: 'c8', title: 'گزارش اشتغال ماهانهٔ آمریکا', country: 'US', categorySlug: 'global-markets', importance: 'medium', scheduledAt: '2026-11-06T17:00:00+03:30', sourceSlug: 'bls', status: 'confirmed' },
  { id: 'c9', title: 'گزارش هفتگی بازار بین‌بانکی', country: 'IR', categorySlug: 'monetary-policy', importance: 'low', scheduledAt: '2026-10-15T14:00:00+03:30', dateOnly: true, sourceSlug: 'cbi', status: 'tentative' },
]

export const COUNTRY_LABEL: Record<CalendarEvent['country'], string> = {
  IR: 'ایران',
  US: 'آمریکا',
  EU: 'اروپا',
  GLOBAL: 'بین‌المللی',
}

export const IMPORTANCE_LABEL: Record<CalendarEvent['importance'], string> = {
  high: 'مهم',
  medium: 'متوسط',
  low: 'کم',
}
