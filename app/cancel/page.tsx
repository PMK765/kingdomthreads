import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-20 h-20 mx-auto text-neutral-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-neutral-200">
        Checkout Canceled
      </h1>
      
      <p className="text-xl text-neutral-400 mb-8">
        Your order was not completed. Your cart items are still saved if you would like to try again.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/products"
          className="inline-block bg-amber-700 hover:bg-amber-600 text-white px-8 py-3 rounded-md font-medium transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="inline-block border border-neutral-700 hover:border-neutral-600 text-neutral-300 hover:text-white px-8 py-3 rounded-md font-medium transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

