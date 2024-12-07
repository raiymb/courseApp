import { User } from "../models/User";

export interface IPayment {
  id: number;
  amount: number;
  currency: string;
  paymentMethod: string;
  transactionId: string;
  status: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
