import type { Term } from '@/lib/types'

/** sarkhat_topic + sarkhat_entity taxonomies (§17). Pages with fewer than 3 events render noindex (§32). */
export const TERMS: Term[] = [
  { slug: 'interest-rate', name: 'نرخ بهره', type: 'topic', description: 'تصمیم‌ها و داده‌های مربوط به نرخ سود بانکی در ایران و نرخ بهرهٔ سیاستی بانک‌های مرکزی جهان.' },
  { slug: 'inflation', name: 'تورم', type: 'topic', description: 'آمار رسمی تورم، انتظارات تورمی و سیاست‌های مهار تورم.' },
  { slug: 'budget-1406', name: 'بودجهٔ ۱۴۰۶', type: 'topic', description: 'روند تدوین و تصویب لایحهٔ بودجهٔ سال ۱۴۰۶ و پیامدهای مالی آن.' },
  { slug: 'crypto-regulation', name: 'مقررات رمزارز', type: 'topic', description: 'قوانین و بخشنامه‌های داخلی و بین‌المللی دربارهٔ معاملات و صرافی‌های رمزارز.' },
  { slug: 'fx-policy', name: 'سیاست ارزی', type: 'topic', description: 'تصمیم‌های مربوط به نرخ‌های رسمی، مرکز مبادله و تأمین ارز واردات.' },
  { slug: 'oil-supply', name: 'عرضهٔ نفت', type: 'topic', description: 'سهمیه‌های تولید، صادرات و عوامل مؤثر بر عرضهٔ جهانی نفت.' },
  { slug: 'cbi', name: 'بانک مرکزی', type: 'entity', entityKind: 'institution', description: 'بانک مرکزی جمهوری اسلامی ایران، مسئول سیاست پولی و ارزی کشور.' },
  { slug: 'mpc', name: 'شورای پول و اعتبار', type: 'entity', entityKind: 'institution', description: 'بالاترین مرجع تصمیم‌گیری سیاست پولی و اعتباری در ایران.' },
  { slug: 'sci', name: 'مرکز آمار ایران', type: 'entity', entityKind: 'institution', description: 'مرجع رسمی تولید و انتشار آمارهای اقتصادی و اجتماعی کشور.' },
  { slug: 'seo', name: 'سازمان بورس', type: 'entity', entityKind: 'institution', description: 'نهاد ناظر بر بازار اوراق بهادار ایران.' },
  { slug: 'federal-reserve', name: 'فدرال رزرو', latinName: 'Federal Reserve', type: 'entity', entityKind: 'institution', description: 'بانک مرکزی ایالات متحده که تصمیم‌هایش بر دلار جهانی، طلا و رمزارزها اثر دارد.' },
  { slug: 'opec-plus', name: 'اوپک‌پلاس', latinName: 'OPEC+', type: 'entity', entityKind: 'organization', description: 'ائتلاف کشورهای عضو اوپک و تولیدکنندگان متحد آن برای هماهنگی تولید نفت.' },
  { slug: 'parliament', name: 'مجلس شورای اسلامی', type: 'entity', entityKind: 'institution', description: 'نهاد قانون‌گذاری ایران که لایحهٔ بودجه و قوانین مالی را تصویب می‌کند.' },
]
