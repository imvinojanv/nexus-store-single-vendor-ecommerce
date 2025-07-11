# Prompt for Bolt AI App Builder: Build a Full-Stack E-Commerce Application (Part 1: Basic Application)

Hello Bolt,

Let's build the foundational first part of a production-ready, single-vendor e-commerce application. This prompt covers the core customer-facing store, allowing users to browse products, manage a cart, and place an order.

A key requirement is to **populate the product database by fetching data from the public API `https://dummyjson.com/products`**.

Please follow all instructions precisely.

## 1. Project Initialization & Core Technology

Project Name: **Nexus Store**

Initialize a new **Next.js 15** project using the **App Router**.

**Tech Stack:**
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **State Management:** React Redux & RTK Query
- **Forms:** React Hook Form with Zod for validation
- **Database ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** Better-Auth (with Google & Facebook providers)
- **SEO:** Advanced SEO with dynamic metadata, Open Graph, sitemap.xml, robots.txt
- **Deployment Platform:** Vercel

## 2. Environment Variables (.env.local)

Create a `.env.local` file in the root of the project with the following variables. These are essential for connecting to the database and enabling authentication.

```env
# Prisma / PostgreSQL
DATABASE_URL="postgresql://neondb_owner:npg_Im07LMREJDSw@ep-dry-fire-a1bnkgua-pooler.ap-southeast-1.aws.neon.tech/single-vendor?sslmode=require&channel_binding=require"

# Better-Auth
# Use `openssl rand -base64 32` in your terminal to generate a secret
NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth Provider
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

# Facebook OAuth Provider
FACEBOOK_CLIENT_ID="YOUR_FACEBOOK_CLIENT_ID"
FACEBOOK_CLIENT_SECRET="YOUR_FACEBOOK_CLIENT_SECRET"
```

## 3. Directory & File Structure

Create the project with the following folder structure. Note that this structure omits the admin, payment, and external service integrations, which will be built in later parts.

```
Nexus-Store/
├── 📁 app/
│   ├── 📁 (auth)/                # Route group for authentication pages
│   │   ├── 📁 sign-in/
│   │   │   └── 📄 page.tsx
│   │   └── 📁 sign-up/
│   │       └── 📄 page.tsx
│   ├── 📁 (main)/                # Route group for the main application
│   │   ├── 📁 account/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 cart/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 checkout/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 products/
│   │   │   ├── 📁 [productId]/
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📄 page.tsx
│   │   ├── 📄 layout.tsx           # Main application layout
│   │   └── 📄 page.tsx             # Home page
│   ├── 📁 api/                    # API routes
│   │   ├── 📁 auth/
│   │   │   └── 📁 [..better-auth]/  # Better-Auth routes
│   │   │       └── 📄 route.ts
│   │   ├── 📁 orders/
│   │   │   └── 📄 route.ts
│   │   └── 📁 products/
│   │       └── 📄 route.ts
│   ├── 📄 globals.css             # Global styles
│   └── 📄 layout.tsx              # Root layout
├── 📁 components/                 # Reusable UI components
│   ├── 📁 features/               # Components specific to a feature
│   │   ├── 📁 cart/
│   │   │   └── 📄 PopoverCart.tsx
│   │   └── 📁 products/
│   │       ├── 📄 ProductCard.tsx
│   │       └── 📄 ProductList.tsx
│   ├── 📁 forms/                  # Reusable form components with React Hook Form
│   ├── 📁 shared/                 # Components shared across multiple features
│   │   ├── 📄 Footer.tsx
│   │   └── 📄 Navbar.tsx
│   └── 📁 ui/                     # Shadcn UI components (e.g., Button, Card)
├── 📁 hooks/                    # Custom React hooks
│   └── 📄 use-debounce.ts
├── 📁 lib/                      # Libraries, helpers, and utilities
│   ├── 📄 auth.ts                  # Better-Auth configuration and Auth helpers functions
│   ├── 📄 prisma.ts                # Prisma client instance
│   └── 📄 utils.ts                 # General utility functions
├── 📁 prisma/                   # Prisma schema and migrations
│   ├── 📄 schema.prisma           # Your database schema
│   └── 📄 seed.ts                 # Feed data to the Database
├── 📁 public/                   # Static assets (images, fonts, etc.)
│   └── 📁 images/
├── 📁 services/                 # API service calls (using RTK Query)
│   ├── 📄 api.ts                   # Base API setup for RTK Query
│   ├── 📄 ordersApi.ts
│   └── 📄 productsApi.ts
├── 📁 store/                    # Redux Toolkit store and slices
│   ├── 📁 features/               # Redux slices for different features
│   ├── 📄 hooks.ts                 # Typed hooks for useDispatch and useSelector
│   └── 📄 store.ts                 # Redux store configuration
├── 📁 types/                    # TypeScript type definitions
│   └── 📄 index.ts
├── 📄 .env.local                 # Environment variables (local development)
├── 📄 .eslintrc.json
├── 📄 .gitignore
├── 📄 middleware.ts              # Auth middleware
├── 📄 next.config.mjs
├── 📄 package.json
├── 📄 postcss.config.js
├── 📄 prettier.config.js
├── 📄 tailwind.config.ts
└── 📄 tsconfig.json
```

## 4. Front-End UI Implementation from Figma Designs

**This is a top-priority instruction.** The front-end for the main application pages must be built to *exactly* match the provided Figma designs. Use the images attached with this prompt as the visual blueprint.

- **Home Page:** Implement the UI from `Home.png`.
- **Search/Product Listing Page:** Implement the UI from `Search.png`.
- **Product Details Page:** Implement the UI from `ProductDetails.png`.
- **Cart Page:** Implement the UI from `Cart.png`.
- **Checkout Page:** Implement the UI from `Checkout.png`.

For each page, analyze the layout, typography, colors, spacing, and component styles in the image and replicate it perfectly using **Shadcn UI components** and **Tailwind CSS**.

## 5. Database Setup (Prisma & PostgreSQL)

### 5.1. Prisma Schema

Create the `prisma/schema.prisma` file. The `Product` model has a `sourceId` field to store the original ID from the `dummyjson` API, which prevents duplicate entries when seeding.

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
  SUPER_ADMIN
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  role          Role      @default(USER)
  orders        Order[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Product {
  id                  String      @id @default(cuid())
  sourceId            Int         @unique // ID from dummyjson.com to prevent duplicates
  name                String      // from 'title'
  description         String      @db.Text
  category            String
  price               Float
  discountPercentage  Float
  stock               Int
  tags                String[]
  warrantyInformation String
  shippingInformation String
  availabilityStatus  String
  barcode             String      @unique
  qrCode              String
  images              String[]
  thumbnail           String
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt
  orderItems          OrderItem[]
}

model Order {
  id        String      @id @default(cuid())
  userId    String
  user      User        @relation(fields: [userId], references: [id])
  total     Float
  status    String      // e.g., PENDING, PROCESSING, SHIPPED, DELIVERED
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
  items     OrderItem[]
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
}

// Models for Better-Auth
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  @@unique([identifier, token])
}
```

### 5.2. Database Seeding from API

Create a `prisma/seed.ts` file. This script will fetch 100 products from `dummyjson.com` and use them to populate your database.

```typescript
// prisma/seed.ts
import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

// Define a type for the product structure from the API
interface ApiProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  stock: number;
  tags: string[];
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  meta: {
    barcode: string;
    qrCode: string;
    createdAt: string;
    updatedAt: string;
  };
  images: string[];
  thumbnail: string;
}

async function main() {
  console.log('Starting the seeding process...');

  // 1. Create a Super Admin user (for Part 2 & 3)
  const password = await hash('password123', 12);
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@example.com' },
    update: {},
    create: {
      email: 'superadmin@example.com',
      name: 'Super Admin',
      role: Role.SUPER_ADMIN,
    },
  });
  console.log('Super Admin user created/verified.');

  // 2. Fetch products from the public API
  console.log('Fetching products from dummyjson.com...');
  const response = await fetch('https://dummyjson.com/products?limit=100');
  if (!response.ok) {
    throw new Error('Failed to fetch products from API');
  }
  const { products }: { products: ApiProduct[] } = await response.json();
  console.log(`Fetched ${products.length} products.`);

  // 3. Seed the database with the fetched products
  console.log('Seeding products into the database...');
  for (const product of products) {
    await prisma.product.upsert({
      where: { sourceId: product.id }, // Use the API's ID to check for existing products
      update: {
        name: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        discountPercentage: product.discountPercentage,
        stock: product.stock,
        tags: product.tags,
        warrantyInformation: product.warrantyInformation,
        shippingInformation: product.shippingInformation,
        availabilityStatus: product.availabilityStatus,
        barcode: product.meta.barcode,
        qrCode: product.meta.qrCode,
        images: product.images,
        thumbnail: product.thumbnail,
        createdAt: new Date(product.meta.createdAt),
        updatedAt: new Date(product.meta.updatedAt),
      },
      create: {
        sourceId: product.id,
        name: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        discountPercentage: product.discountPercentage,
        stock: product.stock,
        tags: product.tags,
        warrantyInformation: product.warrantyInformation,
        shippingInformation: product.shippingInformation,
        availabilityStatus: product.availabilityStatus,
        barcode: product.meta.barcode,
        qrCode: product.meta.qrCode,
        images: product.images,
        thumbnail: product.thumbnail,
        createdAt: new Date(product.meta.createdAt),
        updatedAt: new Date(product.meta.updatedAt),
      },
    });
  }
  console.log('Product seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('An error occurred during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```
Add a `seed` script to `package.json`: `"prisma": { "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts" }`.

## 6. Authentication & Authorization

### 6.1. Setup Better-Auth

Configure Better-Auth in `lib/auth.ts`. Set up providers for Google and Facebook for user sign-up and sign-in.

### 6.2. Route Protection Middleware

Create `middleware.ts` to protect user-specific routes.
- `/account` and `/checkout` require an authenticated user.
- Redirect unauthenticated users to `/sign-in`.

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from 'your-auth-library'; // Placeholder

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSession({ req: request });

  if (pathname.startsWith('/account') || pathname.startsWith('/checkout')) {
    if (!session) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/checkout'],
};
```

## 7. Feature Implementation (Backend Logic)

- **Product Listing (`/products`):**
  - Fetch data using RTK Query.
  - Implement client-side filtering (by category) and sorting (by price, name).
- **Product Details (`/products/[productId]`):**
  - Use server-side rendering to fetch product data.
  - "Add to Cart" button should update the Redux store.
- **Shopping Cart (`/cart`):**
  - Manage state with a `cartSlice` in Redux Toolkit.
  - Allow users to modify item quantity and remove items from the cart.
  - Display subtotal and a "Proceed to Checkout" button.
- **Checkout (`/checkout`):**
  - A multi-step form for shipping information.
  - Use React Hook Form and a Zod schema for robust validation.
  - On submit, create an order record in the database with a `PENDING` status.

## 8. API and Service Integrations

### 8.1. API Routes (`app/api`)
- **`/api/products` [GET]:** Public API to fetch products for the listing page.
- **`/api/orders` [POST]:** Secure API for authenticated users to create a new order in the database.

### 8.2. Service Libraries (`lib`)
- This section will be expanded in Part 2. For now, it contains `auth.ts`, `prisma.ts`, and `utils.ts`.

## 9. SEO & Final Touches

- **Dynamic Metadata:** For product detail pages, dynamically generate page titles and descriptions based on the product data to improve SEO.
- **Sitemap:** Generate a `sitemap.xml` file to list all public pages.
- **Environment Variables:** Create a `.env.example` file listing all required environment variables.
- **UI/UX:** Ensure the entire application is responsive and provides a clean, modern user experience using Tailwind CSS and Shadcn UI components consistently.

Execute these steps sequentially to build the complete customer-facing application. Thank you, Bolt!
