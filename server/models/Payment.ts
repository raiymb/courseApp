import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn  } from "typeorm";
import { User } from "./User";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  currency: string; // "USD", "EUR", etc.

  @Column()
  paymentMethod: string; // "card", "paypal", etc.

  @Column()
  transactionId: string; // External transaction ID

  @Column()
  status: string; // "success", "failed", "pending"

  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
