import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Material } from "./Material";
import { Enrollment } from "./Enrollment";
import { User } from "./User";
import { Module } from "./Module";
import { Quiz } from "./Quiz";
import { ICourse } from "../interfaces/ICourse";

@Entity("courses")
export class Course implements ICourse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column()
  mainPhoto: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column()
  durationHours: number;

  @Column({ type: "text", nullable: true })
  additionalInfo: string;

  @Column({ default: false })
  isPublished: boolean;

  @Column("simple-array")
  categories: string[];

  @Column("simple-array")
  tags: string[];

  @ManyToOne(() => User, (user) => user.courses, { eager: true, onDelete: "CASCADE" })
  instructor: User;

  @OneToMany(() => Material, (material) => material.course)
  materials: Material[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];

  @OneToMany(() => Module, (module) => module.course)
  modules: Module[];

  @OneToMany(() => Quiz, (quiz) => quiz.course)
  quizzes: Quiz[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  calculateProgress(userId: number): number {
    const enrollment = this.enrollments.find(e => e.user.id === userId);
    if (!enrollment) return 0;

    const totalLessons = this.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedLessons = this.modules.reduce(
      (acc, module) => acc + module.lessons.filter(lesson => lesson.isCompletedByUser(userId)).length,
      0
    );

    return totalLessons ? (completedLessons / totalLessons) * 100 : 0;
  }
}