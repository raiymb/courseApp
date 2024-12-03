import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Material } from "./Material";
import { Enrollment } from "./Enrollment";
import { User } from "./User";

@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ default: false })
  isPublished: boolean;

  @ManyToOne(() => User, (user) => user.courses, { eager: true, onDelete: "CASCADE" })
  instructor: User;

  @OneToMany(() => Material, (material) => material.course)
  materials: Material[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
