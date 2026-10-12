import Link from 'next/link'
import { Icon } from '@/components/brand/icon'
import { Logo } from '@/components/brand/logo'
import { MobileNav } from '@/components/layout/mobile-nav'
import { PrimaryNav } from '@/components/layout/primary-nav'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { buttonClass, Num } from '@/components/sk/primitives'
import { formatDateWithWeekday } from '@/lib/format'
import { DEMO_NOW, SITE } from '@/lib/site'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="mx-auto flex h-14 max-w-content items-center gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label={`${SITE.name} — صفحهٔ اول`}>
          <Logo className="h-7" />
        </Link>
        <span className="hidden border-s border-line ps-3 text-meta text-ink-3 xl:inline">
          <Num>{formatDateWithWeekday(DEMO_NOW)}</Num>
        </span>
        <div className="ms-auto flex items-center gap-1 lg:ms-6 lg:flex-1">
          <PrimaryNav />
          <div className="ms-auto flex items-center gap-1">
            <Link href="/calendar" className={buttonClass('ghost', 'sm', 'hidden px-2 md:inline-flex')} aria-label="تقویم اقتصادی">
              <Icon name="calendar" />
            </Link>
            <Link href="/search" className={buttonClass('ghost', 'sm', 'px-2')} aria-label="جست‌وجو">
              <Icon name="search" />
            </Link>
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
