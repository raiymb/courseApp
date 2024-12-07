import { stripe } from "../config/payment";
import { AppDataSource } from "../config/db";
import { Payment } from "../models/Payment";
import { IPayment } from "../interfaces/IPayment";
import { UserService } from "./userService";

export class PaymentService {
  static async createStripePayment(
    userId: number,
    amount: number,
    currency: string,
    paymentMethodId: string
  ): Promise<IPayment> {
    try {
      // Step 1: Create Stripe PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe requires the amount in cents
        currency,
        payment_method: paymentMethodId,
        confirm: true,
      });

      // Step 2: Fetch User
      const user = await UserService.getUserById(userId);
      if (!user) throw new Error("User not found");

      // Step 3: Create Payment Entry in Database
      const paymentRepository = AppDataSource.getRepository(Payment);
      const paymentData: Partial<IPayment> = {
        amount,
        currency,
        paymentMethod: paymentIntent.payment_method_types[0],
        transactionId: paymentIntent.id,
        status: paymentIntent.status as "succeeded" | "failed" | "pending",
        user: user,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const payment = paymentRepository.create(paymentData);
      return await paymentRepository.save(payment);
    } catch (error) {
      console.error("Payment processing failed:", error);
      throw new Error("Payment processing failed");
    }
  }

  static async getPaymentsByUserId(userId: number): Promise<IPayment[]> {
    const paymentRepository = AppDataSource.getRepository(Payment);
    return await paymentRepository.find({ where: { user: { id: userId } } });
  }

  static async createPayment(paymentData: Partial<IPayment>): Promise<IPayment> {
    const paymentRepository = AppDataSource.getRepository(Payment);
    const payment = paymentRepository.create(paymentData);
    return await paymentRepository.save(payment);
  }
}
