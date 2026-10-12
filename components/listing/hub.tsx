import Link from 'next/link'
import { Icon } from '@/components/brand/icon'
import { Container, Num, SectionHeader } from '@/components/sk/primitives'
import { StoryCard, StoryRow } from '@/components/story/story-card'
import { formatNumber } from '@/lib/format'
import type { BrandIconName, Story } from '@/lib/types'

export function Breadcrumb({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="مسیر" className="mb-6 text-meta text-ink-3">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-ink hover:underline">
            صفحهٔ اول
          </Link>
        </li>
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {it.href ? (
              <Link href={it.href} className="hover:text-ink hover:underline">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function HubHeader({
  kicker,
  title,
  latin,
  description,
  icon,
  children,
}: {
  kicker: string
  title: string
  latin?: string
  description: string
  icon?: BrandIconName
  children?: React.ReactNode
}) {
  return (
    <header className="mb-10 border-b-2 border-ink pb-6">
      <p className="mb-2 flex items-center gap-2 text-meta font-bold text-ink-3">
        {icon && <Icon name={icon} className="size-4" />}
        {kicker}
      </p>
      <h1 className="mb-3 text-display font-bold text-ink text-balance">
        {title}
        {latin && (
          <span lang="en" dir="ltr" className="ms-3 font-latin text-h3 font-medium text-ink-3">
            {latin}
          </span>
        )}
      </h1>
      <p className="max-w-reading text-body-l text-ink-2">{description}</p>
      {children && <div className="mt-5">{children}</div>}
    </header>
  )
}

export function StoryFeed({ stories, title = 'رویدادها', empty = 'هنوز رویدادی در این بخش منتشر نشده است.' }: { stories: Story[]; title?: string; empty?: string }) {
  if (stories.length === 0) {
    return (
      <section aria-labelledby="feed">
        <SectionHeader id="feed" title={title} />
        <p className="border border-dashed border-line-strong p-6 text-small text-ink-3">{empty}</p>
      </section>
    )
  }
  const [first, second, ...rest] = stories
  return (
    <section aria-labelledby="feed">
      <SectionHeader id="feed" title={title} meta={<><Num>{formatNumber(stories.length)}</Num> رویداد</>} />
      <div className="mb-4 grid gap-x-6 gap-y-6 md:grid-cols-2">
        {[first, second].filter(Boolean).map((s) => (
          <StoryCard key={s.slug} story={s} />
        ))}
      </div>
      <div>
        {rest.map((s) => (
          <StoryRow key={s.slug} story={s} />
        ))}
      </div>
    </section>
  )
}

export function HubLayout({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <Container className="py-8">
      {aside ? (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">{children}</div>
          <aside className="flex flex-col gap-8" aria-label="اطلاعات تکمیلی">
            {aside}
          </aside>
        </div>
      ) : (
        children
      )}
    </Container>
  )
}
