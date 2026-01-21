import { notFound } from "next/navigation";
import { getPrintfulProducts, getPrintfulProduct } from "@/lib/printful";
import { convertPrintfulProductToProduct, getProductBySlug } from "@/lib/products";
import { AddToCartSection } from "./AddToCartSection";

export async function generateStaticParams() {
  const printfulProducts = await getPrintfulProducts();
  const products = printfulProducts.map(convertPrintfulProductToProduct);
  
  return products.map((product) => ({
    slug: product.slug,
  }));
}

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  
  const printfulProducts = await getPrintfulProducts();
  const products = printfulProducts.map(convertPrintfulProductToProduct);
  const product = getProductBySlug(resolvedParams.slug, products);

  if (!product) {
    notFound();
  }

  const fullProduct = await getPrintfulProduct(product.printfulProductId!);
  const detailedProduct = convertPrintfulProductToProduct(fullProduct);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square bg-neutral-800 rounded-lg flex items-center justify-center overflow-hidden">
          {detailedProduct.imageUrl ? (
            <img 
              src={detailedProduct.imageUrl} 
              alt={detailedProduct.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-neutral-600">Product Image</span>
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4 text-amber-100">
            {detailedProduct.name}
          </h1>
          
          <div className="text-3xl font-bold mb-6 text-amber-100">
            ${(detailedProduct.priceCents / 100).toFixed(2)}
          </div>

          <p className="text-neutral-300 leading-relaxed mb-8">
            {detailedProduct.description}
          </p>

          <AddToCartSection product={detailedProduct} />

          <div className="mt-12 pt-8 border-t border-neutral-800">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <ul className="space-y-2 text-neutral-400">
              <li>Premium quality materials</li>
              <li>Print-on-demand fulfillment</li>
              <li>Ethically sourced and produced</li>
              <li>Made with reverence and care</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
