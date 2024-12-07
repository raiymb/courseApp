import { Router } from "express";
import { PaymentController } from "../controllers/paymentController";
import { authMiddleware } from "../middlewares/authMiddleware";

const paymentRouter = Router();

paymentRouter.post("/payments", authMiddleware, PaymentController.createStripePayment);
paymentRouter.get("/payments/user/:userId", authMiddleware, PaymentController.getPaymentsByUserId);

export default paymentRouter;