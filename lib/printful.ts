import { env } from "./env";

const PRINTFUL_BASE_URL = "https://api.printful.com";

interface PrintfulOrderItem {
  productId: string;
  variantId: string;
  quantity: number;
  retailPrice: number;
}

interface ShippingAddress {
  name: string;
  address1: string;
  city: string;
  stateCode: string;
  countryCode: string;
  zip: string;
  email: string;
}

export async function createPrintfulOrder(
  items: PrintfulOrderItem[],
  shipping: ShippingAddress
) {
  const response = await fetch(`${PRINTFUL_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.printfulApiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipient: {
        name: shipping.name,
        address1: shipping.address1,
        city: shipping.city,
        state_code: shipping.stateCode,
        country_code: shipping.countryCode,
        zip: shipping.zip,
        email: shipping.email,
      },
      items: items.map((item) => ({
        variant_id: item.variantId,
        quantity: item.quantity,
        retail_price: (item.retailPrice / 100).toFixed(2),
      })),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Printful API error: ${response.status} ${errorText}`);
  }

  return await response.json();
}

