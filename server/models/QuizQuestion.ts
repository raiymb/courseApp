
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Quiz } from "./Quiz";

@Entity("quiz_questions")
export class QuizQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionText: string;

  @Column("simple-array")
  options: string[]; // Array of possible answers

  @Column()
  correctAnswer: string; // Correct answer from options

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, { onDelete: "CASCADE" })
  quiz: Quiz;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}