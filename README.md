# Kingdom of Heaven Threads

A reverent, Biblical apparel and art storefront built with modern web technologies.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Stripe Checkout** for secure payments
- **Printful API** for print-on-demand fulfillment
- **Deployed on Vercel**

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed
- Stripe account with test API keys
- Printful account with API token

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up environment variables by copying the example file:

```bash
cp .env.local.example .env.local
```

3. Update `.env.local` with your actual credentials:

```
STRIPE_SECRET_KEY=sk_test_your_actual_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key
STRIPE_WEBHOOK_SECRET=whsec_your_actual_secret
PRINTFUL_API_TOKEN=your_printful_api_token
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Environment Variables

This application requires the following environment variables:

- `STRIPE_SECRET_KEY` - Your Stripe secret key (test or live)
- `STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key (test or live)
- `STRIPE_WEBHOOK_SECRET` - Webhook secret for verifying Stripe events
- `PRINTFUL_API_TOKEN` - API token from your Printful account

All environment variables are validated at build time using Zod. The application will fail to start if any required variables are missing.

## Stripe Webhook Configuration

To receive order completion events from Stripe:

1. In your Stripe Dashboard, go to Developers → Webhooks
2. Add a webhook endpoint: `https://yourdomain.com/api/stripe-webhook`
3. Select event type: `checkout.session.completed`
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET` in `.env.local`

For local development, use the Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

## Printful Integration

The Printful integration is configured in `lib/printful.ts`. Products are automatically fetched from your Printful store:

1. Create and publish products in your Printful dashboard
2. Products will appear automatically in your storefront
3. When orders are placed, they're automatically submitted to Printful for fulfillment

## Project Structure

```
/app                 - Next.js App Router pages and layouts
/components          - React components (cart, UI elements)
/lib                 - Utilities (env validation, Stripe, Printful, products)
/public              - Static assets
```

## Deployment

This application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add all environment variables in the Vercel project settings
4. Deploy

Vercel will automatically detect Next.js and configure the build.

## Code Conventions

- No try/catch blocks (errors are handled with explicit conditionals)
- No inline code comments
- TypeScript strict mode enabled
- Tailwind CSS for all styling

## License

All rights reserved.
