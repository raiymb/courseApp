import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Course } from "./Course";
import { IEnrollment } from "../interfaces/IEnrollment";

@Entity("enrollments")
export class Enrollment implements IEnrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.enrollments)
  user: User;

  @ManyToOne(() => Course, (course) => course.enrollments)
  course: Course;

  @Column({ default: 0 })
  progress: number;

  @Column({ default: false })
  isCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
