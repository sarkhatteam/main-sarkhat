'use client'

import { useState } from 'react'
import { Icon } from '@/components/brand/icon'
import { buttonClass } from '@/components/sk/primitives'

export function ShareBar({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false)

  async function share() {
    const url = new URL(path, window.location.origin).toString()
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // user cancelled or share unavailable in this context; fall back to copying
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={share} className={buttonClass('secondary', 'sm')}>
        <Icon name="share" className="size-4" />
        اشتراک‌گذاری
      </button>
      <span role="status" className="text-meta text-ink-3">
        {copied ? 'پیوند کپی شد' : ''}
      </span>
    </div>
  )
}
