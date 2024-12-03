import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Enrollment } from "./Enrollment";
import { Payment } from "./Payment";
import { Course } from "./Course";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: "enum", enum: ["student", "instructor", "admin"], default: "student" })
  role: "student" | "instructor" | "admin";

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Course, (course) => course.instructor)
  courses: Course[]; // Relationship to courses taught by the user

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments: Enrollment[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
