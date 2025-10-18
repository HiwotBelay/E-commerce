## E‑commerce (Next.js + Prisma + Stripe)

A full‑stack e‑commerce web application with authentication, cart/checkout, orders, and Stripe payments. Built with Next.js App Router, React 19, TypeScript, Prisma ORM, PostgreSQL, Tailwind CSS, and a modern component system.............

### ✨ Highlights
- **Modern stack**: Next.js 15 (App Router), React 19, TypeScript
- **Auth**: NextAuth (Google OAuth + credentials)
- **Data**: Prisma + PostgreSQL
- **Payments**: Stripe (Payment Intents + webhook)
- **UI/UX**: Tailwind CSS, shadcn/radix UI components, dark mode
- **Forms & Validation**: React Hook Form + Zod
- **State & UX**: Cart context/provider, toasts, dialogs, skeletons, carousels
- **Production-ready**: Environment-based config, Prisma client reuse, type-safe APIs

---

## Table of Contents
- Tech Stack
- Features
- Project Structure
- Data Model
- API Overview
- Auth Flow
- Payments Flow
- Getting Started
- Environment Variables
- Scripts
- Deployment Notes
- Contributing
- License

---

## Tech Stack

- **Framework**: Next.js 15 (`app/` router), React 19, TypeScript
- **Styling**: Tailwind CSS, `tailwindcss-animate`, `clsx`, `class-variance-authority`
- **UI Components**: Radix UI primitives (accordion, dialog, dropdown, toast, etc.), shadcn-style components in `components/ui/*`
- **Forms & Validation**: React Hook Form, Zod, `@hookform/resolvers`
- **Auth**: NextAuth (Google provider + credentials), `@auth/prisma-adapter`
- **Database**: PostgreSQL, Prisma ORM
- **Payments**: Stripe (PaymentIntents API + webhook)
- **Email**: Nodemailer (dependency present; not yet wired in flows)
- **Charts/Carousel**: Recharts, Embla carousel
- **Misc**: `date-fns`, `lucide-react`, `sonner` toasts, `react-day-picker`, `react-resizable-panels`

Dev tooling:
- TypeScript 5, `@types/*`
- Tailwind 3, PostCSS
- Prisma Client codegen on install/build

---

## Features

- **Product browsing**
  - Product grid and detail pages
  - Image galleries, features, specifications, colors
  - Pricing with optional original price

- **Cart**
  - Add/update/remove items
  - Cart persisted server-side per user
  - Cart UI with item quantity management

- **Checkout & Orders**
  - Create orders with subtotal, shipping, tax, and total
  - Stripe Payment Intent creation from order
  - Stripe webhook updates order status

- **Authentication**
  - Credential-based login (email/password)
  - Google OAuth
  - Custom sign-in page at `/login`
  - Session strategy: JWT, user id injected into session

- **Account Area**
  - Dashboard, Orders, Profile pages under `/account/*`

- **UI/UX**
  - Responsive layout, theme switcher (light/dark)
  - Dialogs, toasts, skeletons, carousels, charts
  - Accessible components via Radix

---

## Project Structure

- `app/`
  - `page.tsx`: Home
  - `product/[id]/page.tsx`: Product details
  - `cart/page.tsx`: Cart page
  - `checkout/page.tsx`: Checkout
  - `checkout/success/page.tsx`: Success page
  - `account/*/page.tsx`: Dashboard, Orders, Profile
  - `api/*`: Route handlers (Next.js API)
    - `auth/[...nextauth]/route.ts`: NextAuth handlers
    - `auth/register/route.ts`: User registration
    - `products/`: List + detail
    - `cart/`: Add, remove, update
    - `orders/`: Create/list + `[id]`
    - `payment/create-intent/route.ts`: Stripe Payment Intent
    - `webhook/stripe/route.ts`: Stripe webhook
- `components/`: UI and feature components
  - `ui/*`: shadcn/radix components
  - `cart-*`, `product-*`, forms, header/footer
- `hooks/`: `use-toast`, `use-mobile`
- `lib/`:
  - `auth.ts`: NextAuth config and handlers
  - `db.ts`: Prisma client singleton
  - `utils.ts`: Utilities
- `prisma/schema.prisma`: Data model

---

## Data Model (Prisma)

- `User`: email, password (nullable for OAuth), relations to `Cart`, `Order`, NextAuth `Account`, `Session`
- `Product`: name, description, price, originalPrice?, images[], features[], specifications (JSON), colors (JSON), stock flags
- `Cart` / `CartItem`: one cart per user, items with quantity and product relation
- `Order` / `OrderItem`: subtotal, shipping, tax, total, status, optional `paymentIntentId`

Order status lifecycle example:
- `PENDING` (initial) → `PROCESSING` (Stripe `payment_intent.succeeded`) → `SHIPPED`/`DELIVERED` (future ops) → `CANCELLED`/`PAYMENT_FAILED`

---

## API Overview

Base: Next.js Route Handlers in `app/api/*`. Selected endpoints:

- `POST /api/auth/[...nextauth]` – Auth (NextAuth)
- `POST /api/auth/register` – Create account (credentials)
- `GET /api/products` – List products
- `GET /api/products/:id` – Get product
- `GET /api/cart` – Get current user cart
- `POST /api/cart/add` – Add item
- `PATCH /api/cart/update` – Update item qty
- `DELETE /api/cart/remove` – Remove item
- `GET /api/orders` – List user orders
- `POST /api/orders` – Create order
- `GET /api/orders/:id` – Get order by id
- `POST /api/payment/create-intent` – Create Stripe PaymentIntent for an order
- `POST /api/webhook/stripe` – Stripe webhook (updates order status)

Notes:
- All user-specific endpoints require auth (JWT session).
- `create-intent` validates ownership of the target order.
- Webhook verifies signature and updates order status accordingly.

---

## Auth Flow

- NextAuth configured in `lib/auth.ts` with:
  - Providers: Google OAuth, Credentials
  - Adapter: PrismaAdapter (stores accounts/sessions)
  - Session callback injects `user.id` into `session.user.id`
  - Custom sign-in page at `/login`
  - Session strategy: `jwt`
- Credentials flow:
  - Lookup user by email
  - `bcrypt` password compare
  - On success, returns minimal user object

---

## Payments Flow (Stripe)

- Client triggers `POST /api/payment/create-intent` with `orderId`
- Server:
  - Authenticates user (must own the order)
  - Creates PaymentIntent using `order.total` in cents
  - Saves `paymentIntentId` on `Order`
  - Returns `clientSecret` for client confirmation
- Webhook (`/api/webhook/stripe`):
  - Verifies signature with `STRIPE_WEBHOOK_SECRET`
  - On `payment_intent.succeeded`: sets order `status = PROCESSING`
  - On `payment_intent.payment_failed`: sets order `status = PAYMENT_FAILED`

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Stripe account and webhook signing secret
- Google OAuth client (optional if you only want credentials)

### Setup

1) Install dependencies
```bash
pnpm install
# or npm install
```

2) Environment variables: create `.env` at project root
```bash
# Database
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret

# OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

3) Generate Prisma client and apply schema
```bash
npx prisma generate
npx prisma migrate dev --name init
```

4) Run the app
```bash
pnpm dev
# or npm run dev
```

5) Stripe webhook (local)
```bash
stripe listen --forward-to http://localhost:3000/api/webhook/stripe
```
Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

---

## Scripts

- `dev`: Start Next.js dev server
- `build`: `prisma generate && next build`
- `start`: Start production server
- `postinstall`: `prisma generate`
- `vercel-build`: Vercel-compatible build

---


## Deployment Notes

- Ensure all env vars are set in hosting provider (Vercel, Render, etc.)
- Use a managed Postgres (e.g., Neon, Supabase, RDS)
- Configure Stripe webhook for production URL
- Run `prisma migrate deploy` on CI/CD

---

## Contributing

1) Fork and create a feature branch
2) Keep PRs focused and well‑scoped
3) Ensure TypeScript, lint, and build pass

