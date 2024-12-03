import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Course } from "./Course";

@Entity("materials")
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "text" })
  content: string;

  @Column()
  type: "video" | "document" | "quiz";

  @Column()
  courseId: number; // Matches IMaterial

  @ManyToOne(() => Course, (course) => course.materials)
  course: Course;

  @CreateDateColumn()
  createdAt: Date; // Matches IMaterial

  @UpdateDateColumn()
  updatedAt: Date; // Matches IMaterial
}
