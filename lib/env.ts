import { z } from "zod";

const envSchema = z.object({
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  PRINTFUL_API_TOKEN: z.string().min(1)
});

const isBuildTime = process.env.NEXT_PHASE === "phase-production-build" || process.env.NODE_ENV === undefined;

let parsedEnv: z.infer<typeof envSchema>;

if (isBuildTime) {
  parsedEnv = {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "build-time-placeholder",
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || "build-time-placeholder",
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || "build-time-placeholder",
    PRINTFUL_API_TOKEN: process.env.PRINTFUL_API_TOKEN || "build-time-placeholder",
  };
} else {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  parsedEnv = parsed.data;
}

export const env = {
  stripeSecretKey: parsedEnv.STRIPE_SECRET_KEY,
  stripePublishableKey: parsedEnv.STRIPE_PUBLISHABLE_KEY,
  stripeWebhookSecret: parsedEnv.STRIPE_WEBHOOK_SECRET,
  printfulApiToken: parsedEnv.PRINTFUL_API_TOKEN
};
