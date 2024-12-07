
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Course } from "./Course";
import { Lesson } from "./Lesson";

@Entity("modules")
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Course, (course) => course.modules, { onDelete: "CASCADE" })
  course: Course;

  @OneToMany(() => Lesson, (lesson) => lesson.module)
  lessons: Lesson[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  calculateProgress(userId: number): number {
    const lessonsCompleted = this.lessons.filter(lesson => lesson.isCompletedByUser(userId)).length;
    return this.lessons.length ? (lessonsCompleted / this.lessons.length) * 100 : 0;
  }
}