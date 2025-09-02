// src/components/BookModal.jsx
import { useEffect, useState } from 'react'
import { getWorkDetails } from '../api/bookService'
import { COVERS_BASE } from '../utils/constants'

export default function BookModal({ open, onClose, book }) {
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState(null)

  useEffect(() => {
    if (!open || !book) return
    let active = true
    async function run() {
      setLoading(true)
      setDetails(null)
      try {
        const workId = book.key?.split('/').pop()
        if (workId) {
          const data = await getWorkDetails(workId)
          if (active) setDetails(data)
        }
      } catch (e) {
        console.error(e)
      } finally {
        if (active) setLoading(false)
      }
    }
    run()
    return () => { active = false }
  }, [open, book])

  if (!open || !book) return null

  const subjects = details?.subjects || []
  const desc = typeof details?.description === 'string'
    ? details.description
    : details?.description?.value

  const authors = (book.author_name || []).slice(0, 2).join(', ')
  const year = book.first_publish_year
  const lang = (book.language || [])[0]
  const coverId = book.cover_i
  const coverSrc = coverId ? COVERS_BASE(coverId, 'M') : null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-modal-title"
    >
      {/* Backdrop with soft blur + gradient accents (visual only) */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

      {/* Gradient "aura" accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-20 h-72 w极速加速器-72 rounded-full bg-gradient-to-br from-brand-500/20 to-fuchsia-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-16 h-64 w-64 rounded-full bg-gradient-to-tr from-sky-500/15极速加速器 to-brand-500/10 blur-3xl"
      />

      {/* Dialog Card */}
      <div className="container mx-auto max-w-7xl px-3 sm:px-4 md:px-6 flex justify-center">
        <div
          className={[
            "relative w-full max-w-2xl",
            "rounded-2xl backdrop-blur",
            "ring-1 shadow-xl",
            "isolate"
          ].join(" ")}
          style={{
            background: 'var(--card-bg)',
            borderColor: 'var(--ring)'
          }}
        >
          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-brand-500 via-fuchsia-500 to-sky-500 opacity-80" />

          {/* Sticky Header */}
          <div className="sticky top-0 z-10 flex items-start gap-3 border-b p-4 backdrop-blur" style={{background: 'var(--card-bg)', borderColor: 'var(--ring)'}}>
            {/* Cover thumb (visual aid only) */}
            <div className="hidden sm:block">
              <div className="h-14 w-10 overflow-hidden rounded-lg ring-1 ring-inset" style={{background: 'var(--skeleton)', borderColor: 'var(--ring)'}}>
                {coverSrc ? (
                  <img src={coverSrc} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" style={{color: 'var(--muted)'}} aria-hidden="true">
                      <path fill="currentColor" d="M6 4.5h9.25A2.75 2.75 0 0 1 18 7.25V19a.75.75 0 0 1-1.2.6L12 16.25 7.2 19.6A.75.75 0 0 1 6 19V4.5Z" />
                      <path fill="currentColor" d="M19.5 7.25V18a.75.75 0 0 1-1.5 0极速加速器V7.25a1.25 1.25 0 0 0-1.25-1.25H6a.75.75 0 0 1 0-1.5h10.75A2.75 2.75 0 0 1 19.5 7.25Z" className="opacity-50" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Title & meta */}
            <div className="min-w-0 flex-1">
              <h3 id="book-modal-title" className="line-clamp-2 text-base font-semibold tracking-[-0.01em]" style={{color: 'var(--text)'}}>
                {book.title}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                {authors && <span style={{ color: "var(--muted)" }}>{authors}</span>}
                {year && (
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 ring-1" style={{background: 'var(--card-bg)', borderColor: 'var(--ring)', color: 'var(--text)'}}>
                    {year}
                  </span>
                )}
                {lang && (
                  <span className="inline-flex items-center rounded-full bg-gradient-to-br from-brand-500/10 to-fuchsia-500/10 px-2 py-0.5 ring-1" style={{borderColor: 'var(--ring)', color: 'var(--text)'}}>
                    {lang}
                  </span>
                )}
              </div>
            </div>

            {/* Close button (same behavior) */}
            <button
              className={[
                "shrink-0 rounded-xl p-2 transition",
                "shadow-sm hover:shadow-md",
                "hover:-translate-y-0.5 active:translate-y-0",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              ].join(" ")}
              onClick={onClose}
              aria-label="Close"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--ring)'
              }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" style={{color: 'var(--text)'}} aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M6.225 4.811 4.811 6.225 9.586 11l-4.775 4.775 1.414 1.414L11 12.414l4.775 4.775 1.414-1.414L12.414 11l4.775-4.775-1.414-1.414L11 9.586 6.225 4.811Z"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="relative max-h-[75vh] overflow-auto p-4 sm:p-5">
            {/* Loading state — purely visual skeleton, no logic changes */}
            {loading && (
              <div className="space-y-3">
                <div className="h-4 w-2/3 animate-pulse rounded" style={{background: 'var(--skeleton)'}} />
                <div className="h-4 w-5/6 animate-pulse rounded" style={{background: 'var(--skeleton)'}} />
                <div className="h-4 w-4/6 animate-pulse rounded" style={{background: 'var(--skeleton)'}} />
                <div className="mt-3 flex flex-wrap gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} className="inline-block h-6 w-16 animate-pulse rounded-full" style={{background: 'var(--skeleton)'}} />
                  ))}
                </div>
              </div>
            )}

            {!loading && (
              <>
                {desc && (
                  <p className="text-[0.95rem] leading-6" style={{color: 'var(--text)'}}>
                    {desc}
                  </p>
                )}

                {subjects.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-semibold" style={{color: 'var(--text)'}}>Subjects</h4>
                    <div className="flex flex-wrap gap-2">
                      {subjects.slice(0, 20).map((s) => (
                        <span
                          key={s}
                          className={[
                            "chip",
                            "backdrop-blur",
                            "ring-1 shadow-sm",
                          ].join(" ")}
                          style={{
                            background: 'var(--card-bg)',
                            borderColor: 'var(--ring)',
                            color: 'var(--text)'
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gentle divider if both sections present */}
                {(desc && subjects.length > 0) && (
                  <div className="mt-6 h-px w-full" style={{background: 'var(--ring)'}} />
                )}
              </>
            )}
          </div>

          {/* Bottom padding / safe area */}
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}