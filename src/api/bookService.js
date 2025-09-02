import axios from 'axios'
import { SEARCH_ENDPOINT, WORKS_ENDPOINT, DEFAULT_PAGE_SIZE } from '../utils/constants'

/**
 * Fetch books from OpenLibrary.
 * We keep filtering (language/year) on the client side for reliability.
 */
export async function searchBooks({ query, page = 1 }) {
  if (!query || !query.trim()) {
    return { docs: [], numFound: 0 }
  }
  const params = new URLSearchParams()
  params.set('q', query)
  params.set('page', String(page))
  params.set('limit', String(DEFAULT_PAGE_SIZE))

  const url = `${SEARCH_ENDPOINT}?${params.toString()}`
  const { data } = await axios.get(url)
  return data
}

export async function getWorkDetails(workId) {
  const url = WORKS_ENDPOINT(workId)
  const { data } = await axios.get(url)
  return data
}
