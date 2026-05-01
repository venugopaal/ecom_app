import en from '../public/locales/en.json'
import hi from '../public/locales/hi.json'
import te from '../public/locales/te.json'

const translations: Record<string, Record<string, string>> = {
  en,
  hi,
  te,
}

export function getTranslation(lang: string, key: string): string {
  const t = translations[lang] || translations['en']
  return (t as any)[key] || key
}

export function getLanguages() {
  return ['en', 'hi', 'te']
}
