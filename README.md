# ShreeRatna — Indian Heritage Jewelry E-Commerce

A full-stack e-commerce platform for authentic Indian heritage jewelry, featuring regional designs from Rajasthan, Bengal, South India, Maharashtra, and more.

**Live Demo:** [shreeratna.netlify.app](https://shreeratna.netlify.app)

## Tech Stack

**Frontend:** React 18, Vite 5, Tailwind CSS 3, GSAP, Swiper  
**State Management:** Zustand, TanStack React Query  
**Backend:** Supabase (Auth, PostgreSQL, Row Level Security, Storage)  
**Payments:** Razorpay  
**Deployment:** Netlify

## Features

- Product catalog with category & region filters (Diamond, Gold, Silver)
- GSAP-powered animations — parallax, staggered reveals, 3D card effects
- Razorpay checkout integration
- Supabase Auth (Email/Password, Google OAuth)
- Cart, Wishlist, Orders with real-time sync
- Profile management & order tracking
- Responsive, mobile-first design

## Project Structure

```
src/
├── components/
│   ├── features/     # ProductCard, SearchBar, etc.
│   ├── layout/       # Navbar, Footer
│   └── ui/           # Reusable UI components
├── lib/              # Supabase client
├── pages/            # Route pages
└── store/            # Zustand stores (Auth, Cart, Wishlist)
```

## Getting Started

```bash
git clone https://github.com/yourusername/shreeratna.git
cd shreeratna
npm install
cp .env.example .env   # Add your Supabase & Razorpay keys
npm run dev
```

### Database Setup

Run these SQL files in your [Supabase](https://supabase.com) SQL Editor:

1. `supabase/schema.sql` — Tables, indexes, RLS policies
2. `supabase/storage.sql` — Storage buckets
3. `supabase/seed.sql` — Sample product data

## Scripts

```bash
npm run dev       # Dev server
npm run build     # Production build
npm run preview   # Preview build
npm run lint      # ESLint
```

## Deployment

Push to GitHub → Import in [Netlify](https://netlify.com) → Add environment variables → Deploy.

## License

MIT
