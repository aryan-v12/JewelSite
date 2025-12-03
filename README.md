# 💎 Jewel Elegance - Luxury Indian Jewelry E-Commerce

A stunning, production-ready e-commerce platform for luxury Indian jewelry, featuring authentic regional designs from Rajasthan, Bengal, South India, and Maharashtra.

## ✨ Features

### 🛍️ Shopping Experience
- **Product Catalog** - Browse Diamond, Gold, and Silver jewelry with advanced filtering
- **Product Details** - Zoom-enabled image galleries, detailed specifications
- **Shopping Cart** - Real-time cart with quantity management
- **Wishlist** - Save favorite pieces for later
- **Checkout** - Razorpay payment integration

### 🎨 Design & Animations
- **GSAP Animations** - Smooth parallax, staggered reveals, 3D card effects
- **Responsive Design** - Mobile-first approach with elegant breakpoints
- **Luxury Theme** - Custom gold/purple/rose color palette with metallic gradients

### 🔐 User Features
- **Authentication** - Email/password and Google OAuth via Supabase
- **Profile Management** - Edit user details, view order history
- **Order Tracking** - Real-time order status updates

## 🚀 Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 18, Vite 5 |
| Styling | Tailwind CSS 3 |
| Animations | GSAP (GreenSock) |
| State Management | Zustand |
| Database & Auth | Supabase |
| Payments | Razorpay |
| Routing | React Router 6 |
| Icons | Lucide React |

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/jewel-elegance.git
   cd jewel-elegance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Fill in your Supabase and Razorpay credentials in `.env`

4. **Set up Supabase database**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Run the SQL files in order:
     1. `supabase/schema.sql` - Database tables and RLS policies
     2. `supabase/storage.sql` - Storage buckets
     3. `supabase/seed.sql` - Sample product data

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🗂️ Project Structure

```
src/
├── components/
│   ├── features/     # Feature components (ProductCard, SearchBar, etc.)
│   ├── layout/       # Layout components (Navbar, Footer)
│   └── ui/           # Reusable UI components (Button, Loader)
├── lib/              # Supabase client & utilities
├── pages/            # Page components
└── store/            # Zustand state stores
```

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Gold | `#D4AF37` | Primary brand color |
| Purple | `#4A148C` | Accent color |
| Rose Gold | `#B76E79` | Secondary accent |
| Cream | `#FFF8F0` | Background |
| Charcoal | `#2C2C2C` | Text |
| Brown | `#3E2723` | Dark text |

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, featured products, categories |
| Shop | `/shop` | Product grid with filters |
| Product | `/product/:id` | Product details and gallery |
| Cart | `/cart` | Shopping cart |
| Checkout | `/checkout` | Address and payment |
| Wishlist | `/wishlist` | Saved products |
| Profile | `/profile` | User dashboard |
| Orders | `/orders` | Order history |
| About | `/about` | Company story |
| Contact | `/contact` | Contact form |

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Manual Build
```bash
npm run build
# Deploy contents of `dist/` folder
```

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

Built with ❤️ for jewelry lovers everywhere
