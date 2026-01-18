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
    const session = event.data.object;
    await fulfillOrderWithPrintful(session);
  }

  return NextResponse.json({ received: true });
}

