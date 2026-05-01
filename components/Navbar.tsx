"use client"
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useMemo, useState, useEffect } from 'react'

export default function Navbar() {
  const cartItems = useSelector((s: RootState) => s.cart)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const cartCount = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-neutral-950 dark:border-neutral-800 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">E</div>
            <span>Shop</span>
          </Link>

          {/* Right side nav */}
          <nav className="flex items-center gap-6 sm:gap-8">
            <LanguageSwitcher />
            <ThemeToggle />
            
            {/* Cart Icon */}
            <Link 
              href="/cart" 
              className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              aria-label="Shopping cart"
            >
              <svg className="w-6 h-6 text-neutral-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              
              {mounted && (
                <span className={`absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1 -translate-y-1 bg-red-600 rounded-full min-w-5 transition-opacity ${cartCount > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
