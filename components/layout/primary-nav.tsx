'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PRIMARY_NAV } from '@/lib/site'
import { cn } from '@/lib/utils'

export function PrimaryNav() {
  const pathname = usePathname()
  return (
    <nav aria-label="دسته‌های اصلی" className="hidden lg:block">
      <ul className="flex items-stretch gap-1">
        {PRIMARY_NAV.map((item) => {
          const active = pathname.startsWith(item.href)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative flex h-11 items-center px-3 text-small font-semibold text-ink-2 transition-colors hover:text-ink',
                  active && 'text-ink after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-ink',
                )}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
