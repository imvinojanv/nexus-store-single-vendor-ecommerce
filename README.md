# Nexus Store 

### A Single Vendor E-commerce Application

![Nexus Store Banner](https://placehold.co/1200x628/111827/FFFFFF?text=Nexus%20Store&font=raleway)

**A modern, full-stack, single-vendor e-commerce platform built with Next.js, Prisma, and Stripe.**

This project is a portfolio-grade application showcasing a complete e-commerce solution, from a pixel-perfect user interface to a secure, role-based admin dashboard. It is architected for scalability, performance, and a superior developer experience.

---

## ✨ Features

The application is structured into three main parts, each building upon the last to create a complete platform.

### 🛍️ Part 1: Customer-Facing Store
- **Dynamic Product Catalog:** Browse, search, and filter a rich catalog of products.
- **Figma-Driven UI:** A beautiful, responsive user interface built from professional Figma designs using **Shadcn UI** and **Tailwind CSS**.
- **Advanced SEO:** Server-side rendering, dynamic metadata, and `sitemap.xml` for maximum search engine visibility.
- **User Authentication:** Secure sign-up and sign-in with email/password and social providers (Google, Facebook) via **Better-Auth**.
- **Persistent Shopping Cart:** Client-side cart management using **Redux Toolkit**.
- **Basic Checkout:** Users can place orders which are saved to the database with a "pending" status.

### 💳 Part 2: Payment & Notification Integrations
- **Secure Payment Processing:** Full integration with **Stripe** for handling online payments.
- **Automated Order Confirmation:** Webhooks listen for successful payments to automatically update order status.
- **Transactional Emails:** Customers receive order confirmation and shipping update emails via **Mailgun**.
- **SMS Notifications:** Real-time order status updates sent to customers via the **text.lk** SMS API.

### ⚙️ Part 3: Admin & Super Admin Panel
- **Role-Based Access Control (RBAC):** Secure dashboard accessible only to `ADMIN` and `SUPER_ADMIN` roles.
- **Product Management (CRUD):** A full interface for admins to create, read, update, and delete products.
- **Order Management:** A dashboard for admins to view all customer orders and update their fulfillment status.
- **Analytics Dashboard:** Visual charts from **Shadcn Charts** displaying key metrics like total revenue, order volume, and new customer acquisition.
- **User Management (Super Admin Exclusive):** A special interface for the store owner to manage user roles.

---

## 🛠️ Tech Stack

| Category          | Technology / Service                                                              |
| ----------------- | --------------------------------------------------------------------------------- |
| **Framework** | [Next.js](https://nextjs.org/) 15 (App Router)                                    |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)      |
| **State Mgt.** | [Redux Toolkit](https://redux-toolkit.js.org/), [RTK Query](https://redux-toolkit.js.org/rtk-query/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/)                                         |
| **ORM** | [Prisma](https://www.prisma.io/)                                                  |
| **Authentication**| [Better-Auth (NextAuth.js)](https://authjs.dev/)                                  |
| **Payments** | [Stripe](https://stripe.com/)                                                     |
| **Forms** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)           |
| **Email Service** | [Mailgun](https://www.mailgun.com/)                                               |
| **SMS Service** | [text.lk](https://text.lk/)                                                       |
| **Deployment** | [Vercel](https://vercel.com/)                                                     |

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/) database

### 1. Clone the Repository

```bash
git clone [https://github.com/imvinojanv/nexus-store-single-vendor-ecommerce.git](https://github.com/imvinojanv/nexus-store-single-vendor-ecommerce.git)
cd nexus-store
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project by copying the example file:

```bash
cp .env.example .env.local
```

Now, open `.env.local` and fill in the required credentials for your database, authentication providers, and third-party services.

### 4. Set Up the Database

Run the Prisma migrations to set up your database schema, then seed the database with the initial product data from the `dummyjson.com` API.

```bash
# Apply database schema
npx prisma migrate dev

# Seed the database
npx prisma db seed
```

### 5. Run the Development Server

You are now ready to start the development server.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## ☁️ Deployment

This application is optimized for deployment on [Vercel](https://vercel.com/). Simply connect your GitHub repository to Vercel and configure the environment variables in the project settings. Vercel will automatically build and deploy your application.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

**Nexus Store** - Created with ❤️ [imvinojanv](https://imvinojanv.dev/) - Colombo, Sri Lanka.
