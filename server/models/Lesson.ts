
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Module } from "./Module";
import { LessonProgress } from "./LessonProgress";

@Entity("lessons")
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "text" })
  content: string;

  @Column()
  order: number;

  @Column({ default: false })
  isUnlocked: boolean;

  @ManyToOne(() => Module, (module) => module.lessons, { onDelete: "CASCADE" })
  module: Module;

  @OneToMany(() => LessonProgress, (progress) => progress.lesson)
  progress: LessonProgress[];

  @Column({ type: "enum", enum: ["video", "text", "quiz"] })
  type: "video" | "text" | "quiz";

  @Column({ default: false })
  isPractical: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  isCompletedByUser(userId: number): boolean {
    return this.progress.some(progress => progress.user.id === userId && progress.isCompleted);
  }

  unlock(userId: number): void {
    // Logic to unlock this lesson based on prerequisites, e.g., previous lesson completion
    const previousLesson = this.module.lessons.find(l => l.order === this.order - 1);
    if (!previousLesson || previousLesson.isCompletedByUser(userId)) {
      this.isUnlocked = true;
    }
  }
}
