// src/components/Home.jsx
import { useCallback, useEffect, useMemo, useState } from 'react'
import { searchBooks } from '../api/bookService'
import useDebounce from '../hooks/useDebounce'
import Header from '../components/Header'
import Filters from '../components/Filters'
import BookGrid from '../components/BookGrid'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'
import { DEFAULT_PAGE_SIZE } from '../utils/constants'
import BookModal from '../components/BookModal'

export default function Home() {
  const [query, setQuery] = useState('harry potter')
  const [page, setPage] = useState(1)
  const [raw, setRaw] = useState({ docs: [], numFound: 0 })
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({ language: '', minYear: '', maxYear: '', sort: 'relevance' })
  const [selected, setSelected] = useState(null)
  const debouncedQuery = useDebounce(query, 400)

  const fetchData = useCallback(async () => {
    if (!debouncedQuery) {
      setRaw({ docs: [], numFound: 0 })
      return
    }
    setLoading(true)
    try {
      const data = await searchBooks({ query: debouncedQuery, page })
      setRaw(data)
    } catch (e) {
      console.error(e)
      setRaw({ docs: [], numFound: 0 })
    } finally {
      setLoading(false)
    }
  }, [debouncedQuery, page])

  useEffect(() => { setPage(1) }, [debouncedQuery])

  useEffect(() => { fetchData() }, [fetchData])

  const filtered = useMemo(() => {
    let docs = raw.docs || []
    if (filters.language) {
      docs = docs.filter(d => (d.language || []).includes(filters.language))
    }
    if (filters.minYear) {
      const min = Number(filters.minYear)
      docs = docs.filter(d => (d.first_publish_year || 0) >= min)
    }
    if (filters.maxYear) {
      const max = Number(filters.maxYear)
      docs = docs.filter(d => (d.first_publish_year || 0) <= max)
    }
    if (filters.sort === 'newest') {
      docs = [...docs].sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0))
    } else if (filters.sort === 'oldest') {
      docs = [...docs].sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0))
    }
    return docs
  }, [raw, filters])

  return (
    <div className="min-h-screen overflow-x-hidden" style={{background: 'var(--bg)', color: 'var(--text)'}}>
      <Header onSearch={setQuery} />
      <Filters onChange={setFilters} />

      <main className="w-full px-3 sm:px-4 mx-auto">
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Fixed alignment for results count and page number */}
            <div className="flex items-center justify-between py-4 px-1">
              <span className="text-sm font-medium">
                About {raw.numFound?.toLocaleString?.() || 0} results
              </span>
              <span className="text-sm font-medium">
                Page {page}
              </span>
            </div>
            
            <BookGrid books={filtered} onSelect={setSelected} />
            
            <Pagination
              page={page}
              total={raw.numFound || 0}
              pageSize={DEFAULT_PAGE_SIZE}
              onChange={setPage}
            />
          </>
        )}
      </main>

      <BookModal open={!!selected} onClose={() => setSelected(null)} book={selected} />
    </div>
  )
}