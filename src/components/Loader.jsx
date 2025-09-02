// src/components/Loader.jsx
export default function Loader() {
  return (
    <div className="container mx-auto max-w-7xl px-3 sm:px-4 md:px-6 flex items-center justify-center py-16">
      {/* Glassy container */}
      <div className="relative isolate w-full max-w-md rounded-2xl p-5 shadow-sm ring-1" style={{background: 'var(--card-bg)', borderColor: 'var(--ring)'}}>
        {/* Ambient gradient accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 -left-12 h-40 w-40 rounded-full bg-gradient-to-br from-brand-500/20 to-fuchsia-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-14 -right-14 h-44 w-44 rounded-full bg-gradient-to-tr from-sky-500/15 to-brand-500/10 blur-3xl"
        />

        {/* Content */}
        <div className="relative flex items-center gap-4">
          {/* Spinner tile */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl shadow-sm ring-1" style={{background: 'var(--card-bg)', borderColor: 'var(--ring)'}}>
            {/* Accessible progress indicator */}
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 animate-spin transform-gpu"
              style={{color: 'var(--brand-600)'}}
              role="status"
              aria-label="Loading"
            >
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="4" />
              <path d="M22 12a10 10 0 0 0-10-10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>

          {/* Text + subtle skeleton shimmer */}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium tracking-[-0.01em]" style={{color: 'var(--text)'}}>Loading</p>
            <p className="mt-0.5 text-xs" style={{color: 'var(--muted)'}}>Fetching fresh books…</p>

            {/* Lightweight shimmer lines (visual only) */}
            <div className="mt-3 grid grid-cols-3 gap-2" aria-hidden="true">
              <div className="col-span-2 h-2 animate-pulse rounded-full" style={{background: 'var(--skeleton)'}} />
              <div className="h-2 animate-pulse rounded-full" style={{background: 'var(--skeleton)'}} />
              <div className="col-span-3 h-2 animate-pulse rounded-full" style={{background: 'var(--skeleton)'}} />
            </div>
          </div>

          {/* Decorative dots nodding to your original loader (visual only) */}
          <div className="hidden sm:flex items-end gap-1.5 pr-1">
            <span className="block h-2.5 w-2.5 animate-ping rounded-full" style={{background: 'var(--brand-600)'}} />
            <span className="block h-2.5 w-2.5 animate-pulse rounded-full" style={{background: 'var(--brand-600)'}} />
            <span className="block h-2.5 w-2.5 animate-ping rounded-full" style={{background: 'var(--brand-600)'}} />
          </div>
        </div>
      </div>

      {/* Screen-reader polite status (kept outside the card) */}
      <span className="sr-only" aria-live="polite">Loading…</span>
    </div>
  )
}