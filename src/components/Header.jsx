// src/components/Header.jsx
import { useMemo, useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle.jsx";
// Option A (using assets helper)
import assets from "../assets/assets.js";
// Option B (direct import) – uncomment next line and remove assets import above if you prefer
// import logo from "../assets/logo.png";

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
  // ---- controlled/uncontrolled value -----------------------------------------------------------
  const isControlled = useMemo(() => value != null || query != null, [value, query]);
  const [internalValue, setInternalValue] = useState("");
  const displayValue = isControlled ? (value ?? query ?? "") : internalValue;

  // ---- instant search + dropdown ---------------------------------------------------------------
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const debounceTimer = useRef(null);
  const dropdownRef = useRef(null);

  const fire = (fn, v) => fn?.({ target: { value: v } }, v);

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
        <div className="container mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
          {/* ── Top row: Logo (left) + Theme toggle (right) ───────────────────────────── */}
          <div className="py-3 md:py-4 flex items-center justify-between">
            {/* Logo only (no boxed icon, no text) */}
            <a
              href="/"
              className="inline-flex items-center"
              aria-label="Book Finder — Home"
              title="Book Finder"
            >
              <img
                src={assets.logo /* or: logo */}
                alt="Book Finder logo"
                // scale the same “lockup” feel as your reference image
                className="
                  block w-auto select-none pointer-events-none
                  h-8 xs:h-9 sm:h-10 md:h-11 lg:h-12 xl:h-14
                "
                draggable={false}
                // no ring, no box — just the image
                style={{
                  filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.03))",
                }}
              />
              {/* Provide accessible name but no visible text */}
              <span className="sr-only">Book Finder</span>
            </a>

            {/* Right: small badge (optional) + theme toggle */}
            <div className="flex items-center gap-3">
            
              <div className="relative z-50">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* ── Search bar below ─────────────────────────────────────────────────────── */}
          <div className="pb-3">
            <form
              onSubmit={handleSubmit}
              ref={dropdownRef}
              role="search"
              aria-label="Search books"
              className="mt-3 relative"
            >
              <div className="relative">
                {/* search icon */}
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" style={{ color: "var(--muted)" }}>
                    <path
                      fill="currentColor"
                      d="M15.8 14.4h.9l5 5a1 1 0 1 1-1.4 1.4l-5-5v-.9l-.3-.3a7 7 0 1 1 1.4-1.4l.4.2ZM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
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
                  className="w-full h-11 md:h-12 rounded-2xl pr-24 pl-10 text-[0.95rem]"
                  style={{
                    background: "var(--input-bg)",
                    color: "var(--text)",
                    border: "1px solid var(--input-border)",
                  }}
                />

                {/* clear + submit */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {String(displayValue || "").length > 0 && (
                    <button
                      type="button"
                      onClick={handleClear}
                      aria-label="Clear search"
                      className="rounded-xl p-2"
                      style={{
                        background: "var(--card-bg)",
                        border: "1px solid var(--ring)",
                      }}
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" style={{ color: "var(--muted)" }}>
                        <path
                          fill="currentColor"
                          d="M6.225 4.811 4.811 6.225 9.586 11l-4.775 4.775 1.414 1.414L11 12.414l4.775 4.775 1.414-1.414L12.414 11l4.775-4.775-1.414-1.414L11 9.586 6.225 4.811Z"
                        />
                      </svg>
                    </button>
                  )}

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold"
                    aria-label="Search"
                    style={{
                      color: "#fff",
                      background: "linear-gradient(90deg,var(--brand-600),#8b3fe4)",
                      boxShadow: "0 8px 20px rgba(99,102,241,0.12)",
                      border: "none",
                    }}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4">
                      <path
                        fill="currentColor"
                        d="M15.8 14.4h.9l5 5a1 1 0 1 1-1.4 1.4l-5-5v-.9l-.3-.3a7 7 0 1 1 1.4-1.4l.4.2ZM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
                      />
                    </svg>
                    <span className="hidden sm:inline">Search</span>
                  </button>
                </div>
              </div>

              {/* dropdown results */}
              {showDropdown && results.length > 0 && (
                <div
                  className="absolute z-50 mt-2 w-full rounded-xl shadow-lg max-h-80 overflow-y-auto"
                  style={{ background: "var(--dropdown-bg)", border: "1px solid var(--ring)" }}
                >
                  {results.map((book, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-[rgba(var(--surface-rgb),0.98)] cursor-pointer"
                    >
                      {book.cover_i ? (
                        <img
                          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
                          alt={book.title}
                          className="h-10 w-7 object-cover rounded shadow-sm"
                        />
                      ) : (
                        <div
                          className="h-10 w-7 rounded flex items-center justify-center text-[10px]"
                          style={{ background: "var(--bg)", color: "var(--muted)" }}
                        >
                          N/A
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium" style={{ color: "var(--text)" }}>
                          {book.title}
                        </p>
                        <p className="truncate text-xs" style={{ color: "var(--muted)" }}>
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
                  className="absolute z-50 mt-2 w-full rounded-xl p-3 text-sm"
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
