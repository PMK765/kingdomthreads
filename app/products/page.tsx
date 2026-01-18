import Link from "next/link";
import { products } from "@/lib/products";

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-amber-100">Our Collection</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group"
          >
            <div className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-amber-700 transition-all">
              <div className="aspect-square bg-neutral-800 flex items-center justify-center">
                <span className="text-neutral-600 text-sm">Product Image</span>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-amber-200 transition-colors">
                  {product.name}
                </h2>
                <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-100">
                    ${(product.priceCents / 100).toFixed(2)}
                  </span>
                  <span className="text-amber-700 group-hover:text-amber-500 transition-colors">
                    View Details →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

