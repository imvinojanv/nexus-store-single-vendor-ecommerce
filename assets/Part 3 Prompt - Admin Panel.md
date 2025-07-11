# Step-by-Step Prompts for Nexus Store (Part 3: Admin & Super Admin Panel)

Hello Cursor,

We will now build the admin and super admin functionalities for the e-commerce application. Please follow these prompts sequentially, using the existing codebase from Part 1 and 2.

---

### **Step 1: Create Admin Routes and Layout**

**Prompt:**

"Create the necessary files and folders for the admin dashboard.

1.  Create a new route group `(admin)` inside `app/`.
2.  Inside `(admin)`, create a new folder named `admin`.
3.  Inside `app/(admin)/admin/`, create the following file structure:
    -   `layout.tsx` (Admin root layout)
    -   `page.tsx` (Admin dashboard homepage)
    -   `products/page.tsx`
    -   `orders/page.tsx`
    -   `analytics/page.tsx`
    -   `users/page.tsx` (For Super Admin)

4.  In `app/(admin)/admin/layout.tsx`, create a basic layout component that includes a sidebar navigation component (`<AdminSidebar />`) and a main content area for the children. This layout should be a server component that fetches the user's session to verify their role before rendering."

---

### **Step 2: Implement Role-Based Route Protection**

**Prompt:**

"Update the middleware to protect the new admin routes.

1.  Open `middleware.ts`.
2.  Modify the logic to check for requests to the `/admin` path.
3.  If a user tries to access `/admin` or any of its sub-routes:
    -   Check if the user is authenticated.
    -   Check if the user's role is either `ADMIN` or `SUPER_ADMIN`.
    -   If either condition fails, redirect the user to the `/sign-in` page.
4.  Update the `matcher` in the config to include `'/admin/:path*'`.
"

---

### **Step 3: Build the Admin Sidebar Navigation**

**Prompt:**

"Create the `AdminSidebar` component.

1.  Create a new file at `components/features/admin/AdminSidebar.tsx`.
2.  This should be a client component that uses a `useSession()` hook to get the current user's role.
3.  The sidebar should contain navigation links (`<Link>`) for:
    -   Dashboard (`/admin`)
    -   Products (`/admin/products`)
    -   Orders (`/admin/orders`)
    -   Analytics (`/admin/analytics`)
4.  Conditionally render a 'Manage Users' link (`/admin/users`) that is **only visible** if the user's role is `SUPER_ADMIN`."

---

### **Step 4: Implement Product Management (CRUD)**

**Prompt:**

"Build the Product Management page.

1.  Go to `app/(admin)/admin/products/page.tsx`.
2.  Use Shadcn's `DataTable` component to display a list of all products from the database. Fetch the data on the server. The table should include columns for Image, Name, Price, and Stock.
3.  Add a button to 'Add New Product'. Clicking it should open a `Sheet` or `Dialog` containing a form.
4.  The form should use React Hook Form and Zod for validation to create/update a product. Since ImageKit integration is removed, the form should allow for entering image URLs directly as text inputs.
5.  For each row in the `DataTable`, add a `DropdownMenu` with 'Edit' and 'Delete' options.
6.  Create the necessary API endpoints in a new file `app/api/products/[productId]/route.ts` to handle `PUT` (update) and `DELETE` requests for a specific product."

---

### **Step 5: Implement Order Management & Notifications**

**Prompt:**

"Build the Order Management page and integrate notifications.

1.  Ensure the following variables are present in your `.env.local` file from Part 2:

    ```env
    # .env.local

    # Mailgun
    MAILGUN_API_KEY=
    MAILGUN_DOMAIN=
    MAILGUN_FROM_EMAIL=

    # text.lk SMS Service
    TEXTLK_API_KEY=
    TEXTLK_SENDER_ID=
    ```

2.  Go to `app/(admin)/admin/orders/page.tsx`.
3.  Use a `DataTable` to display all orders, including customer name, date, total amount, and status.
4.  In the 'Status' column for each order, render a `Select` component that allows an Admin or Super Admin to change the order status (e.g., from 'PROCESSING' to 'SHIPPED').
5.  When a status is changed, it should call a `PUT` request to a new API endpoint at `/api/orders/[orderId]/route.ts` to update the order in the database.
6.  After successfully updating the status in the API route, trigger the `sendOrderUpdateEmail` and `sendSmsNotification` helper functions (created in Part 2) to notify the customer of the change."

---

### **Step 6: Build the Analytics Dashboard**

**Prompt:**

"Build the Analytics Dashboard.

1.  Go to `app/(admin)/admin/analytics/page.tsx`.
2.  Create server-side logic to fetch and aggregate data for key metrics:
    -   Total revenue.
    -   Total orders.
    -   Number of new customers this month.
3.  Display these key metrics using Shadcn's `Card` component at the top of the page.
4.  Use Shadcn Charts to create at least two charts:
    -   A `BarChart` showing sales revenue over the last 7 days.
    -   A `LineChart` showing new user sign-ups over the last 30 days."

---

### **Step 7: Implement User Role Management (Super Admin Only)**

**Prompt:**

"Build the User Role Management page for the Super Admin.

1.  Go to `app/(admin)/admin/users/page.tsx`.
2.  First, add a server-side check at the top of the page component to verify if the current user's role is `SUPER_ADMIN`. If not, redirect them to `/admin`.
3.  Use a `DataTable` to display a list of all users, showing their Name, Email, and current Role.
4.  In the 'Role' column, add a `Select` component that allows the Super Admin to change a user's role (`USER`, `ADMIN`).
5.  Create a secure API endpoint at `/api/users/[userId]/role/route.ts` that handles `PUT` requests. This endpoint must verify that the request is coming from a `SUPER_ADMIN` before updating a user's role in the database."
