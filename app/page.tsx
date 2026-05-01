import { getProducts, getCategories } from "../lib/data";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import Link from "next/link";

// Disable static generation for this page since it uses dynamic searchParams
export const dynamic = 'force-dynamic'

type Props = { searchParams?: { [key: string]: string | string[] | undefined } };

export default async function Home({ searchParams }: Props) {
  const products = await getProducts();
  const categories = await getCategories();
  
  // Await searchParams since it's a Promise with force-dynamic
  const params = await searchParams;

  const q = typeof params?.q === 'string' ? params.q.toLowerCase() : ''
  const category = typeof params?.category === 'string' ? params.category : ''
  const minPrice = typeof params?.minPrice === 'string' ? parseFloat(params.minPrice) : 0
  const maxPrice = typeof params?.maxPrice === 'string' ? parseFloat(params.maxPrice) : 1000
  const minRating = typeof params?.minRating === 'string' ? parseFloat(params.minRating) : 0

  const filtered = products.filter((p: any) => {
    if (category && p.category !== category) return false
    if (q && !(p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))) return false
    if (p.price < minPrice || p.price > maxPrice) return false
    if (p.ratings < minRating) return false
    return true
  })

  return (
    <>
      {/* Hero Section */}
      {!q && !category && (
        <section className="bg-linear-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to Shop</h1>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl">Discover amazing products at unbeatable prices. Shop with confidence and enjoy fast shipping.</p>
            <Link href="/" className="inline-block bg-white hover:bg-blue-50 text-blue-600 font-bold py-3 px-6 rounded-lg transition-colors">
              Explore Now
            </Link>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              {q ? `Search Results for "${q}"` : category ? `${category}` : 'Featured Products'}
            </h2>
            <form action="/" className="w-full sm:w-auto flex gap-2">
              <input 
                name="q" 
                placeholder="Search products..." 
                defaultValue={q}
                className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600" 
              />
              <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors whitespace-nowrap">
                Search
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar 
            category={category}
            categories={categories}
            minPrice={minPrice}
            maxPrice={maxPrice}
            minRating={minRating}
          />

          {/* Products Grid */}
          <section className="lg:col-span-3">
            {filtered.length === 0 ? (
              <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 p-12 text-center">
                <svg className="w-16 h-16 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">No products found</h3>
                <p className="text-neutral-600 dark:text-neutral-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p: any) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  )
}
