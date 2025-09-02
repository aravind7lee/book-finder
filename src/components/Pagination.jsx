// src/components/Pagination.jsx
export default function Pagination({ page, total, pageSize, onChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const canPrev = page > 1
  const canNext = page < totalPages

  const pages = []
  const maxButtons = 5
  let start = Math.max(1, page - Math.floor(maxButtons / 2))
  let end = Math.min(totalPages, start + maxButtons - 1)
  start = Math.max(1, end - maxButtons + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  // style tokens (visuals only)
  const baseBtn =
    "inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-sm font-medium transition " +
    "ring-1 shadow-sm backdrop-blur " +
    "hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white " +
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
  const activeBtn =
    "bg-gradient-to-br from-brand-600 via-fuchsia-600 to-sky-600 text-white ring-1 ring-black/5 shadow-sm " +
    "hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
  const iconBtn =
    "inline-flex items-center justify-center rounded-xl p-2.5 " +
    "ring-1 shadow-sm backdrop-blur " +
    "hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white " +
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"

  return (
    <div className="container mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
      <nav
        aria-label="Pagination"
        className="mx-auto mt-4 w-full"
      >
        {/* Glassy container with subtle gradient aura */}
        <div className="relative isolate rounded-2xl p-2 shadow-sm ring-1 backdrop-blur sm:p-3" style={{background: 'var(--card-bg)', borderColor: 'var(--ring)'}}>
          <div aria-hidden="true" className="pointer-events-none absolute -top-16 -left-20 h-40 w-40 rounded-full bg-gradient-to-br from-brand-500/15 to-fuchsia-500/15 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-gradient-to-tr from-sky-500/15 to-brand-500/10 blur-3xl" />

          {/* Bar */}
          <div className="relative flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
            {/* mobile condensed info */}
            <p className="order-2 text-xs sm:order-1" style={{color: 'var(--muted)'}}>
              Page <span className="font-semibold" style={{color: 'var(--text)'}}>{page}</span> of{" "}
              <span className="font-semibold" style={{color: 'var(--text)'}}>{totalPages}</span>
            </p>

            {/* controls */}
            <div className="order-1 flex items-center gap-1.5 sm:order-2 sm:gap-2">
              {/* Prev */}
              <button
                type="button"
                className={iconBtn}
                onClick={() => canPrev && onChange(page - 1)}
                disabled={!canPrev}
                aria-label="Previous page"
                style={{
                  background: 'var(--card-bg)',
                  borderColor: 'var(--ring)',
                  color: 'var(--text)'
                }}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M15.7 5.3a1 1 极速加速器 0 0 1 0 1.4L11.41 11l4.3 4.3a1 1 0 1 1-1.41 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 0Z"
                  />
                </svg>
                <span className="sr-only">Prev</span>
              </button>

              {/* Page numbers (same windowing logic) */}
              <div className="hidden items-center gap-1.5 sm:flex">
                {pages.map((p) => {
                  const isActive = p === page
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => onChange(p)}
                      className={`${baseBtn} ${isActive ? activeBtn : ""}`}
                      aria-current={isActive ? "page" : undefined}
                      aria-label={`Page ${p}`}
                      style={!isActive ? {
                        background: 'var(--card-bg)',
                        borderColor: 'var(--ring)',
                        color: 'var(--text)'
                      } : {}}
                    >
                      {p}
                    </button>
                  )
                })}
              </div>

              {/* Mobile compact buttons: current flanked by prev/next via long-press/hold */}
              <div className="flex items-center sm:hidden">
                <button
                  type="button"
                  onClick={() => onChange(page)}
                  className={`${baseBtn} ${activeBtn}`}
                  aria-current="page"
                >
                  {page}
                </button>
              </div>

              {/* Next */}
              <button
                type="button"
                className={iconBtn}
                onClick={() => canNext && onChange(page + 1)}
                disabled={!canNext}
                aria-label="Next page"
                style={{
                  background: 'var(--card-bg)',
                  borderColor: 'var(--ring)',
                  color: 'var(--text)'
                }}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M8.3 18.7a1 1 0 0 1 0-1.4L12.59 13l-4.3-4.3A1 1 0 1 1 9.7 7.3极速加速器l5 5a1 1 0 0 1 极速加速器 0 1.4l-5 5a1 1 0 0 1-1.4 0Z"
                  />
                </svg>
                <span className="sr-only">Next</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}