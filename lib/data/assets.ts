import type { Asset, PricePoint } from '@/lib/types'

const DAYS = [
  '2026-09-22', '2026-09-23', '2026-09-24', '2026-09-27', '2026-09-28', '2026-09-29', '2026-09-30',
  '2026-10-01', '2026-10-04', '2026-10-05', '2026-10-06', '2026-10-07', '2026-10-08', '2026-10-11', '2026-10-12',
]
const series = (values: number[]): PricePoint[] => values.map((value, i) => ({ date: DAYS[i], value }))

/**
 * The 10 MVP asset pages (§25, marked * in the taxonomy).
 * Phase rules from §28: only official rates (manual), crypto (public API) and official inflation are
 * available in MVP. All other quotes stay `null` until a licensed provider is contracted (phase 8+).
 * Every number below is DEMONSTRATION DATA for layout purposes, flagged `demo: true`.
 */
export const ASSETS: Asset[] = [
  {
    slug: 'usd',
    name: 'دلار آمریکا',
    symbol: 'USD',
    assetClass: 'currency',
    unitLabel: 'تومان',
    aliases: ['دلار', 'usd', 'dollar', 'نرخ دلار', 'دلار آمریکا'],
    categorySlug: 'currency',
    dataPhase: 'mvp',
    description:
      'دلار آمریکا مهم‌ترین ارز مرجع در اقتصاد ایران است. در ایران چند نرخ برای دلار وجود دارد: نرخ رسمی مرکز مبادلهٔ ارز و طلا که بانک مرکزی اعلام می‌کند و نرخ بازار آزاد که از عرضه و تقاضای غیررسمی شکل می‌گیرد. سرخط این دو نرخ را جدا و با برچسب منبع نمایش می‌دهد.',
    dataNote:
      'در نسخهٔ MVP فقط نرخ رسمی مرکز مبادله (ثبت دستی یا نیمه‌خودکار) نمایش داده می‌شود. نرخ بازار آزاد پس از قرارداد با ارائه‌دهندهٔ دارای مجوز اضافه می‌شود.',
    quote: {
      value: 70250,
      unit: 'تومان',
      changePercent: 0.12,
      freshness: 'official',
      provider: 'مرکز مبادلهٔ ارز و طلا',
      fetchedAt: '2026-10-12T11:00:00+03:30',
      history: series([69880, 69900, 69950, 69950, 70010, 70020, 70040, 70060, 70080, 70100, 70120, 70150, 70180, 70165, 70250]),
      demo: true,
    },
    faq: [
      { q: 'چرا چند نرخ برای دلار وجود دارد؟', a: 'نرخ رسمی را بانک مرکزی در مرکز مبادله برای واردات و معاملات مشخص اعلام می‌کند؛ نرخ بازار آزاد از معاملات غیررسمی به دست می‌آید. سرخط هر نرخ را با منبع و نوع تازگی جدا نشان می‌دهد.' },
      { q: 'آیا سرخط قیمت دلار را پیش‌بینی می‌کند؟', a: 'خیر. سرخط فقط رویدادهای مؤثر و داده‌های منتشرشده را با منبع نشان می‌دهد و هیچ پیش‌بینی قیمت یا توصیهٔ خرید و فروش ارائه نمی‌کند.' },
    ],
  },
  {
    slug: 'eur',
    name: 'یورو',
    symbol: 'EUR',
    assetClass: 'currency',
    unitLabel: 'تومان',
    aliases: ['یورو', 'eur', 'euro'],
    categorySlug: 'currency',
    dataPhase: 'mvp',
    description:
      'یورو دومین ارز پرکاربرد در تجارت خارجی ایران است. نرخ یورو در مرکز مبادله هم‌زمان با نرخ دلار اعلام می‌شود و نرخ برابری یورو به دلار در بازارهای جهانی نیز بر آن اثر دارد.',
    dataNote: 'نرخ رسمی مرکز مبادله در MVP؛ نرخ جهانی یورو/دلار از ECB با برچسب پایان روز در فاز ۸.',
    quote: {
      value: 81460,
      unit: 'تومان',
      changePercent: -0.08,
      freshness: 'official',
      provider: 'مرکز مبادلهٔ ارز و طلا',
      fetchedAt: '2026-10-12T11:00:00+03:30',
      history: series([81200, 81260, 81300, 81280, 81350, 81390, 81420, 81400, 81450, 81480, 81500, 81520, 81510, 81525, 81460]),
      demo: true,
    },
  },
  {
    slug: 'gold-18',
    name: 'طلای ۱۸ عیار',
    assetClass: 'gold',
    unitLabel: 'تومان / گرم',
    aliases: ['طلا', 'طلای ۱۸', 'طلای 18', 'gold', 'قیمت طلا'],
    categorySlug: 'gold-coin',
    dataPhase: 'post-mvp',
    description:
      'طلای ۱۸ عیار رایج‌ترین عیار طلا در بازار داخلی است و قیمت آن از دو متغیر اصلی اثر می‌گیرد: قیمت جهانی انس طلا و نرخ ارز در بازار آزاد. به همین دلیل رویدادهای سیاست پولی داخلی و تصمیم‌های فدرال رزرو هر دو در صفحهٔ این دارایی دیده می‌شوند.',
    dataNote: 'قیمت طلا پس از قرارداد با ارائه‌دهندهٔ داخلی دارای مجوز (فاز ۸) با برچسب «تأخیری» یا «شاخص‌گونه» نمایش داده می‌شود. اسکرپینگ سایت‌های قیمت ممنوع است.',
    quote: null,
  },
  {
    slug: 'emami-coin',
    name: 'سکهٔ امامی',
    assetClass: 'gold',
    unitLabel: 'تومان',
    aliases: ['سکه', 'سکه امامی', 'سکهٔ امامی', 'coin'],
    categorySlug: 'gold-coin',
    dataPhase: 'post-mvp',
    description:
      'سکهٔ امامی (طرح جدید) پرمعامله‌ترین سکهٔ طلای ایران است. قیمت آن علاوه بر ارزش ذاتی طلا، حباب ناشی از عرضه و تقاضا را هم در خود دارد. سکه در بورس کالا نیز معامله می‌شود و قیمت پایانی آن منبع رسمی‌تری برای مقایسه است.',
    dataNote: 'قیمت پایانی بورس کالا (پایان روز) و قیمت شاخص‌گونهٔ بازار در فاز ۸.',
    quote: null,
  },
  {
    slug: 'bitcoin',
    name: 'بیت‌کوین',
    symbol: 'BTC',
    assetClass: 'crypto',
    unitLabel: 'دلار',
    aliases: ['بیت کوین', 'بیتکوین', 'btc', 'bitcoin', 'رمزارز'],
    categorySlug: 'crypto',
    dataPhase: 'mvp',
    description:
      'بیت‌کوین بزرگ‌ترین رمزارز از نظر ارزش بازار است. قیمت آن به داده‌های اقتصاد کلان آمریکا، تصمیم‌های فدرال رزرو، جریان صندوق‌های قابل معامله و مقررات کشورها حساس است. معاملات رمزارز در ایران تابع مقررات بانک مرکزی است.',
    dataNote: 'قیمت دلاری از API عمومی کوین‌گکو با برچسب «نزدیک به لحظه». قیمت تومانی از API صرافی داخلی در فاز ۸.',
    quote: {
      value: 62840,
      unit: 'دلار',
      changePercent: -2.1,
      freshness: 'near_realtime',
      provider: 'CoinGecko',
      fetchedAt: '2026-10-12T15:28:00+03:30',
      history: series([64900, 65200, 64700, 65800, 66100, 65600, 65900, 66400, 65900, 65200, 64800, 64300, 64100, 64180, 62840]),
      demo: true,
    },
  },
  {
    slug: 'ethereum',
    name: 'اتریوم',
    symbol: 'ETH',
    assetClass: 'crypto',
    unitLabel: 'دلار',
    aliases: ['اتریوم', 'eth', 'ethereum', 'اتر'],
    categorySlug: 'crypto',
    dataPhase: 'mvp',
    description:
      'اتریوم دومین رمزارز بزرگ و بستر اصلی قراردادهای هوشمند و امور مالی غیرمتمرکز است. حرکت قیمت آن معمولاً با بیت‌کوین همبستگی بالایی دارد اما به رویدادهای خاص شبکهٔ اتریوم نیز واکنش نشان می‌دهد.',
    dataNote: 'قیمت دلاری از API عمومی کوین‌گکو با برچسب «نزدیک به لحظه».',
    quote: {
      value: 2418.6,
      unit: 'دلار',
      changePercent: -2.7,
      freshness: 'near_realtime',
      provider: 'CoinGecko',
      fetchedAt: '2026-10-12T15:28:00+03:30',
      decimals: 1,
      history: series([2540, 2556, 2531, 2580, 2602, 2575, 2590, 2611, 2588, 2552, 2530, 2505, 2491, 2486, 2418.6]),
      demo: true,
    },
  },
  {
    slug: 'tedpix',
    name: 'شاخص کل بورس تهران',
    assetClass: 'equity-index',
    unitLabel: 'واحد',
    aliases: ['شاخص کل', 'شاخص', 'بورس', 'tedpix', 'شاخص بورس'],
    categorySlug: 'stock-market',
    dataPhase: 'post-mvp',
    description:
      'شاخص کل بورس تهران (TEDPIX) میانگین وزنی ارزش بازار شرکت‌های پذیرفته‌شده در بورس است و مهم‌ترین معیار عملکرد کلی بازار سهام ایران به شمار می‌رود. نرخ سود بانکی، نرخ ارز و مصوبات سازمان بورس از عوامل اصلی مؤثر بر آن‌اند.',
    dataNote: 'دادهٔ شاخص از TSETMC یا منبع رسمی با تأخیر اعلام‌شده در فاز ۸.',
    quote: null,
  },
  {
    slug: 'brent',
    name: 'نفت برنت',
    assetClass: 'energy',
    unitLabel: 'دلار / بشکه',
    aliases: ['نفت', 'برنت', 'brent', 'نفت برنت', 'oil'],
    categorySlug: 'oil-energy',
    dataPhase: 'post-mvp',
    description:
      'نفت برنت شاخص مرجع قیمت نفت خام در بازارهای جهانی است. برای اقتصاد ایران، قیمت نفت از مسیر درآمد ارزی و بودجهٔ دولت بر نرخ ارز و انتظارات تورمی اثر می‌گذارد.',
    dataNote: 'قیمت پایانی از EIA یا منبع مجاز با برچسب «پایان روز» در فاز ۸.',
    quote: null,
  },
  {
    slug: 'housing-price',
    name: 'قیمت مسکن تهران',
    assetClass: 'real-estate',
    unitLabel: 'تومان / متر مربع',
    aliases: ['مسکن', 'قیمت مسکن', 'خانه', 'آپارتمان', 'housing'],
    categorySlug: 'housing',
    dataPhase: 'post-mvp',
    description:
      'میانگین قیمت هر متر مربع واحد مسکونی در تهران شاخص اصلی بازار مسکن است. این داده از گزارش‌های رسمی بانک مرکزی و مرکز آمار به‌دست می‌آید که با تأخیر منتشر می‌شوند؛ تاریخ دورهٔ مرجع همیشه کنار عدد می‌آید.',
    dataNote: 'شاخص‌های رسمی مسکن از مرکز آمار و بانک مرکزی در فاز ۱۱.',
    quote: null,
  },
  {
    slug: 'inflation',
    name: 'تورم ایران',
    assetClass: 'macro',
    unitLabel: 'درصد',
    aliases: ['تورم', 'نرخ تورم', 'inflation', 'cpi', 'شاخص قیمت مصرف کننده'],
    categorySlug: 'economic-indicators',
    dataPhase: 'mvp',
    description:
      'نرخ تورم تغییر سطح عمومی قیمت کالاها و خدمات مصرفی خانوار را نشان می‌دهد. مرکز آمار ایران تورم ماهانه، نقطه‌به‌نقطه و سالانه را منتشر می‌کند. تورم مبنای تصمیم‌های نرخ سود، دستمزد و ارزش واقعی پس‌انداز است.',
    dataNote: 'دادهٔ رسمی مرکز آمار، ثبت دستی با تأیید دوم (§16). عدد نمایش‌داده‌شده تورم نقطه‌به‌نقطهٔ آخرین دورهٔ منتشرشده است.',
    quote: {
      value: 38.4,
      unit: 'درصد · نقطه‌به‌نقطه',
      freshness: 'official',
      provider: 'مرکز آمار ایران',
      fetchedAt: '2026-10-12T10:15:00+03:30',
      decimals: 1,
      demo: true,
    },
  },
]
