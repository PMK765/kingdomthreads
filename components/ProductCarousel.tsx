"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/lib/products";

interface ProductCarouselProps {
  products: Product[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [products.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  if (products.length === 0) {
    return null;
  }

  const currentProduct = products[currentIndex];

  return (
    <div className="relative w-full max-w-6xl mx-auto py-16">
      <div className="relative h-[500px] bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-8">
            {currentProduct.imageUrl ? (
              <img
                src={currentProduct.imageUrl}
                alt={currentProduct.name}
                className="max-h-full max-w-full object-contain transition-all duration-700 transform hover:scale-105"
              />
            ) : (
              <div className="w-96 h-96 bg-neutral-800 rounded-lg flex items-center justify-center">
                <span className="text-neutral-600">Product Image</span>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white mb-2">
              {currentProduct.name}
            </h3>
            <p className="text-neutral-300 mb-4 line-clamp-2">
              {currentProduct.description}
            </p>
            <div className="flex items-center justify-center gap-4">
              <span className="text-2xl font-bold text-amber-400">
                ${(currentProduct.priceCents / 100).toFixed(2)}
              </span>
              <Link
                href={`/products/${currentProduct.slug}`}
                className="bg-amber-700 hover:bg-amber-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                View Product
              </Link>
            </div>
          </div>
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
          aria-label="Previous product"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
          aria-label="Next product"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {products.map((product, index) => (
          <button
            key={product.id}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-amber-700"
                : "w-2 bg-neutral-600 hover:bg-neutral-500"
            }`}
            aria-label={`Go to ${product.name}`}
          />
        ))}
      </div>
    </div>
  );
}

