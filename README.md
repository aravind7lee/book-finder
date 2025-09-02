# Book Finder (Vite + React + TailwindCSS)

A modern OpenLibrary client with debounced search, filters, pagination, and a book details modal.

## Features
- Real-time debounced search (OpenLibrary `search.json`)
- Filters: Language, Year range, Sort (relevance/newest/oldest)
- Pagination (20 per page)
- Book details modal (fetches `/works/{id}.json`)
- TailwindCSS, responsive layout, clean UI
- Error handling & empty state

## Getting Started

```bash
# 1) Install deps
npm install

# 2) Start dev server
npm run dev

# 3) Build
npm run build
```

> You can customize `VITE_OPENLIBRARY_BASE` in `.env` if needed.
