import { Breadcrumb, HubLayout } from '@/components/listing/hub'
import { formatDate } from '@/lib/format'

export interface StaticSection {
  heading: string
  body: string[]
}

export function StaticPage({ title, intro, sections, updatedAt }: { title: string; intro: string; sections: StaticSection[]; updatedAt: string }) {
  return (
    <HubLayout>
      <Breadcrumb items={[{ label: title }]} />
      <article className="max-w-reading">
        <header className="mb-8 border-b-2 border-ink pb-6">
          <h1 className="mb-3 text-display font-bold text-ink text-balance">{title}</h1>
          <p className="text-body-l text-ink-2">{intro}</p>
          <p className="mt-4 text-meta text-ink-3">
            آخرین بازبینی: <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
          </p>
        </header>
        <div className="flex flex-col gap-8">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="mb-3 text-h3 font-bold text-ink">{s.heading}</h2>
              <div className="flex flex-col gap-3">
                {s.body.map((p) => (
                  <p key={p} className="text-body leading-loose text-ink-2">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </HubLayout>
  )
}
