import Stripe from "stripe";

export const stripe = new Stripe( "sk_test_51QSBylAxJ5UlJPNP4UxhH5hGao1YQ6oPuJoJjBsxSyurahAu1raNaSZZGDETzz8aAS75oOO2m2GTCxVaMqILHZsv00aC6LSxPy", {
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
