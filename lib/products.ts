export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string;
  printfulProductId?: string;
  printfulVariantId?: string;
  sizes?: string[];
  printfulVariants?: Record<string, string>;
}

export function getProductBySlug(slug: string, products: Product[]): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string, products: Product[]): Product | undefined {
  return products.find((p) => p.id === id);
}

export function convertPrintfulProductToProduct(printfulProduct: any): Product {
  const syncProduct = printfulProduct.sync_product || printfulProduct;
  const syncVariants = printfulProduct.sync_variants || [];
  
  const sizes: string[] = [];
  const printfulVariants: Record<string, string> = {};
  
  syncVariants.forEach((variant: any) => {
    const sizeName = variant.name?.split(" - ").pop()?.trim() || variant.size || "";
    if (sizeName && variant.id) {
      sizes.push(sizeName);
      printfulVariants[sizeName] = variant.id.toString();
    }
  });
  
  let imageUrl = "";
  if (syncVariants.length > 0) {
    const firstVariant = syncVariants[0];
    if (firstVariant.files && Array.isArray(firstVariant.files)) {
      const previewFile = firstVariant.files.find((f: any) => f.type === "preview");
      imageUrl = previewFile?.preview_url || previewFile?.thumbnail_url || "";
    }
  }
  
  if (!imageUrl && syncProduct.thumbnail_url) {
    imageUrl = syncProduct.thumbnail_url;
  }
  
  const firstVariant = syncVariants[0];
  let retailPrice = 0;
  if (firstVariant?.retail_price) {
    const priceStr = typeof firstVariant.retail_price === 'string' 
      ? firstVariant.retail_price 
      : firstVariant.retail_price.toString();
    retailPrice = Math.round(parseFloat(priceStr) * 100);
  }
  
  return {
    id: syncProduct.id?.toString() || "unknown",
    slug: (syncProduct.name || "product").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: syncProduct.name || "Product",
    description: syncProduct.name || "Product",
    priceCents: retailPrice,
    imageUrl: imageUrl || "https://via.placeholder.com/400x400/1a1a1a/d4af37?text=Product",
    printfulProductId: syncProduct.id?.toString(),
    sizes: sizes.length > 0 ? sizes : undefined,
    printfulVariants: sizes.length > 0 ? printfulVariants : undefined,
  };
}
