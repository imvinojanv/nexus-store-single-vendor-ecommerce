## Part 1: Basic Application 🚀

These packages form the foundation of your application.

### Dependencies

```bash
npm install @reduxjs/toolkit react-redux react-hook-form zod @hookform/resolvers better-auth @prisma/client@latest lucide-react tailwindcss-animate
```

  - **`next`**: `15.3.5`
  - **`react`**: `18.3.1`
  - **`react-dom`**: `18.3.1`
  - **`@reduxjs/toolkit`**: `2.8.2`
  - **`react-redux`**: `9.2.0`
  - **`react-hook-form`**: `7.60.0`
  - **`zod`**: `4.0.2`
  - **`@hookform/resolvers`**: `5.1.1` (For Zod integration)
  - **`better-auth`**: `1.2.12` (Core of Better-Auth)
  - **`@prisma/client`**: `6.11.1`
  - **`lucide-react`**: `0.525.0` (Icons for Shadcn UI)
  - **`class-variance-authority`**: `0.7.0` (Shadcn UI utility)
  - **`clsx`**: `2.1.1` (Shadcn UI utility for class names)
  - **`tailwind-merge`**: `2.4.0` (Shadcn UI utility)
  - **`tailwindcss-animate`**: `1.0.7` (Shadcn UI utility)

### Dev Dependencies

```bash
npm install -D prisma@latest
```

  - **`typescript`**: `5.5.3`
  - **`@types/react`**: `18.3.3`
  - **`@types/node`**: `20.14.10`
  - **`tailwindcss`**: `4.1.11`
  - **`postcss`**: `8.4.39`
  - **`autoprefixer`**: `10.4.19`
  - **`prisma`**: `6.11.1` (CLI for migrations and generation)
  - **`eslint`**: `8.57.0`
  - **`eslint-config-next`**: `15.3.5`

-----

## Part 2: Payment & Notification Integrations 💳

These packages add payment processing and user notification capabilities.

### Dependencies

```bash
npm install stripe@latest mailgun.js
```

  - **`stripe`**: `18.3.0`
  - **`mailgun.js`**: `12.0.3`

-----

## Part 3: Admin Panel 📊

This package is for building the charts in your analytics dashboard.

### Dependencies

```bash
npm install recharts
```

  - **`recharts`**: `3.1.0` (The charting library used by Shadcn Charts)