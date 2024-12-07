
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Enrollment } from "./Enrollment";
import { Payment } from "./Payment";
import { Course } from "./Course";
import { QuizSubmission } from "./QuizSubmission";
import { LessonProgress } from "./LessonProgress";

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
  courses: Course[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments: Enrollment[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => QuizSubmission, (submission) => submission.user)
  quizSubmissions: QuizSubmission[];

  @OneToMany(() => LessonProgress, (progress) => progress.user)
  lessonProgress: LessonProgress[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
