// src/components/ThemeToggle.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";

const KEY = "bf-theme";

const LIGHT = {
  "--bg": "#f8fafc",
  "--surface": "#ffffff",
  "--surface-rgb": "255,255,255",
  "--text": "#0f1724",
  "--muted": "#6b7280",
  "--ring": "#e6e7eb",
  "--accent": "#8E37EB",
  "--brand-600": "#6366f1",
  "--card-bg": "rgba(255, 255, 255, 0.6)",
  "--card-border": "#e6e7eb",
  "--input-bg": "rgba(255, 255, 255, 0.9)",
  "--input-border": "#e6e7eb",
  "--dropdown-bg": "rgba(255, 255, 255, 0.95)",
  "--skeleton": "rgba(0, 0, 0, 0.1)",
};

const DARK = {
  "--bg": "#071026",
  "--surface": "#0f1724",
  "--surface-rgb": "15,23,36",
  "--text": "#e6eef9",
  "--muted": "#9aa4b2",
  "--ring": "#1f2937",
  "--accent": "#8E37EB",
  "--brand-600": "#8E37EB",
  "--card-bg": "rgba(15, 23, 36, 0.6)",
  "--card-border": "#1f2937",
  "--input-bg": "rgba(15, 23, 36, 0.9)",
  "--input-border": "#1f2937",
  "--dropdown-bg": "rgba(15, 23, 36, 0.95)",
  "--skeleton": "rgba(255, 255, 255, 0.1)",
};

function applyTokens(theme) {
  const root = document.documentElement;
  const tokens = theme === "dark" ? DARK : LIGHT;
  Object.entries(tokens).forEach(([k, v]) => root.style.setProperty(k, v));
  root.setAttribute("data-theme", theme);
}

export default function ThemeToggle() {
  const initial = document.documentElement.dataset.theme ||
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const [theme, setTheme] = useState(initial);
  const [bumping, setBumping] = useState(false);
  const knobRef = useRef(null);

  // Apply tokens once on mount to ensure React matches inline boot
  useEffect(() => {
    applyTokens(theme);
  }, []); // only once (boot script already ran)

  // update tokens whenever theme state changes
  useEffect(() => {
    applyTokens(theme);
    localStorage.setItem(KEY, theme);
  }, [theme]);

  // storage sync across tabs
  useEffect(() => {
    function onStorage(e) {
      if (e.key === KEY) {
        const newTheme = e.newValue || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        setTheme(newTheme);
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // respond to system preference change only if user hasn't chosen (no KEY)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    function onPrefChange(e) {
      if (!localStorage.getItem(KEY)) {
        setTheme(e.matches ? "dark" : "light");
      }
    }
    if (mq.addEventListener) mq.addEventListener("change", onPrefChange);
    else mq.addListener(onPrefChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onPrefChange);
      else mq.removeListener(onPrefChange);
    };
  }, []);

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
    // bump animation: add a class quickly
    setBumping(true);
    window.setTimeout(() => setBumping(false), 340);
  }, [theme]);

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <button
      type="button"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      role="switch"
      aria-checked={theme === "dark"}
      onClick={toggle}
      onKeyDown={onKeyDown}
      className="relative inline-flex items-center rounded-full p-1 focus:outline-none"
      style={{
        width: 56,
        height: 32,
        background: 'var(--card-bg)',
        border: '1px solid var(--ring)',
        boxShadow: '0 6px 16px rgba(2,6,23,0.06)',
      }}
    >
      <span className="sr-only">{theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}</span>

      {/* Track highlight (subtle) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 999,
        pointerEvents: 'none',
        boxShadow: theme === "dark" ? 'inset 0 1px 0 rgba(255,255,255,0.02)' : 'inset 0 1px 0 rgba(0,0,0,0.03)'
      }} />

      {/* Knob */}
      <div
        ref={knobRef}
        className={`knob ${bumping ? 'knob--bump' : ''}`}
        style={{
          width: 24,
          height: 24,
          borderRadius: 999,
          background: 'var(--surface)',
          border: '1px solid var(--ring)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: theme === "dark" ? 'translateX(24px)' : 'translateX(0px)',
          transition: reduced ? 'none' : 'transform 260ms cubic-bezier(.2,.9,.3,1)',
          boxShadow: '0 6px 14px rgba(2,6,23,0.12)',
          zIndex: 2,
          position: 'relative'
        }}
      >
        {/* Sun icon (light) */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden style={{ position: 'absolute', opacity: theme === "dark" ? 0 : 1, transform: theme === "dark" ? 'scale(0.8)' : 'scale(1)', transition: reduced ? 'none' : 'all 220ms ease-in-out' }}>
          <circle cx="12" cy="12" r="3" fill="var(--accent)" />
          <g stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1v2M12 21v2M4.22 4.22 5.64 5.64M18.36 18.36 19.78 19.78M1 12h2M21 12h2M4.22 19.78 5.64 18.36M18.36 5.64 19.78 4.22" />
          </g>
        </svg>

        {/* Moon icon (dark) */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden style={{ position: 'absolute', opacity: theme === "dark" ? 1 : 0, transform: theme === "dark" ? 'scale(1)' : 'scale(0.8)', transition: reduced ? 'none' : 'all 220ms ease-in-out' }}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3c.06 0 .12 0 .19.01A7 7 0 0 0 21 12.79z" fill="var(--accent)" />
        </svg>
      </div>
    </button>
  );
}