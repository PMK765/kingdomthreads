import Stripe from "stripe";
import { env } from "./env";

export const stripe = new Stripe(env.stripeSecretKey, {
  apiVersion: "2025-01-27.acacia",
  typescript: true,
});

