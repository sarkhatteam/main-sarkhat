'use client'

import { useSyncExternalStore } from 'react'
import { buttonClass } from '@/components/sk/primitives'

type Theme = 'light' | 'dark'
const KEY = 'sk-theme'

function read(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb)
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => obs.disconnect()
}

/** Inline script run before paint so the stored or system theme applies without a flash. */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('${KEY}');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, read, () => 'light' as Theme)
  const next: Theme = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.dataset.theme = next
        try {
          localStorage.setItem(KEY, next)
        } catch {}
      }}
      className={buttonClass('ghost', 'sm', 'px-2')}
      aria-label={next === 'dark' ? 'حالت تیره' : 'حالت روشن'}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <circle cx="12" cy="12" r="7" />
        <path d="M12 5a7 7 0 0 1 0 14Z" fill="currentColor" stroke="none" />
      </svg>
    </button>
  )
}
