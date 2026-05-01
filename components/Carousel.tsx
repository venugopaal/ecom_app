"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CarouselItem {
  id: string
  title: string
  description: string
  image: string
  discount: string
  link: string
}

export default function Carousel({ items }: { items: CarouselItem[] }) {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!autoPlay || !mounted) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoPlay, items.length, mounted])

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length)
    setAutoPlay(false)
  }

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % items.length)
    setAutoPlay(false)
  }

  const goToSlide = (index: number) => {
    setCurrent(index)
    setAutoPlay(false)
  }

  return (
    <div className="relative w-full bg-neutral-900 rounded-lg overflow-hidden group">
      {/* Main Carousel */}
      <div className="relative aspect-video overflow-hidden">
        {items.map((item, index) => (
          <Link
            key={item.id}
            href={item.link}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              priority={index === current}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-end">
              <div className="w-full p-6 sm:p-8 text-white">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-200">{item.description}</p>
                  </div>
                  {item.discount && (
                    <div className="bg-red-600 text-white px-3 py-2 rounded-lg font-bold text-lg sm:text-xl whitespace-nowrap ml-4">
                      {item.discount}
                    </div>
                  )}
                </div>
                <button className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm sm:text-base">
                  Shop Now
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        onMouseEnter={() => setAutoPlay(false)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        onMouseEnter={() => setAutoPlay(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4 z-10 text-xs bg-black/50 text-white px-3 py-1 rounded-full">
        {current + 1} / {items.length}
      </div>
    </div>
  )
}
