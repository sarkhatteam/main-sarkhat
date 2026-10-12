import type { Source } from '@/lib/types'

/**
 * Source registry with credibility tiers from Master Plan V2 §13.
 * Tier 1: official bodies & primary disclosures · Tier 2: established outlets ·
 * Tier 3: specialised/secondary outlets · Tier 4: unverified (never shown alone on the homepage).
 */
export const SOURCES: Source[] = [
  { slug: 'cbi', name: 'بانک مرکزی', kind: 'central-bank', tier: 1, lang: 'fa', domain: 'cbi.ir', description: 'بانک مرکزی جمهوری اسلامی ایران؛ منبع رسمی سیاست پولی، نرخ‌های رسمی و آمار نقدینگی.' },
  { slug: 'sci', name: 'مرکز آمار ایران', kind: 'official', tier: 1, lang: 'fa', domain: 'amar.org.ir', description: 'مرجع رسمی شاخص قیمت مصرف‌کننده، تورم و آمارهای اقتصادی کلان.' },
  { slug: 'seo', name: 'سازمان بورس و اوراق بهادار', kind: 'market-operator', tier: 1, lang: 'fa', domain: 'seo.ir', description: 'نهاد ناظر بازار سرمایهٔ ایران؛ منبع رسمی مصوبات و مقررات بازار سرمایه.' },
  { slug: 'codal', name: 'کدال', kind: 'corporate-disclosure', tier: 1, lang: 'fa', domain: 'codal.ir', description: 'سامانهٔ جامع اطلاع‌رسانی ناشران؛ افشای رسمی صورت‌های مالی و اطلاعیه‌های شرکت‌ها.' },
  { slug: 'mefa', name: 'وزارت امور اقتصادی و دارایی', kind: 'official', tier: 1, lang: 'fa', domain: 'mefa.ir', description: 'منبع رسمی سیاست‌های مالی، بودجه و تصمیم‌های اقتصادی دولت.' },
  { slug: 'shana', name: 'شانا', kind: 'official', tier: 1, lang: 'fa', domain: 'shana.ir', description: 'پایگاه اطلاع‌رسانی وزارت نفت.' },
  { slug: 'fed', name: 'فدرال رزرو', latinName: 'Federal Reserve', kind: 'central-bank', tier: 1, lang: 'en', domain: 'federalreserve.gov', description: 'بانک مرکزی ایالات متحده؛ منبع رسمی تصمیم‌های نرخ بهره و بیانیه‌های FOMC.' },
  { slug: 'opec', name: 'اوپک', latinName: 'OPEC', kind: 'official', tier: 1, lang: 'en', domain: 'opec.org', description: 'سازمان کشورهای صادرکنندهٔ نفت؛ منبع رسمی تصمیم‌های تولید اوپک و اوپک‌پلاس.' },
  { slug: 'bls', name: 'ادارهٔ آمار کار آمریکا', latinName: 'BLS', kind: 'official', tier: 1, lang: 'en', domain: 'bls.gov', description: 'منبع رسمی دادهٔ اشتغال و شاخص قیمت مصرف‌کنندهٔ آمریکا.' },
  { slug: 'donya-e-eqtesad', name: 'دنیای اقتصاد', kind: 'media-financial', tier: 2, lang: 'fa', domain: 'donya-e-eqtesad.com', description: 'روزنامهٔ تخصصی اقتصادی با پوشش گستردهٔ بازارها و سیاست‌گذاری.' },
  { slug: 'ecoiran', name: 'اکوایران', kind: 'media-financial', tier: 2, lang: 'fa', domain: 'ecoiran.com', description: 'رسانهٔ تحلیلی اقتصاد ایران و بازارهای مالی.' },
  { slug: 'irna', name: 'ایرنا', kind: 'media-general', tier: 2, lang: 'fa', domain: 'irna.ir', description: 'خبرگزاری جمهوری اسلامی ایران.' },
  { slug: 'isna', name: 'ایسنا', kind: 'media-general', tier: 2, lang: 'fa', domain: 'isna.ir', description: 'خبرگزاری دانشجویان ایران.' },
  { slug: 'sena', name: 'سنا', kind: 'media-financial', tier: 2, lang: 'fa', domain: 'sena.ir', description: 'پایگاه خبری بازار سرمایهٔ ایران.' },
  { slug: 'reuters', name: 'رویترز', latinName: 'Reuters', kind: 'media-international', tier: 2, lang: 'en', domain: 'reuters.com', description: 'خبرگزاری بین‌المللی با پوشش بازارهای جهانی و انرژی.' },
  { slug: 'coindesk', name: 'کوین‌دسک', latinName: 'CoinDesk', kind: 'media-international', tier: 2, lang: 'en', domain: 'coindesk.com', description: 'رسانهٔ تخصصی بازار رمزارزها.' },
  { slug: 'tejaratnews', name: 'تجارت‌نیوز', kind: 'media-financial', tier: 3, lang: 'fa', domain: 'tejaratnews.com', description: 'رسانهٔ اقتصادی با پوشش بازارهای ارز، طلا و مسکن.' },
  { slug: 'eghtesadonline', name: 'اقتصادآنلاین', kind: 'media-financial', tier: 3, lang: 'fa', domain: 'eghtesadonline.com', description: 'پایگاه خبری اقتصادی.' },
  { slug: 'coingecko', name: 'کوین‌گکو', latinName: 'CoinGecko', kind: 'data-api', tier: 2, lang: 'en', domain: 'coingecko.com', description: 'ارائه‌دهندهٔ دادهٔ بازار رمزارزها از طریق API عمومی.' },
]

export const SOURCE_KIND_LABEL: Record<Source['kind'], string> = {
  official: 'نهاد رسمی',
  'central-bank': 'بانک مرکزی',
  'market-operator': 'نهاد ناظر بازار',
  'corporate-disclosure': 'افشای رسمی ناشر',
  'media-financial': 'رسانهٔ اقتصادی',
  'media-general': 'خبرگزاری',
  'media-international': 'رسانهٔ بین‌المللی',
  'data-api': 'ارائه‌دهندهٔ داده',
}

export const TIER_LABEL: Record<Source['tier'], string> = {
  1: 'سطح ۱ · رسمی',
  2: 'سطح ۲ · معتبر',
  3: 'سطح ۳ · تخصصی',
  4: 'سطح ۴ · تأییدنشده',
}
