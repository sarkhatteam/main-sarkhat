import type { Category } from '@/lib/types'

/** 12 MVP financial categories (§25) plus two navigation groups (§12 taxonomy: دسته › زیردسته). */
export const CATEGORIES: Category[] = [
  { slug: 'fx-gold', name: 'ارز و طلا', isGroup: true, inNav: true, icon: 'currency', description: 'رویدادهای مؤثر بر نرخ ارز، طلا و سکه؛ از تصمیم‌های بانک مرکزی و نرخ‌های رسمی تا عرضه و تقاضا در بازار آزاد.' },
  { slug: 'currency', name: 'ارز', parentSlug: 'fx-gold', icon: 'currency', description: 'نرخ‌های رسمی و آزاد ارز، سیاست ارزی، مرکز مبادله و عوامل مؤثر بر ارزش ریال. اعداد بازار آزاد شاخص‌گونه‌اند و منبع و زمانشان همیشه کنارشان آمده است.' },
  { slug: 'gold-coin', name: 'طلا و سکه', parentSlug: 'fx-gold', icon: 'gold', description: 'طلای ۱۸ عیار، سکهٔ امامی، حراج‌ها و معاملات بورس کالا و ارتباط آن با انس جهانی و نرخ ارز. سرخط قیمت پیش‌بینی نمی‌کند و توصیهٔ خرید و فروش نمی‌دهد.' },
  { slug: 'stock-market', name: 'بورس', inNav: true, icon: 'stocks', description: 'شاخص کل و هم‌وزن بورس تهران، مصوبات سازمان بورس، عرضه‌های اولیه و رفتار نقدینگی در بازار سهام. داده‌های شاخص با تأخیر اعلام‌شده نمایش داده می‌شوند.' },
  { slug: 'corporate', name: 'شرکت‌ها و افشا', parentSlug: 'stock-market', icon: 'stocks', description: 'اطلاعیه‌های کدال، صورت‌های مالی، افزایش سرمایه و مجامع شرکت‌های بورسی. منبع اصلی این دسته افشای رسمی ناشر است.' },
  { slug: 'crypto', name: 'رمزارز', inNav: true, icon: 'crypto', description: 'بیت‌کوین، اتریوم و بازار رمزارزها، مقررات داخلی و جهانی و اثر داده‌های اقتصاد کلان بر این بازار. قیمت‌ها نزدیک به لحظه و با نام ارائه‌دهنده نمایش داده می‌شوند.' },
  { slug: 'housing', name: 'مسکن', inNav: true, icon: 'housing', description: 'قیمت و معاملات مسکن، اجاره‌بها، تسهیلات خرید و سیاست‌های عرضه. شاخص‌های رسمی مسکن از مرکز آمار و بانک مرکزی با تأخیر انتشار منتشر می‌شوند.' },
  { slug: 'policy', name: 'اقتصاد و سیاست‌گذاری', isGroup: true, inNav: true, icon: 'index', description: 'سیاست پولی و مالی، بودجه، مقررات مالی و شاخص‌های رسمی اقتصاد کلان؛ تصمیم‌هایی که زمینهٔ همهٔ بازارها را می‌سازند.' },
  { slug: 'monetary-policy', name: 'سیاست پولی', parentSlug: 'policy', icon: 'index', description: 'نرخ سود بانکی، نقدینگی، عملیات بازار باز و مصوبات شورای پول و اعتبار. این تصمیم‌ها مستقیماً بر بازده سپرده، بورس و تقاضای دارایی‌های جایگزین اثر دارند.' },
  { slug: 'fiscal-policy', name: 'سیاست مالی و بودجه', parentSlug: 'policy', icon: 'index', description: 'بودجهٔ سالانه، درآمدهای مالیاتی و نفتی، کسری بودجه و انتشار اوراق دولتی. سرخط فقط مسیر اثر مالی تصمیم‌ها را گزارش می‌کند.' },
  { slug: 'economic-indicators', name: 'شاخص‌های اقتصادی', parentSlug: 'policy', icon: 'index', description: 'تورم، رشد اقتصادی، اشتغال و دیگر آمارهای رسمی. هر عدد با نام نهاد منتشرکننده و دورهٔ مرجع آن نمایش داده می‌شود.' },
  { slug: 'financial-regulation', name: 'مقررات مالی', parentSlug: 'policy', icon: 'alert', description: 'بخشنامه‌ها و مقررات بانکی، ارزی، بورسی و رمزارزی که رفتار فعالان بازار را تغییر می‌دهد.' },
  { slug: 'global-markets', name: 'بازارهای جهانی', inNav: true, icon: 'market', description: 'فدرال رزرو، دلار جهانی، انس طلا و داده‌های اقتصاد آمریکا و اروپا؛ عواملی که از بیرون بر بازارهای ایران اثر می‌گذارند.' },
  { slug: 'oil-energy', name: 'نفت و انرژی', icon: 'oil', description: 'قیمت نفت برنت، تصمیم‌های اوپک‌پلاس و صادرات انرژی؛ متغیری کلیدی برای درآمد ارزی و بودجهٔ کشور.' },
]
