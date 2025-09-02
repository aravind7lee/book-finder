export const OPENLIBRARY_BASE = import.meta.env.VITE_OPENLIBRARY_BASE || 'https://openlibrary.org'
export const SEARCH_ENDPOINT = `${OPENLIBRARY_BASE}/search.json`
export const WORKS_ENDPOINT = (workId) => `${OPENLIBRARY_BASE}/works/${workId}.json`
export const COVERS_BASE = (coverId, size = 'M') => `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
export const DEFAULT_PAGE_SIZE = 20
