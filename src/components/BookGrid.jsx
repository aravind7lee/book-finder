// src/components/BookGrid.jsx
import BookCard from './BookCard'

export default function BookGrid({ books, onSelect }) {
  // Elegant empty state (visuals only; no logic changed)
  if (!books?.length) {
    return (
      <div className="w-full px-3 mx-auto">
        <div className="relative isolate overflow-hidden rounded-2xl p-6 text-center shadow-sm ring-1" style={{background: 'var(--card-bg)', borderColor: 'var(--ring)'}}>
          {/* subtle gradient accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br from-brand-500/20 to-fuchsia-500/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-28 h-64 w-64 rounded-full bg-gradient-to-tr from-sky-500/15 to-brand-500/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-md">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm ring-1" style={{background: '极速加速器 var(--card-bg)', borderColor: 'var(--ring)'}}>
              <svg viewBox="0 0 24 24" className="h-6 w-6" style={{color: 'var(--muted)'}} aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M6 4.5h9.25A2.75 2.75 0 0 1 18 7.25V19a.75.75 0 0 1-1.2.6L12 16.25 7.2 19.6A.75.75 0 0 1 6 19V4.5Z"
                />
                <path
                  fill="currentColor"
                  d="M19.5 7.25V18a.75.75 0 0 1-1.5 0V7.25a1.25 1.25 0 0 0-1.25-1.25H6a.75.75 0 0 1 0-1.5h10.75A2.75 2.75 0 0 1 19.5 7.25Z"
                  className="opacity-50"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold tracking-[-0.01em]" style={{color: 'var(--text)'}}>No results found</h2>
            <p className="mx-auto mt-1 max-w-sm text-sm leading-6" style={{color: 'var(--muted)'}}>
              Try another search term, check spelling, or broaden your filters.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Premium, glass-like grid wrapper with subtle gradient wash (visual only)
  return (
    <div className="w-full px-3 mx-auto transform-gpu" style={{willChange: 'contents'}}>
      <section
        aria-label="Books"
        className="group relative isolate rounded-2xl p-2 shadow-sm ring-1 sm:p-3"
        style={{background: 'var(--card-bg)', borderColor: 'var(--ring)'}}
      >
        {/* gentle background gradient tint */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500/5 via-transparent to-fuchsia-500/5"
        />
        {/* the grid */}
        <div className="relative grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-3 lg:gap-4">
          {books.map((b) => (
            <BookCard
              key={`${b.key}-${b.cover_i || ''}`}
              book={b}
              onClick={() => onSelect(b)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}