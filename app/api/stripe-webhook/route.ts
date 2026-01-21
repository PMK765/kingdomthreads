import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { fulfillOrderWithPrintful } from "@/lib/fulfillment";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 }
    );
  }

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    env.stripeWebhookSecret
  );

  if (event.type === "checkout.session.completed") {
    const sessionFromEvent = event.data.object;
    
    const fullSession = await stripe.checkout.sessions.retrieve(
      sessionFromEvent.id,
      {
        expand: ["line_items", "shipping_cost", "customer"],
      }
    );
    
    await fulfillOrderWithPrintful(fullSession);
  }

  return NextResponse.json({ received: true });
}
