import Stripe from "stripe";
import { config } from "./env";

export const stripe = new Stripe(config.paymentApiKey || "", {
  apiVersion: "2024-11-20.acacia", // Specify Stripe API version
});

export const processPayment = async (amount: number, currency: string, source: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects the amount in cents
      currency,
      payment_method: source,
      confirm: true, // Automatically confirm the payment
    });
    return paymentIntent;
  } catch (error) {
    console.error("Payment processing error:", error);
    throw new Error("Payment processing failed");
  }
};
