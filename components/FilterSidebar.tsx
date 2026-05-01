"use client"
import { useState } from 'react'
import Link from 'next/link'

interface FilterSidebarProps {
  category: string
  categories: string[]
  minPrice: number
  maxPrice: number
  minRating: number
}

export default function FilterSidebar({ 
  category, 
  categories, 
  minPrice, 
  maxPrice, 
  minRating 
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </span>
          <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* Sidebar - Desktop and Mobile */}
      <aside className={`
        ${isOpen ? 'block' : 'hidden'} lg:block
        fixed lg:static 
        inset-0 lg:inset-auto 
        z-40 lg:z-auto
        bg-black/50 lg:bg-transparent
        lg:col-span-1
      `}>
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 right-4 z-50 bg-white dark:bg-neutral-900 rounded-full p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 sticky top-20 space-y-6 max-h-[calc(100vh-100px)] overflow-y-auto lg:max-h-none">
          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">Categories</h3>
            <nav className="space-y-2">
              <Link 
                href="/" 
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  !category 
                    ? 'bg-blue-600 text-white font-medium' 
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                All Products
              </Link>
              {categories.map((c: string) => {
                let href = `/?category=${encodeURIComponent(c)}`
                if (minPrice > 0 || maxPrice < 1000) {
                  href += `&minPrice=${minPrice}&maxPrice=${maxPrice}`
                }
                if (minRating > 0) {
                  href += `&minRating=${minRating}`
                }
                return (
                  <Link
                    key={c}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      category === c
                        ? 'bg-blue-600 text-white font-medium'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {c}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Price Range Filter */}
          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4 uppercase tracking-wide">Price Range</h4>
            <div className="space-y-2">
              <PriceFilterLink label="Under $50" value={50} minPrice={minPrice} maxPrice={maxPrice} category={category} onSelect={() => setIsOpen(false)} />
              <PriceFilterLink label="$50 - $100" min={50} max={100} minPrice={minPrice} maxPrice={maxPrice} category={category} onSelect={() => setIsOpen(false)} />
              <PriceFilterLink label="$100 - $200" min={100} max={200} minPrice={minPrice} maxPrice={maxPrice} category={category} onSelect={() => setIsOpen(false)} />
              <PriceFilterLink label="Over $200" min={200} minPrice={minPrice} maxPrice={maxPrice} category={category} onSelect={() => setIsOpen(false)} />
              {(minPrice > 0 || maxPrice < 1000) && (
                <Link 
                  href={category ? `/?category=${encodeURIComponent(category)}` : "/"} 
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Clear Price Filter
                </Link>
              )}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4 uppercase tracking-wide">Rating</h4>
            <div className="space-y-2">
              <RatingFilterLink label="4★ & up" rating={4} minRating={minRating} category={category} minPrice={minPrice} maxPrice={maxPrice} onSelect={() => setIsOpen(false)} />
              <RatingFilterLink label="3★ & up" rating={3} minRating={minRating} category={category} minPrice={minPrice} maxPrice={maxPrice} onSelect={() => setIsOpen(false)} />
              <RatingFilterLink label="2★ & up" rating={2} minRating={minRating} category={category} minPrice={minPrice} maxPrice={maxPrice} onSelect={() => setIsOpen(false)} />
              <RatingFilterLink label="1★ & up" rating={1} minRating={minRating} category={category} minPrice={minPrice} maxPrice={maxPrice} onSelect={() => setIsOpen(false)} />
              {minRating > 0 && (
                <Link 
                  href={category ? `/?category=${encodeURIComponent(category)}${minPrice > 0 || maxPrice < 1000 ? `&minPrice=${minPrice}&maxPrice=${maxPrice}` : ''}` : "/"} 
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Clear Rating Filter
                </Link>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

// Helper component for price filters
function PriceFilterLink({ 
  label, 
  min = 0, 
  max = 1000,
  value,
  minPrice,
  maxPrice,
  category,
  onSelect
}: { 
  label: string
  min?: number
  max?: number
  value?: number
  minPrice: number
  maxPrice: number
  category: string
  onSelect: () => void
}) {
  const filterMax = value || max
  const isActive = minPrice === min && maxPrice === filterMax
  
  let href = `/?minPrice=${min}&maxPrice=${filterMax}`
  if (category) {
    href += `&category=${encodeURIComponent(category)}`
  }
  
  return (
    <Link 
      href={href}
      onClick={onSelect}
      className={`flex items-center gap-2 p-2 rounded transition-colors ${
        isActive
          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
      }`}
    >
      <span className={`w-4 h-4 border rounded ${isActive ? 'bg-blue-600' : 'border-neutral-300 dark:border-neutral-600'}`} />
      <span className="text-sm">{label}</span>
    </Link>
  )
}

// Helper component for rating filters
function RatingFilterLink({ 
  label, 
  rating,
  minRating,
  category,
  minPrice,
  maxPrice,
  onSelect
}: { 
  label: string
  rating: number
  minRating: number
  category: string
  minPrice: number
  maxPrice: number
  onSelect: () => void
}) {
  const isActive = minRating === rating
  
  let href = `/?minRating=${rating}`
  if (category) {
    href += `&category=${encodeURIComponent(category)}`
  }
  if (minPrice > 0 || maxPrice < 1000) {
    href += `&minPrice=${minPrice}&maxPrice=${maxPrice}`
  }
  
  return (
    <Link 
      href={href}
      onClick={onSelect}
      className={`flex items-center gap-2 p-2 rounded transition-colors ${
        isActive
          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
      }`}
    >
      <span className={`w-4 h-4 border rounded ${isActive ? 'bg-blue-600' : 'border-neutral-300 dark:border-neutral-600'}`} />
      <span className="text-sm">{label}</span>
    </Link>
  )
}
