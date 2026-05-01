"use client"
import { useLanguage } from '../lib/LanguageContext'
import { useEffect, useState } from 'react'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // On server render, show a placeholder button structure to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
        <button className="px-3 py-1 rounded transition-colors text-sm font-medium text-neutral-700 dark:text-neutral-300">EN</button>
        <button className="px-3 py-1 rounded transition-colors text-sm font-medium text-neutral-700 dark:text-neutral-300">HI</button>
        <button className="px-3 py-1 rounded transition-colors text-sm font-medium text-neutral-700 dark:text-neutral-300">TE</button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
      <button 
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded transition-colors text-sm font-medium ${
          language === 'en' 
            ? 'bg-blue-600 text-white' 
            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
        }`}
      >
        EN
      </button>
      <button 
        onClick={() => setLanguage('hi')}
        className={`px-3 py-1 rounded transition-colors text-sm font-medium ${
          language === 'hi' 
            ? 'bg-blue-600 text-white' 
            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
        }`}
      >
        HI
      </button>
      <button 
        onClick={() => setLanguage('te')}
        className={`px-3 py-1 rounded transition-colors text-sm font-medium ${
          language === 'te' 
            ? 'bg-blue-600 text-white' 
            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
        }`}
      >
        TE
      </button>
    </div>
  )
}