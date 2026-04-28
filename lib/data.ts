import products from '../data/products.json';

export async function getProducts() {
  // Simulate async fetch
  return products;
}

export async function getProductById(id: string) {
  return products.find((p) => p.id === id) ?? null;
}

export async function getCategories() {
  const set = new Set(products.map((p) => p.category));
  return Array.from(set);
}
