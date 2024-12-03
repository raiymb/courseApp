import { IUser } from "./IUser";
import { ICourse } from "./ICourse";

export interface IEnrollment {
  id: number;
  user: IUser; // Associated user object
  course: ICourse; // Associated course object
  progress: number; // Percentage of completion
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
