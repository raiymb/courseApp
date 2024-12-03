import { IUser } from "./IUser";

export interface IPayment {
  id: string; // Changed to string
  amount: number;
  currency: string;
  paymentMethod: "card" | "paypal" | string; // Made more flexible
  transactionId: string;
  status: "succeeded" | "failed" | "pending";
  user: IUser; // Reference to the full user object
  createdAt: Date;
  updatedAt: Date;
}
