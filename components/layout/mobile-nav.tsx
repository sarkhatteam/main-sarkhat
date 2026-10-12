'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { buttonClass } from '@/components/sk/primitives'
import { PRIMARY_NAV, TRUST_LINKS } from '@/lib/site'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState<string | null>(null)
  const pathname = usePathname()
  const id = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)

  if (pathname !== lastPath) {
    setLastPath(pathname)
    if (open) setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={buttonClass('ghost', 'sm', 'px-2')}
      >
        <span className="sr-only">{open ? 'بستن منو' : 'باز کردن منو'}</span>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="square" aria-hidden="true">
          {open ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="10" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </button>
      <div
        id={id}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[var(--sk-header-h,57px)] z-40 overflow-y-auto bg-paper"
      >
        <nav aria-label="منوی اصلی" className="px-4 py-4">
          <ul className="flex flex-col">
            {[{ href: '/', label: 'صفحهٔ اول' }, ...PRIMARY_NAV, { href: '/calendar', label: 'تقویم اقتصادی' }, { href: '/search', label: 'جست‌وجو' }].map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex h-13 items-center border-b border-line text-h4 font-bold text-ink',
                      active && 'border-b-2 border-ink',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
            {TRUST_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-small text-ink-2 underline underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
