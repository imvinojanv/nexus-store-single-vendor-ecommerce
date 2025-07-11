# Step-by-Step Prompts for Nexus Store (Part 2: Payment & Notification Integrations)

Hello Cursor,

We will now integrate the payment gateway and notification services into the e-commerce application built in Part 1. Please follow these prompts sequentially.

---

### **Step 1: Stripe Payment Gateway Integration**

**Prompt:**

"Integrate the Stripe payment gateway.

1.  Install the Stripe Node.js library: `npm install stripe`.
2.  Create a new file at `lib/stripe.ts` to initialize the Stripe client using the API secret key.
3.  Update the `.env.local` file with your Stripe API keys.

    ```env
    # .env.local

    # Stripe
    STRIPE_PUBLIC_KEY="pk_test_YOUR_PUBLIC_KEY"
    STRIPE_SECRET_KEY="sk_test_YOUR_SECRET_KEY"
    ```

4.  Create a new API route at `app/api/checkout_sessions/route.ts`. This route will be responsible for creating a Stripe Checkout Session.
5.  Inside this new route, create a `POST` handler that:
    -   Receives product and user details from the client.
    -   Transforms the cart items into the format required by the Stripe API (`line_items`).
    -   Creates a Stripe Checkout Session using `stripe.checkout.sessions.create()`.
    -   Includes the `orderId` in the session's `metadata` so we can identify it in the webhook.
    -   Returns the session ID to the client.
6.  Modify the "Proceed to Checkout" button on the checkout page (`app/(main)/checkout/page.tsx`). On click, it should now call this new API endpoint and then redirect the user to the Stripe Checkout page using the received session ID."

---

### **Step 2: Stripe Webhook for Order Confirmation**

**Prompt:**

"Create a Stripe webhook to handle successful payments.

1.  Create a new API route at `app/api/webhooks/stripe/route.ts`.
2.  Update the `.env.local` file with your Stripe Webhook Signing Secret.

    ```env
    # .env.local

    # Stripe Webhook
    STRIPE_WEBHOOK_SECRET="whsec_YOUR_WEBHOOK_SECRET"
    ```

3.  In the new webhook route, create a `POST` handler that:
    -   Verifies the request signature using `stripe.webhooks.constructEvent()` to ensure it's a genuine request from Stripe.
    -   Listens for the `checkout.session.completed` event.
    -   When this event is received, extract the `orderId` from the session's `metadata`.
    -   Update the corresponding order's `status` in the database from `PENDING` to `PROCESSING`.
    -   Return a 200 status to acknowledge receipt of the event."

---

### **Step 3: Mailgun Integration for Email Notifications**

**Prompt:**

"Integrate Mailgun to send transactional emails.

1.  Install the Mailgun client library: `npm install mailgun.js`.
2.  Create a new file at `lib/mailgun.ts`. Inside, configure the Mailgun client and create a helper function `sendOrderConfirmationEmail(order, user)`.
3.  Update the `.env.local` file with your Mailgun credentials.

    ```env
    # .env.local

    # Mailgun
    MAILGUN_API_KEY="YOUR_MAILGUN_API_KEY"
    MAILGUN_DOMAIN="YOUR_MAILGUN_DOMAIN"
    MAILGUN_FROM_EMAIL="orders@yourdomain.com"
    ```

4.  Modify the Stripe webhook handler at `api/webhooks/stripe/route.ts`. After successfully updating the order status to `PROCESSING`, call the `sendOrderConfirmationEmail` function to send a confirmation email to the customer."

---

### **Step 4: text.lk Integration for SMS Notifications**

**Prompt:**

"Integrate the text.lk API to send SMS notifications.

1.  Create a new file at `lib/textlk.ts`. Since there is no official library, create a helper function `sendSmsNotification(phoneNumber, message)` that uses `fetch` to make a `POST` request to the text.lk API endpoint.
2.  Update the `.env.local` file with your text.lk credentials.

    ```env
    # .env.local

    # text.lk SMS Service
    TEXTLK_API_KEY="YOUR_TEXTLK_API_KEY"
    TEXTLK_SENDER_ID="NexusStore"
    ```

3.  Modify the Stripe webhook handler at `app/api/webhooks/stripe/route.ts`. After successfully updating the order status and sending the confirmation email, call the `sendSmsNotification` function to send a confirmation SMS to the customer. You will need to ensure a phone number is collected during checkout to use this."
