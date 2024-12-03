import { stripe } from "../config/payment";
import { IPayment } from "../interfaces/IPayment";
import { getUserById } from "./userService";

export const processPayment = async (
  userId: number,
  amount: number,
  currency: string,
  paymentMethodId: string
): Promise<IPayment> => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      payment_method: paymentMethodId,
      confirm: true,
    });

    const user = await getUserById(userId); // Fetch user details
    if (!user) throw new Error("User not found");

    const now = new Date();

    return {
      id: paymentIntent.id,
      amount,
      currency,
      paymentMethod: paymentIntent.payment_method_types[0],
      transactionId: paymentIntent.id,
      status: paymentIntent.status as "succeeded" | "failed" | "pending",
      user: user, // Include full user object
      createdAt: now,
      updatedAt: now,
    };
  } catch (error) {
    throw new Error("Payment processing failed");
  }
};
