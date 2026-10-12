export const SITE = {
  name: 'سرخط',
  latinName: 'Sarkhat',
  tagline: 'هوش و خبر مالی',
  description:
    'سرخط رویدادهای مالی و اقتصادی ایران و جهان را از چند منبع گردآوری می‌کند و با خلاصه، زمینه، منابع و دارایی‌های مرتبط نشان می‌دهد.',
  url: 'https://sarkhat.news',
  editorInChief: 'امیر',
  briefingTime: '۰۸:۰۰',
} as const

/**
 * Prototype flag. While true, every page shows a demonstration notice, market values carry a
 * «نمایشی» label, and robots.txt blocks indexing. Flip only once the WordPress REST API and
 * licensed data providers are wired in `lib/api.ts`.
 */
export const DEMO_MODE = true

/** Reference "now" for the demonstration dataset (Tehran, Monday 20 Mehr 1405). */
export const DEMO_NOW = '2026-10-12T15:30:00+03:30'

export const PRIMARY_NAV = [
  { href: '/today', label: 'سرخط امروز' },
  { href: '/category/fx-gold', label: 'ارز و طلا' },
  { href: '/category/stock-market', label: 'بورس' },
  { href: '/category/crypto', label: 'رمزارز' },
  { href: '/category/housing', label: 'مسکن' },
  { href: '/category/policy', label: 'اقتصاد و سیاست‌گذاری' },
  { href: '/category/global-markets', label: 'بازارهای جهانی' },
] as const

export const TRUST_LINKS = [
  { href: '/about', label: 'دربارهٔ سرخط' },
  { href: '/editorial-policy', label: 'سیاست تحریریه' },
  { href: '/ai-policy', label: 'سیاست هوش مصنوعی' },
  { href: '/corrections', label: 'تصحیح‌ها' },
] as const

export const LEGAL_LINKS = [
  { href: '/disclaimer', label: 'سلب مسئولیت مالی' },
  { href: '/privacy', label: 'حریم خصوصی' },
  { href: '/terms', label: 'شرایط استفاده' },
  { href: '/contact', label: 'تماس' },
] as const
