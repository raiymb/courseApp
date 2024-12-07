import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Quiz } from "./Quiz";
import { User } from "./User";

@Entity("quiz_submissions")
export class QuizSubmission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.submissions, { onDelete: "CASCADE" })
  quiz: Quiz;

  @ManyToOne(() => User, (user) => user.quizSubmissions, { onDelete: "CASCADE" })
  user: User;

  @Column("simple-json")
  answers: { questionId: number; answer: string }[]; // Array of question IDs and user answers

  @Column("decimal", { precision: 5, scale: 2, nullable: true })
  score: number; // Calculated score

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  calculateScore(): number {
    let score = 0;
    this.answers.forEach(answer => {
      const question = this.quiz.questions.find(q => q.id === answer.questionId);
      if (question && question.correctAnswer === answer.answer) {
        score += 1;
      }
    });
    this.score = (score / this.quiz.questions.length) * 100;
    return this.score;
  }
}