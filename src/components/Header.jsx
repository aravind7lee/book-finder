// src/components/Header.jsx
import { useMemo, useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Header({
  value,
  query,
  onChange,
  onInput,
  setQuery,
  onSubmit,
  onSearch,
  onClear,
  placeholder = "Search books, authors, ISBN…",
}) {
  const isControlled = useMemo(() => value != null || query != null, [value, query]);
  const [internalValue, setInternalValue] = useState("");
  const displayValue = isControlled ? (value ?? query ?? "") : internalValue;

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const debounceTimer = useRef(null);
  const dropdownRef = useRef(null);

  const fire = ( fn, v) => fn?.({ target: { value: v } }, v);

  const handleInputChange = (v) => {
    if (!isControlled) setInternalValue(v);
    fire(onChange, v);
    fire(onInput, v);
    setQuery?.(v);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (v.trim().length > 0) {
      debounceTimer.current = setTimeout(() => {
        triggerSearch(v);
      }, 400);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  };

  const triggerSearch = async (term) => {
    setLoading(true);
    try {
      const searchFn = onSubmit || onSearch;
      if (!searchFn) return;
      const data = await searchFn(term);
      if (Array.isArray(data)) setResults(data);
      setShowDropdown(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    const v = String(displayValue ?? "");
    triggerSearch(v);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue("");
    fire(onChange, "");
    fire(onInput, "");
    setQuery?.("");
    onClear?.();
    setResults([]);
    setShowDropdown(false);
  };

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      {/* Glassy header background */}
      <div className="relative shadow-sm" style={{ background: "var(--bg)" }}>
        <div className="w-full px-3 mx-auto">
          {/* Top row: Logo (left) + Theme toggle (right) */}
          <div className="py-3 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl shadow-sm" style={{ background: "var(--card-bg)", border: "1px solid var(--ring)" }}>
                <svg viewBox="0 0 24 24" className="h-4 w-4" style={{ color: "var(--text)" }}>
                  <path fill="currentColor" d="M6 4.5h9.25A2.75 2.75 0 0 1 18 7.25V19a.75.75 0 0 1-1.2.6L12 16.25 7.2 19.6A.75.75 0 0 1 6 19V4.5Z" />
                  <path fill="currentColor" d="M19.5 7.25V18a.75.75 0 0 1-1.5 0V7.25a1.25 1.25 0 0 0-1. 25-1.25H6a.75.75 0 0 1 0-1.5h10.75A2.75 2.75 0 0 1 19.5 7.25Z" className="opacity-60" />
                </svg>
              </div>
              <div>
                <p className="truncate text-sm font-semibold" style={{ color: "var(--text)" }}>
                  Booknity
                </p>
                <p className="hidden text-[11px]" style={{ color: "var(--muted)" }}>
                  Search books instantly
                </p>
              </div>
            </div>

            {/* Right: theme toggle */}
            <div className="flex items-center gap-2">
              <div className="relative z-50">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Search bar below */}
          <div className="pb-3">
            <form
              onSubmit={handleSubmit}
              ref={dropdownRef}
              role="search"
              aria-label="Search books"
              className="mt-2 relative"
            >
              <div className="relative">
                {/* search icon */}
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" style={{ color: "var(--muted)" }}>
                    <path
                      fill="currentColor"
                      d="M15.8 14.4h.9l5 5a1 1 0 1 1-1.4 1.4l-5-5v-.9l-.3-.3a7 7 0 1 1 1.4-1.4l.4.2ZM10.5 16a5.5 5.5  0 1 0 0-11 5.5 5.5 0 0 0  0 11Z"
                    />
                  </svg>
                </div>

                {/* input */}
                <input
                  type="text"
                  inputMode="search"
                  autoComplete="off"
                  spellCheck="false"
                  placeholder={placeholder}
                  value={displayValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onFocus={() => displayValue && results.length > 0 && setShowDropdown(true)}
                  className="w-full h-10 rounded-xl pr-20 pl-9 text-sm"
                  style={{
                    background: "var(--input-bg)",
                    color: "var(--text)",
                    border: "1px solid var(--input-border)",
                  }}
                />

                {/* clear + submit */}
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {String(displayValue || "").length > 0 && (
                    <button
                      type="button"
                      onClick={handleClear}
                      aria-label="Clear search"
                      className="rounded-lg p-1.5"
                      style={{
                        background: "var(--card-bg)",
                        border: "1px solid var(--ring)",
                      }}
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" style={{ color: "var(--muted)" }}>
                        <path
                          fill="currentColor"
                          d="M6.225 4.811 4.811 6.225 9.586 11l-4.775 4.775 1.414 1.414L11 12.414l4.775 4.775 1.414-1.414L12.414 11l4.775-4.775-1.414-1.414L11 9.586 6.225 4.811Z"
                        />
                      </svg>
                    </button>
                  )}

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                    aria-label="Search"
                    style={{
                      color: "#fff",
                      background: "linear-gradient(90deg,var(--brand-600),#8b3fe4)",
                      boxShadow: "0 4px 12px rgba(99,102,241,0.12)",
                      border: "none",
                    }}
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
                      <path
                        fill="currentColor"
                        d="M15.8 14.4h.9l5 5a1 1 0 1 1-1.4 1.4l-5-5v-.9l-.3-.3a7 7 0 1 1 1.4-1.4l.4.2ZM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
                      />
                    </svg>
                    <span className="hidden xs:inline">Search</span>
                  </button>
                </div>
              </div>

              {/* dropdown results */}
              {showDropdown && results.length > 0 && (
                <div
                  className="absolute z-50 mt-1 w-full rounded-lg shadow-lg max-h-64 overflow-y-auto"
                  style={{ background: "var(--dropdown-bg)", border: "1px solid var(--ring)" }}
                >
                  {results.map((book, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-2 py-1.5 hover:bg-[rgba(var(--surface-rgb),0.98)] cursor-pointer"
                    >
                      {book.cover_i ? (
                        <img
                          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
                          alt={book.title}
                          className="h-8 w-6 object-cover rounded shadow-sm"
                        />
                      ) : (
                        <div
                          className="h-8 w-6 rounded flex items-center justify-center text-[8px]"
                          style={{ background: "var(--bg)", color: "var(--muted)" }}
                        >
                          N/A
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium" style={{ color: "var(--text)" }}>
                          {book.title}
                        </p>
                        <p className="truncate text-[10px]" style={{ color: "var(--muted)" }}>
                          {book.author_name?.[0] ?? "Unknown Author"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* loading state */}
              {loading && (
                <div
                  className="absolute z-50 mt-1 w-full rounded-lg p-2 text-xs"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--ring)",
                    color: "var(--muted)",
                  }}
                >
                  Loading…
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* thin separator under header */}
      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent, var(--ring), transparent)",
        }}
      />
    </header>
  );
}