import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Course } from "./Course";
import { QuizQuestion } from "./QuizQuestion";
import { QuizSubmission } from "./QuizSubmission";

@Entity("quizzes")
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "text" })
  description: string;

  @ManyToOne(() => Course, (course) => course.quizzes, { onDelete: "CASCADE" })
  course: Course;

  @OneToMany(() => QuizQuestion, (question) => question.quiz)
  questions: QuizQuestion[];

  @OneToMany(() => QuizSubmission, (submission) => submission.quiz)
  submissions: QuizSubmission[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
