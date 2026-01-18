"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import { Product } from "@/lib/products";

interface AddToCartSectionProps {
  product: Product;
}

export function AddToCartSection({ product }: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(product.sizes ? "M" : undefined);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    const printfulVariantId = size && product.printfulVariants
      ? product.printfulVariants[size]
      : product.printfulVariantId;

    addItem({
      productId: product.id,
      name: product.name,
      quantity,
      priceCents: product.priceCents,
      size,
      printfulVariantId,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="space-y-6">
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <label htmlFor="size" className="block text-sm font-medium mb-2">
            Size
          </label>
          <select
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
          >
            {product.sizes.map((sizeOption) => (
              <option key={sizeOption} value={sizeOption}>
                {sizeOption}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium mb-2">
          Quantity
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-amber-700 hover:bg-amber-600 text-white py-4 rounded-md font-medium text-lg transition-colors"
      >
        {isAdded ? "Added to Cart!" : "Add to Cart"}
      </button>

      <button
        onClick={() => router.push("/products")}
        className="w-full border border-neutral-700 hover:border-neutral-600 text-neutral-300 hover:text-white py-3 rounded-md font-medium transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
}
