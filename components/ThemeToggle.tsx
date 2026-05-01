"use client"
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  // Start with null so we don't read window/localStorage during initial render
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null)

  // Initialize theme after mount
  useEffect(() => {
    try {
      const saved = (localStorage.getItem('theme') as 'light' | 'dark' | null)
      const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const initial = saved || (prefersDark ? 'dark' : 'light')
      setTheme(initial)
    } catch (e) {
      // If accessing localStorage fails, fall back to light
      setTheme('light')
    }
  }, [])

  // Apply theme when it changes
  useEffect(() => {
    if (!theme) return
    try {
      document.documentElement.classList.toggle('dark', theme === 'dark')
      localStorage.setItem('theme', theme)
    } catch (e) {
      // ignore
    }
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="px-2 py-1 border rounded"
      aria-pressed={theme === 'dark'}
    >
      {theme === null ? '☀️' : theme === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}
