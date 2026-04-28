# Ecom App (Demo)

This is a demo production-ready e-commerce starter built with Next.js App Router and TypeScript.

Features included:
- SSR product listing and product detail pages
- Category filtering and search (via query params)
- Cart using Redux Toolkit with localStorage persistence
- Mock API routes under /app/api (products, categories, auth, cart)
- Theme (light/dark) toggle and system preference detection
- Basic multilingual JSON files (EN/HI/TE) and language switcher (demo)
- Tailwind CSS for styling

Quick start

1. Install dependencies

```bash
npm install --legacy-peer-deps
```

2. Run development server

```bash
npm run dev
```

Notes & next steps
- Add real i18n integration (next-intl/next-i18next) when compatible with your Next version.
- Add product images to `public/images/products/` (currently referenced in mock data).
- Improve auth with real JWT or OAuth flows.
- Add tests and CI config.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
