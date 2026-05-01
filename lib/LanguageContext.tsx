"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'
import en from '../public/locales/en.json'
import hi from '../public/locales/hi.json'
import te from '../public/locales/te.json'

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<string, Record<string, string>> = {
  en,
  hi,
  te,
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState('en')

  useEffect(() => {
    // Load language from localStorage on client side
    const saved = typeof window !== 'undefined' ? localStorage.getItem('language') : null
    if (saved && ['en', 'hi', 'te'].includes(saved)) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: string) => {
    if (['en', 'hi', 'te'].includes(lang)) {
      setLanguageState(lang)
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', lang)
      }
    }
  }

  const t = (key: string): string => {
    const trans = translations[language] || translations['en']
    return (trans as any)[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
