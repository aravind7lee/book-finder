// src/components/BookCard.jsx
import { COVERS_BASE } from '../utils/constants'
import { useState } from 'react'

export default function BookCard({ book, onClick }) {
  const coverId = book.cover_i
  const src = coverId ? COVERS_BASE(coverId, 'M') : null
  const authors = (book.author_name || []).slice(0, 2).join(', ')
  const year = book.first_publish_year
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <button
      onClick={onClick}
      title={book.title}
      className={[
        // container
        "group relative isolate block w-full text-left",
        // premium glass surface + subtle gradient aura
        "rounded-xl",
        "ring-1 shadow-sm hover:shadow-lg",
        "transition-all duration-300 ease-out transform-gpu",
        "hover:-translate-y-0.5 active:translate-y-0",
        // gradient edge glow on hover
        "before:absolute before:inset-0 before:rounded-xl before:opacity-0",
        "before:bg-gradient-to-br before:from-brand-500/15 before:via-transparent before:to-fuchsia-500/15",
        "before:transition-opacity before:duration-300 group-hover:before:opacity-100",
        // focus accessibility
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      ].join(" ")}
      style={{
        background: 'var(--card-bg)',
        borderColor: 'var(--ring)',
        willChange: 'transform'
      }}
    >
      {/* Cover */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl ring-1 ring-inset" style={{background: 'var(--skeleton)', borderColor: 'var(--ring)'}}>
        {src ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br" style={{background: 'var(--card-bg)'}}>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-8 w-8"
                  style={{color: 'var(--muted)'}}
                >
                  <path
                    fill="currentColor"
                    d="M6 4.5h9.25A2.75 2.75 0 0 1 18 7.25V19a.75.75 0 0 1-1.2.6L12 16.25 7.2 19.6A.75.75 0 0 1 6 19V4.5Z"
                  />
                  <path
                    fill="currentColor"
                    d="M19.5 7.25V18a.75.75 0 0 1-1.5 0V7.25a1.25 1.25 0 0 0-1.25-1.25H6a.75.75 极速加速器 0 0 1 0-1.5h10.75A2.75 2.75 0 0 1 19.5 7.25Z"
                    className="opacity-50"
                  />
                </svg>
              </div>
            )}
            <img
              src={src}
              alt={book.title}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              className="h-full w-full object-cover transition-transform duration-300 ease-out transform-gpu group-hover:scale-[1.03] group-active:scale-[0.99]"
              style={{
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
                transform: 'translateZ(0)'
              }}
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br" style={{background: 'var(--card-bg)'}}>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-8 w-8"
              style={{color: 'var(--muted)'}}
            >
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
        )}

        {/* soft bottom gradient for depth on hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Info */}
      <div
        className={[
          "relative -mt-4 mx-2 rounded-lg",
          "ring-1 shadow-sm",
          "p-2 transition-colors duration-300 transform-gpu"
        ].join(" ")}
        style={{
          background: 'var(--card-bg)',
          borderColor: 'var(--ring)',
          transform: 'translateZ(0)'
        }}
      >
        <h3 className="line-clamp-2 text-xs font-semibold tracking-[-0.01em]" style={{color: 'var(--text)'}}>
          {book.title}
        </h3>

        {authors && (
          <p className="mt-0.5 line-clamp-1 text-[10px]" style={{color: 'var(--muted)'}}>
            {authors}
          </p>
        )}

        <div className="mt-1.5 flex items-center gap-1">
          {year && (
            <span
              className={[
                "inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                "ring-1 shadow-sm"
              ].join(" ")}
              style={{
                background: 'var(--card-bg)',
                borderColor: 'var(--ring)',
                color: 'var(--text)'
              }}
            >
              {year}
            </span>
          )}
          {(book.language || [])
            .slice(0, 1)
            .map((l) => (
              <span
                key={l}
                className={[
                  "inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase",
                  "bg-gradient-to-br from-brand-500/10 to-fuchsia-500/10",
                  "ring-1 shadow-sm"
                ].join(" ")}
                style={{
                  borderColor: 'var(--ring)',
                  color: 'var(--text)'
                }}
              >
                {l}
              </span>
            ))}
        </div>
      </div>
    </button>
  )
}