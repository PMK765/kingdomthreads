import Stripe from "stripe";
import { createPrintfulOrder } from "./printful";
import { CartItem } from "@/components/cart/CartContext";

export async function fulfillOrderWithPrintful(session: Stripe.Checkout.Session) {
  const customerEmail = session.customer_details?.email;
  const customerName = session.customer_details?.name;
  const shippingDetails = (session as any).shipping_details;

  if (!customerEmail || !customerName || !shippingDetails) {
    console.error("Missing customer or shipping details");
    return;
  }

  const cartItemsMetadata = session.metadata?.cart_items;
  if (!cartItemsMetadata) {
    console.error("No cart items in session metadata");
    return;
  }

  const cartItems: CartItem[] = JSON.parse(cartItemsMetadata);

  const printfulItems = cartItems.map((item) => {
    const variantId = item.printfulVariantId;
    if (!variantId) {
      throw new Error(`Missing Printful variant ID for item: ${item.name}`);
    }

    return {
      productId: item.productId,
      variantId: variantId,
      quantity: item.quantity,
      retailPrice: item.priceCents,
    };
  });

  const address = shippingDetails.address;
  if (!address) {
    throw new Error("Missing shipping address");
  }

  const shippingInfo = {
    name: shippingDetails.name || customerName,
    address1: address.line1 || "",
    city: address.city || "",
    stateCode: address.state || "",
    countryCode: address.country || "",
    zip: address.postal_code || "",
    email: customerEmail,
  };

  const result = await createPrintfulOrder(printfulItems, shippingInfo);
  
  console.log("Printful order created:", result);
}
