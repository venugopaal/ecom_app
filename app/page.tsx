"use server"
import { getProducts, getCategories } from "../lib/data";
import ProductCard from "../components/ProductCard";

type Props = { searchParams?: { [key: string]: string | string[] | undefined } };

export default async function Home({ searchParams }: Props) {
  const products = await getProducts();
  const categories = await getCategories();

  const q = typeof searchParams?.q === 'string' ? searchParams.q.toLowerCase() : ''
  const category = typeof searchParams?.category === 'string' ? searchParams.category : ''

  const filtered = products.filter((p: any) => {
    if (category && p.category !== category) return false
    if (q && !(p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))) return false
    return true
  })

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Products</h1>
        <div className="flex gap-2">
          <form action="/" className="">
            <input name="q" placeholder="Search" className="border px-2 py-1" />
            <button className="ml-2 px-3 py-1 border">Search</button>
          </form>
        </div>
      </div>

      <div className="flex gap-4">
        <aside className="w-56">
          <div className="mb-2 font-medium">Categories</div>
          <ul>
            <li><a href="/">All</a></li>
            {categories.map((c: string) => (
              <li key={c}><a href={`/?category=${encodeURIComponent(c)}`}>{c}</a></li>
            ))}
          </ul>
        </aside>
        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>
      </div>
    </div>
  )
}
