import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-20 h-20 mx-auto text-green-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-amber-100">
        Thank You for Your Order
      </h1>
      
      <p className="text-xl text-neutral-300 mb-6">
        Your order has been received and is being prepared for fulfillment.
      </p>

      <p className="text-lg text-neutral-400 mb-8 italic">
        He died for us; we live for Him.
      </p>

      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">What Happens Next?</h2>
        <ul className="text-left space-y-3 text-neutral-300 max-w-xl mx-auto">
          <li className="flex items-start">
            <span className="text-amber-700 mr-3 mt-1">✓</span>
            <span>You will receive an email confirmation shortly</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-700 mr-3 mt-1">✓</span>
            <span>Your order will be printed and prepared with care</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-700 mr-3 mt-1">✓</span>
            <span>Tracking information will be sent once shipped</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-700 mr-3 mt-1">✓</span>
            <span>Delivery typically takes 7-14 business days</span>
          </li>
        </ul>
      </div>

      <Link
        href="/products"
        className="inline-block bg-amber-700 hover:bg-amber-600 text-white px-8 py-3 rounded-md font-medium transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

