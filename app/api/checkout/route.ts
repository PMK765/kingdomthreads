import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { CartItem } from "@/components/cart/CartContext";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { items } = body as { items: CartItem[] };

  if (!items || !Array.isArray(items)) {
    return NextResponse.json(
      { error: "Invalid items array" },
      { status: 400 }
    );
  }

  const lineItems = items.map((item) => {
    const productName = item.size 
      ? `${item.name} - Size ${item.size}`
      : item.name;

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: productName,
        },
        unit_amount: item.priceCents,
      },
      quantity: item.quantity,
    };
  });

  const origin = req.headers.get("origin") || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cancel`,
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    metadata: {
      cart_items: JSON.stringify(items),
    },
  });

  return NextResponse.json({ url: session.url });
}
