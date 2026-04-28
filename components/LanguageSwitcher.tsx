"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LanguageSwitcher() {
  const router = useRouter()
  const [lang, setLang] = useState('en')

  const change = (l: string) => {
    setLang(l)
    // naive: navigate to root with locale as query param for demo
    router.push(`/?lang=${l}`)
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => change('en')} className={`px-2 ${lang==='en'? 'font-semibold':''}`}>EN</button>
      <button onClick={() => change('hi')} className={`px-2 ${lang==='hi'? 'font-semibold':''}`}>HI</button>
      <button onClick={() => change('te')} className={`px-2 ${lang==='te'? 'font-semibold':''}`}>TE</button>
    </div>
  )
}
