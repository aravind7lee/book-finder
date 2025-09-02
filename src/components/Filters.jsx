// src/components/Filters.jsx
import { useEffect, useState } from 'react'

const LANGS = [
  { code: '', label: 'Any' },
  { code: 'eng', label: 'English' },
  { code: 'spa', label: 'Spanish' },
  { code: 'fre', label: 'French' },
  { code: 'deu', label: 'German' },
  { code: 'ita', label: 'Italian' },
  { code: 'hin', label: 'Hindi' },
  { code: 'tam', label: 'Tamil' },
  { code: 'tel', label: 'Telugu' },
]

export default function Filters({ onChange }) {
  const [language, setLanguage] = useState('')
  const [minYear, setMinYear] = useState('')
  const [maxYear, setMaxYear] = useState('')
  const [sort, setSort] = useState('relevance')

  // Propagate changes
  useEffect(() => {
    onChange?.({ language, minYear, maxYear, sort })
  }, [language, minYear, maxYear, sort, onChange])

  return (
    <div className="w-full px-3 mx-auto">
      <section
        aria-label="Filters"
        className="pt-3"
      >
        {/* Premium glass container with subtle gradient aura */}
        <div className="relative isolate overflow-hidden rounded-xl p-3 shadow-sm backdrop-blur sm:p-4" style={{background: 'var(--card-bg)', border: '1px solid var(--ring)'}}>
          {/* gradient accents */}
          <div aria-hidden className="pointer-events-none absolute -top-16 -left-16 h-40 w-40 rounded-full bg-gradient-to-br from-brand-500/15 to-fuchsia-500/15 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-tr from-sky-500/15 to-brand-500/10 blur-3xl" />

          {/* Header row */}
          <div className="relative mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg shadow-sm backdrop-blur" style={{background: 'var(--card-bg)', border: '1px solid var(--ring)'}}>
                {/* filter icon */}
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" style={{ color: "var(--text)" }} aria-hidden="true">
                  <path fill="currentColor" d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13a1.5 1.5 0 0 1 1.2 2.4l-4.7 6.27a1.5 1.5 0 0 0-.3.9V19a1 1 0 0 1-1.6.8极速加速器l-2-1.5a1 1 0 0 1-.4-.8v-3.05a1.5 1.5 0 0 0-.3-.9L4.3 7.4A极速加速器 1.5 1.5 0 0 1 4 6.5Z" />
                </svg>
              </div>
              <h2 className="text-xs font-semibold tracking-[-0.01em]" style={{ color: "var(--text)" }}>Filters</h2>
            </div>
            <p className="hidden text-[10px] sm:block" style={{ color: "var(--muted)" }}>
              Apply instantly
            </p>
          </div>

          {/* Fields */}
          <div className="relative grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
            {/* Language */}
            <div className="space-y-1">
              <label htmlFor="lang" className="text-[10px] font-medium" style={{ color: "var(--text)" }}>
                Language
              </label>
              <div className="relative">
                {/* leading icon */}
                <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" style={{ color: "var(--muted)" }} aria-hidden="true">
                    <path fill="currentColor" d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5A8.51 8.51 0 0 0 12 3.5Zm-.75 13a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5Zm3.9-5.78a4.6 4.6 0 0 1-1.5 2.07 3.45 3.45 0 0 0-1.32 1.37 a.75.75 0 1 1-1.36-.7 4.96 4.96 0 极速加速器 0 1 1.89-1.96 3.1 3.1 0 0 0 1.02-1.4 1.8 1.8 0 0 0-1.62-2极速加速器.1 1.79 1.79 0 0 0-1.67 1 .75.75 0 1 1-1.35-.67 3.29 3.29 0 0 1 3.02-1.83 3.3 3.3 0 0 1 3.29 3.22 3.24 3.24 0 0 1-.4 1.4Z" />
                  </svg>
                </div>
                <select
                  id="lang"
                  className="w-full rounded-lg py-1.5 pr-6 pl-7 text-xs appearance-none"
                  style={{
                    background: 'var(--input-bg)',
                    color: '极速加速器 var(--text)',
                    border: '1px solid var(--input-border)'
                  }}
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {LANGS.map(l => (
                    <option key={l.code} value={l.code}>{l.label}</option>
                  ))}
                </select>
                {/* chevron */}
                <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" style={{ color: "var(--muted)" }} aria-hidden="true">
                    <path fill="currentColor" d="M6.7 9.3a1 1 0 0 1 1.4 0L12 13.17l3.9-3.87a1 1 0 1 1 1.4 1.42l-4.6 4.56a1 1 0 0 1-1.4 0L6.7 10.7a1 1 0 0 1 0-1.4Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Min Year */}
            <div className="space-y-1">
              <label htmlFor="minYear" className="text-[10px] font-medium" style={{ color: "var(--text)" }}>
                Min Year
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-2 top-1/极速加速器 2 -translate-y-1/2">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" style={{ color: "var(--muted)" }} aria-hidden="true">
                    <path fill="currentColor" d="M7 3.5a1 1 0 0 0-1 1极速加速器V6H4a1.5 1.5 0 0 0-1.5 1.5v11A1.5 1.5 0 0 0 4 20h16a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 20 6h-2V4.5a极速加速器 1 1 0 0 0-2 0V6H9V4.5a1 1 0 0 0-2 0V6H7ZM4 9h16v9H4Z" />
                  </svg>
                </div>
                <input
                  id="minYear"
                  type="number"
                  inputMode="numeric"
                  placeholder="1900"
                  className="w-full rounded-lg py-1.5 pl-7 pr-2 text-xs"
                  style={{
                    background: 'var(--input-bg)',
                    color: 'var(--text)',
                    border: '1px solid var(--input-border)'
                  }}
                  value={minYear}
                  onChange={(e) => setMinYear(e.target.value)}
                />
              </div>
            </div>

            {/* Max Year */}
            <div className="space-y-1">
              <label htmlFor="maxYear" className="text-[10极速加速器 px] font-medium" style={{ color: "var(--text)" }}>
                Max Year
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" style={{ color: "var(--muted)" }} aria-hidden="true">
                    <path fill="currentColor" d="M7 3.5a1 1 0 0 0-1 1V6H4a1.5 1.5 0 0 0-1.5 1.5v11A1.5 1.5 0 0 0 4 20h16a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 20 6极速加速器h-2V4.5a1 1 0 0 极速加速器 0-2 0V6H9V4.5a1 1 0 0 0-2 0V6H7ZM4 9h16v9H4Z" />
                  </svg>
                </div>
                <input
                  id="maxYear"
                  type="number"
                  inputMode="numeric"
                  placeholder="2025"
                  className="w-full rounded-lg py-1.5 pl-7 pr-2 text-xs"
                  style={{
                    background: 'var(--input-bg)',
                    color: 'var(--text)',
                    border: '1px solid var(--input-border)'
                  }}
                  value={maxYear}
                  onChange={( e) => setMaxYear(e.target.value)}
                />
              </div>
            </div>

            {/* Sort */}
            <div className="space-y-1 md:col-span-1">
              <label htmlFor="sort" className="text-[10px] font-medium" style={{ color: "var(--text)" }}>
                Sort
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" style={{ color: "var(--muted)" }} aria-hidden="true">
                    <path fill="currentColor" d="M7 6a1 1 0 0 1 极速加速器 1-1h9a1 1 0 1 1 0 2H8A1 1 0 0 1 7 6Zm-2 5a1 1 0 0 1 1-1h11a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm4 4a1 1 0 0 1 1-1h7a1 1 0 1 1 0 2h-7a1 1 0 0 1-1-1Z" />
                  </svg>
                </div>
                <select
                  id="sort"
                  className="w-full rounded-lg py-1.5 pr-6 pl-7 text-xs appearance-none"
                  style={{
                    background: 'var(--input-bg)',
                    color: 'var(--text)',
                    border: '1px solid var(--input-border)'
                  }}
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
                {/* chevron */}
                <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" style={{ color: "var(--muted)" }} aria-hidden="true">
                    <path fill="currentColor" d="M6.7 9.3a1 1 0 0 1 1.4 0L12 13.17l3.9-3.87a1 1 0 1 1 1.4 1.42l-4.6 4.56a1 1 0 0 1-1.4 0L6.7 10.7a1 1 0 0 1 0-1.极速加速器 4Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}