// src/components/BookModal.jsx
import { useEffect, useState } from 'react'
import { getWorkDetails } from '../api/bookService'
import { COVERS_BASE } from '../utils/constants'
import { X, BookOpen, Calendar, Languages, Tag, User, AlertCircle } from 'lucide-react'

export default function BookModal({ open, onClose, book }) {
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!open || !book) return
    
    let active = true
    setError(null)
    
    async function fetchBookDetails() {
      setLoading(true)
      setDetails(null)
      
      try {
        const workId = book.key?.split('/').pop() || book.olid
        if (workId) {
          const data = await getWorkDetails(workId)
          if (active) setDetails(data)
        } else {
          throw new Error('No work ID available for this book')
        }
      } catch (error) {
        console.error('Error fetching book details:', error)
        if (active) setError('Failed to load book details. Please try again.')
      } finally {
        if (active) setLoading(false)
      }
    }
    
    fetchBookDetails()
    
    return () => { 
      active = false 
    }
  }, [open, book])

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.keyCode === 27) onClose()
    }
    
    const handleClickOutside = (e) => {
      if (e.target.classList.contains('modal-overlay')) onClose()
    }
    
    document.addEventListener('keydown', handleEscape)
    document.addEventListener('click', handleClickOutside)
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [onClose])

  // Function to extract description from various Open Library formats
  const extractDescription = (descriptionData) => {
    if (!descriptionData) return null
    
    // Handle string description
    if (typeof descriptionData === 'string') {
      return descriptionData
    }
    
    // Handle object with value property
    if (descriptionData.value) {
      return descriptionData.value
    }
    
    // Handle array of descriptions
    if (Array.isArray(descriptionData)) {
      // Try to find the first available description
      for (const item of descriptionData) {
        if (typeof item === 'string') return item
        if (item && item.value) return item.value
      }
    }
    
    return null
  }

  if (!open || !book) return null

  const subjects = details?.subjects || []
  const desc = extractDescription(details?.description)
  const authors = (book.author_name || []).slice(0, 3).join(', ') || 'Unknown Author'
  const year = book.first_publish_year || 'Unknown Year'
  const lang = (book.language || [])[0] || 'Unknown'
  const coverId = book.cover_i || book.covers?.[0]
  const coverSrc = coverId ? COVERS_BASE(coverId, 'M') : null
  const isbn = book.isbn?.[0] || ''

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-modal-title"
    >
      {/* Backdrop with soft blur */}
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />

      {/* Gradient accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-16 h-64 w-64 rounded-full bg-gradient-to-tr from-cyan-500/15 to-blue-500/10 blur-3xl"
      />

      {/* Dialog Card */}
      <div className="relative w-full max-w-2xl mx-auto transform-gpu" style={{willChange: 'transform'}}>
        <div
          className="relative w-full rounded-2xl backdrop-blur-md border shadow-xl isolate overflow-hidden"
          style={{
            background: 'var(--card-bg)',
            borderColor: 'var(--ring)',
            maxHeight: '90vh'
          }}
        >
          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />

          {/* Sticky Header */}
          <div className="sticky top-0 z-10 flex items-start gap-4 border-b p-5 bg-opacity-90 backdrop-blur-sm"
            style={{background: 'var(--card-bg)', borderColor: 'var(--ring)'}}>
            
            {/* Cover thumbnail */}
            <div className="flex-shrink-0">
              <div className="h-16 w-12 overflow-hidden rounded-md border shadow-sm" style={{borderColor: 'var(--ring)'}}>
                {coverSrc ? (
                  <img 
                    src={coverSrc} 
                    alt={`Cover of ${book.title}`} 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                <div className={`h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800 ${coverSrc ? 'hidden' : 'flex'}`}>
                  <BookOpen size={16} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Title & metadata */}
            <div className="min-w-0 flex-1">
              <h3 id="book-modal-title" className="text-lg font-bold tracking-tight line-clamp-2" style={{color: 'var(--text)'}}>
                {book.title}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                <span className="flex items-center gap-1" style={{ color: "var(--muted)" }}>
                  <User size={12} />
                  {authors}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs border"
                  style={{background: 'var(--card-bg)', borderColor: 'var(--ring)', color: 'var(--text)'}}>
                  <Calendar size={12} />
                  {year}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs border bg-gradient-to-br from-blue-500/10 to-purple-500/10"
                  style={{borderColor: 'var(--ring)', color: 'var(--text)'}}>
                  <Languages size={12} />
                  {lang.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Close button */}
            <button
              className="flex-shrink-0 rounded-lg p-2 transition-all duration-150 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              onClick={onClose}
              aria-label="Close"
              style={{
                border: '1px solid var(--ring)',
              }}
            >
              <X size={18} style={{color: 'var(--text)'}} />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[60vh] overflow-y-auto p-5">
            {/* Error state */}
            {error && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <AlertCircle size={32} className="text-red-500 mb-2" />
                <p className="text-red-500 font-medium">{error}</p>
                <p className="text-sm text-gray-500 mt-2">Please try selecting another book</p>
              </div>
            )}

            {/* Loading state */}
            {loading && !error && (
              <div className="space-y-4">
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                
                <div className="mt-6 flex flex-wrap gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} className="h-6 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            {!loading && !error && details && (
              <>
                {desc ? (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <BookOpen size={16} />
                      Description
                    </h4>
                    <div 
                      className="text-sm leading-6 prose prose-sm dark:prose-invert max-w-none"
                      style={{color: 'var(--text)'}}
                      dangerouslySetInnerHTML={{ __html: desc }}
                    />
                  </div>
                ) : (
                  <div className="mb-6 text-center py-4 text-gray-500 dark:text-gray-400">
                    <BookOpen size={24} className="mx-auto mb-2 opacity-50" />
                    <p>No description available for this book</p>
                  </div>
                )}

                {subjects.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Tag size={16} />
                      Subjects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {subjects.slice(0, 15).map((subject) => (
                        <span
                          key={subject}
                          className="text-xs px-3 py-1.5 rounded-full border shadow-sm"
                          style={{
                            background: 'var(--card-bg)',
                            borderColor: 'var(--ring)',
                            color: 'var(--text)'
                          }}
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional book details */}
                <div className="mt-6 pt-4 border-t" style={{borderColor: 'var(--ring)'}}>
                  <h4 className="text-sm font-semibold mb-3">Additional Details</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium">ISBN:</span> {isbn || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Pages:</span> {details?.number_of_pages || book.number_of_pages_median || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">First Published:</span> {details?.first_publish_date || year}
                    </div>
                    <div>
                      <span className="font-medium">Edition Count:</span> {details?.edition_count || book.edition_count || 'N/A'}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}