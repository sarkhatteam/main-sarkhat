const TZ = 'Asia/Tehran'
const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹'

export function toFaDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)])
}

const numberFormatters = new Map<string, Intl.NumberFormat>()
function nf(minFrac: number, maxFrac: number) {
  const key = `${minFrac}-${maxFrac}`
  let f = numberFormatters.get(key)
  if (!f) {
    f = new Intl.NumberFormat('fa-IR', { minimumFractionDigits: minFrac, maximumFractionDigits: maxFrac })
    numberFormatters.set(key, f)
  }
  return f
}

/** Persian digits with Persian thousands (٬) and decimal (٫) separators. */
export function formatNumber(value: number, decimals = 0): string {
  return nf(decimals, decimals).format(value)
}

/** Compact Persian notation per Brand Book: ۶۲٫۴ میلیون / ۲٫۸۱ میلیون */
export function formatCompact(value: number): string {
  const abs = Math.abs(value)
  if (abs >= 1e9) return `${nf(0, 2).format(value / 1e9)} میلیارد`
  if (abs >= 1e6) return `${nf(0, 2).format(value / 1e6)} میلیون`
  if (abs >= 1e4) return `${nf(0, 1).format(value / 1e3)} هزار`
  return nf(0, 2).format(value)
}

/** Signed percent with explicit +/−. Sign is part of the meaning, never colour alone. */
export function formatPercent(value: number, decimals = 1): string {
  if (value === 0) return `${formatNumber(0, decimals)}٪`
  const sign = value > 0 ? '+' : '−'
  return `${sign}${formatNumber(Math.abs(value), decimals)}٪`
}

export function changeDirection(value: number | undefined): 'up' | 'down' | 'flat' {
  if (value === undefined || value === 0) return 'flat'
  return value > 0 ? 'up' : 'down'
}

function dtf(options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('fa-IR-u-ca-persian-nu-arabext', { timeZone: TZ, ...options })
}

const fDate = dtf({ day: 'numeric', month: 'long', year: 'numeric' })
const fDateShort = dtf({ day: 'numeric', month: 'long' })
const fWeekday = dtf({ weekday: 'long' })
const fTime = dtf({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })

/** ۲۰ مهر ۱۴۰۵ */
export function formatDate(iso: string): string {
  return fDate.format(new Date(iso))
}

/** ۲۰ مهر */
export function formatDateShort(iso: string): string {
  return fDateShort.format(new Date(iso))
}

/** دوشنبه ۲۰ مهر ۱۴۰۵ */
export function formatDateWithWeekday(iso: string): string {
  const d = new Date(iso)
  return `${fWeekday.format(d)} ${fDate.format(d)}`
}

/** ۱۴:۳۰ */
export function formatTime(iso: string): string {
  return fTime.format(new Date(iso))
}

/** ۲۰ مهر ۱۴۰۵ · ۱۴:۳۰ */
export function formatDateTime(iso: string): string {
  return `${formatDate(iso)} · ${formatTime(iso)}`
}

/** Calendar date key (YYYY-MM-DD) in Tehran time. */
export function tehranDateKey(iso: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(iso))
  const get = (t: string) => parts.find((p) => p.type === t)?.value
  return `${get('year')}-${get('month')}-${get('day')}`
}

/**
 * Normalises Persian/Arabic text for search: unifies ي/ك, strips diacritics and tatweel,
 * converts Persian/Arabic digits to Latin, collapses ZWNJ and whitespace.
 */
export function normalizeFa(input: string): string {
  return input
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[ۀة]/g, 'ه')
    .replace(/[أإآ]/g, 'ا')
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/\u200c/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}
