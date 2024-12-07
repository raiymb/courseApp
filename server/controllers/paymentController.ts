import { Request, Response } from "express";
import { PaymentService } from "../services/paymentService";


export class PaymentController {
    static async createStripePayment(req: Request, res: Response): Promise<void> {
      try {
        const { userId, amount, currency, paymentMethodId } = req.body;
        const payment = await PaymentService.createStripePayment(userId, amount, currency, paymentMethodId);
        res.status(201).json(payment);
      } catch (error) {
        res.status(500).json({ message: "Error processing payment", error: (error as Error).message });
      }
    }
  
    static async getPaymentsByUserId(req: Request, res: Response): Promise<void> {
      try {
        const userId = parseInt(req.params.userId);
        const payments = await PaymentService.getPaymentsByUserId(userId);
        res.status(200).json(payments);
      } catch (error) {
        res.status(500).json({ message: "Error fetching payments", error: (error as Error).message });
      }
    }
  }
  