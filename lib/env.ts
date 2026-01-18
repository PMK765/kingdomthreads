import { z } from "zod";

const envSchema = z.object({
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  PRINTFUL_API_TOKEN: z.string().min(1)
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = {
  stripeSecretKey: parsed.data.STRIPE_SECRET_KEY,
  stripePublishableKey: parsed.data.STRIPE_PUBLISHABLE_KEY,
  stripeWebhookSecret: parsed.data.STRIPE_WEBHOOK_SECRET,
  printfulApiToken: parsed.data.PRINTFUL_API_TOKEN
};

