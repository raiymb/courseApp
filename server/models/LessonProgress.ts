
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Lesson } from "./Lesson";

@Entity("lesson_progress")
export class LessonProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.lessonProgress, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Lesson, (lesson) => lesson.progress, { onDelete: "CASCADE" })
  lesson: Lesson;

  @Column({ default: false })
  isCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
