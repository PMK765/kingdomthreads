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

export const products: Product[] = [
  {
    id: "tank-kingdom-001",
    slug: "mens-kingdom-tank",
    name: "Men's Kingdom Tank",
    description: "Soft, athletic cut with a bold proclamation.",
    priceCents: 2850,
    imageUrl: "/tank-placeholder.png",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    printfulVariants: {
      "XS": "696c1f053d4782",
      "S": "696c1f053d4832",
      "M": "696c1f053d48c6",
      "L": "696c1f053d4932",
      "XL": "696c1f053d49a1",
      "2XL": "696c1f053d4a06",
    },
  },
  {
    id: "2",
    slug: "empty-tomb-art-print",
    name: "Empty Tomb Art Print",
    description: "Museum-quality art print celebrating the resurrection. The tomb is empty; He is risen. A daily reminder of our victory in Christ.",
    priceCents: 2999,
    imageUrl: "/products/print.jpg",
    printfulProductId: "printful-prod-2",
    printfulVariantId: "printful-var-2",
  },
  {
    id: "3",
    slug: "holy-holy-holy-embroidered-hat",
    name: "Holy, Holy, Holy Embroidered Hat",
    description: "Elegantly embroidered cap with the threefold declaration of God's holiness. Wear your faith with humility and reverence.",
    priceCents: 2499,
    imageUrl: "/products/hat.jpg",
    printfulProductId: "printful-prod-3",
    printfulVariantId: "printful-var-3",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
