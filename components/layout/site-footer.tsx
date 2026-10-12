import Link from 'next/link'
import { Logo } from '@/components/brand/logo'
import { Container } from '@/components/sk/primitives'
import { CATEGORIES } from '@/lib/data/categories'
import { DEMO_MODE, LEGAL_LINKS, SITE, TRUST_LINKS } from '@/lib/site'

export function DemoBanner() {
  if (!DEMO_MODE) return null
  return (
    <div role="note" className="border-b border-warning/30 bg-warning-subtle">
      <p className="mx-auto max-w-content px-4 py-2 text-meta text-ink-2 md:px-6">
        <span className="font-bold text-ink">نسخهٔ نمایشی · </span>
        رویدادها، اعداد و عنوان منابع در این نسخه برای نمایش طراحی ساخته شده‌اند و گزارش واقعی نیستند.
      </p>
    </div>
  )
}

export function SiteFooter() {
  const footerCats = CATEGORIES.filter((c) => !c.isGroup)
  return (
    <footer className="mt-20 border-t-2 border-ink bg-surface">
      <Container className="py-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo className="h-8" />
            <p className="max-w-sm text-small text-ink-2">{SITE.description}</p>
            <p className="max-w-sm text-meta text-ink-3">
              سرخط تحلیل‌گر، کارگزار یا مشاور سرمایه‌گذاری نیست. هیچ محتوایی در این سایت توصیهٔ خرید، فروش یا نگهداری دارایی نیست.
            </p>
          </div>
          <FooterCol title="دسته‌ها" links={footerCats.slice(0, 6).map((c) => ({ href: `/category/${c.slug}`, label: c.name }))} />
          <FooterCol
            title="سرخط"
            links={[{ href: '/today', label: 'سرخط امروز' }, { href: '/archive', label: 'آرشیو روزانه' }, { href: '/calendar', label: 'تقویم اقتصادی' }, ...TRUST_LINKS]}
          />
          <FooterCol title="قانونی" links={[...LEGAL_LINKS]} />
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-4 text-meta text-ink-3 md:flex-row md:justify-between">
          <span>© ۱۴۰۵ سرخط · همهٔ زمان‌ها به وقت تهران</span>
          <span>ساعت انتشار سرخط امروز: {SITE.briefingTime}</span>
        </div>
      </Container>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="mb-3 text-small font-bold text-ink">{title}</h2>
      <ul className="flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-small text-ink-2 hover:text-ink hover:underline hover:underline-offset-4">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
