// src/components/Filters.jsx
import { useEffect, useState } from 'react';
import { 
  Filter, 
  Languages, 
  Calendar, 
  ChevronDown, 
  ArrowUpDown,
  Check,
  Sparkles
} from 'lucide-react';

const LANGS = [
  { code: '', label: 'Any' },
  { code: 'eng', label: 'English' },
  { code: 'spa', label: 'Spanish' },
  { code: 'fre', label: 'French' },
  { code: 'deu', label: 'German' },
  { code: 'ita', label: 'Italian' },
  { code: 'hin', label: 'Hindi' },
  { code: 'tam', label: 'Tamil' },
  { code: 'tel', label: 'Telugu' },
];

export default function Filters({ onChange }) {
  const [language, setLanguage] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [sort, setSort] = useState('relevance');

  // Propagate changes
  useEffect(() => {
    onChange?.({ language, minYear, maxYear, sort });
  }, [language, minYear, maxYear, sort, onChange]);

  return (
    <div className="w-full px-3 mx-auto">
      <section
        aria-label="Filters"
        className="pt-3"
      >
        {/* Premium glass container with subtle gradient aura */}
        <div className="relative isolate overflow-hidden rounded-xl p-3 shadow-sm backdrop-blur sm:p-4" style={{background: 'var(--card-bg)', border: '1px solid var(--ring)'}}>
          {/* gradient accents */}
          <div aria-hidden className="pointer-events-none absolute -top-16 -left-16 h-40 w-40 rounded-full bg-gradient-to-br from-brand-500/15 to-fuchsia-500/15 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-tr from-sky-500/15 to-brand-500/10 blur-3xl" />

          {/* Header row */}
          <div className="relative mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg shadow-sm backdrop-blur" style={{background: 'var(--card-bg)', border: '1px solid var(--ring)'}}>
                <Filter size={14} style={{ color: "var(--text)" }} aria-hidden="true" />
              </div>
              <h2 className="text-xs font-semibold tracking-[-0.01em]" style={{ color: "var(--text)" }}>Filters</h2>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles size={10} style={{ color: "var(--muted)" }} />
              <p className="text-[10px] sm:block" style={{ color: "var(--muted)" }}>
                Apply instantly
              </p>
            </div>
          </div>

          {/* Fields */}
          <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {/* Language */}
            <div className="space-y-1">
              <label htmlFor="lang" className="flex items-center gap-1 text-[10px] font-medium" style={{ color: "var(--text)" }}>
                <Languages size={12} />
                Language
              </label>
              <div className="relative">
                <select
                  id="lang"
                  className="w-full rounded-lg py-2 pr-8 pl-9 text-xs appearance-none transition-all duration-150 focus:ring-2 focus:ring-opacity-50"
                  style={{
                    background: 'var(--input-bg)',
                    color: 'var(--text)',
                    border: '1px solid var(--input-border)'
                  }}
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {LANGS.map(l => (
                    <option key={l.code} value={l.code}>{l.label}</option>
                  ))}
                </select>
                {/* Language icon */}
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <Languages size={14} style={{ color: "var(--muted)" }} />
                </div>
                {/* Chevron icon */}
                <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                  <ChevronDown size={14} style={{ color: "var(--muted)" }} />
                </div>
              </div>
            </div>

            {/* Min Year */}
            <div className="space-y-1">
              <label htmlFor="minYear" className="flex items-center gap-1 text-[10px] font-medium" style={{ color: "var(--text)" }}>
                <Calendar size={12} />
                Min Year
              </label>
              <div className="relative">
                <input
                  id="minYear"
                  type="number"
                  inputMode="numeric"
                  placeholder="1900"
                  className="w-full rounded-lg py-2 pl-9 pr-3 text-xs transition-all duration-150 focus:ring-2 focus:ring-opacity-50"
                  style={{
                    background: 'var(--input-bg)',
                    color: 'var(--text)',
                    border: '1px solid var(--input-border)'
                  }}
                  value={minYear}
                  onChange={(e) => setMinYear(e.target.value)}
                />
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <Calendar size={14} style={{ color: "var(--muted)" }} />
                </div>
              </div>
            </div>

            {/* Max Year */}
            <div className="space-y-1">
              <label htmlFor="maxYear" className="flex items-center gap-1 text-[10px] font-medium" style={{ color: "var(--text)" }}>
                <Calendar size={12} />
                Max Year
              </label>
              <div className="relative">
                <input
                  id="maxYear"
                  type="number"
                  inputMode="numeric"
                  placeholder="2025"
                  className="w-full rounded-lg py-2 pl-9 pr-3 text-xs transition-all duration-150 focus:ring-2 focus:ring-opacity-50"
                  style={{
                    background: 'var(--input-bg)',
                    color: 'var(--text)',
                    border: '1px solid var(--input-border)'
                  }}
                  value={maxYear}
                  onChange={(e) => setMaxYear(e.target.value)}
                />
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <Calendar size={14} style={{ color: "var(--muted)" }} />
                </div>
              </div>
            </div>

            {/* Sort */}
            <div className="space-y-1 md:col-span-1">
              <label htmlFor="sort" className="flex items-center gap-1 text-[10px] font-medium" style={{ color: "var(--text)" }}>
                <ArrowUpDown size={12} />
                Sort
              </label>
              <div className="relative">
                <select
                  id="sort"
                  className="w-full rounded-lg py-2 pr-8 pl-9 text-xs appearance-none transition-all duration-150 focus:ring-2 focus:ring-opacity-50"
                  style={{
                    background: 'var(--input-bg)',
                    color: 'var(--text)',
                    border: '1px solid var(--input-border)'
                  }}
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
                {/* Sort icon */}
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <ArrowUpDown size={14} style={{ color: "var(--muted)" }} />
                </div>
                {/* Chevron icon */}
                <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                  <ChevronDown size={14} style={{ color: "var(--muted)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}