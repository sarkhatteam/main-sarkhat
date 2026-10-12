import Link from 'next/link'
import { Container, buttonClass } from '@/components/sk/primitives'

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start gap-4 py-24">
      <p className="text-meta font-bold text-ink-3">خطای ۴۰۴</p>
      <h1 className="text-display font-bold text-ink">این صفحه پیدا نشد</h1>
      <p className="max-w-reading text-body-l text-ink-2">ممکن است نشانی اشتباه باشد یا این خبر جابه‌جا شده باشد.</p>
      <div className="flex gap-3">
        <Link href="/" className={buttonClass('primary', 'md')}>
          صفحهٔ اول
        </Link>
        <Link href="/search" className={buttonClass('secondary', 'md')}>
          جست‌وجو
        </Link>
      </div>
    </Container>
  )
}
