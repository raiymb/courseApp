import { IMaterial } from "./IMaterial";
import { IEnrollment } from "./IEnrollment";
import { IUser } from "./IUser";

export interface ICourse {
  id: number;
  title: string;
  description: string;
  isPublished: boolean;
  instructor: IUser; // Replace instructorId with instructor object
  materials?: IMaterial[];
  enrollments?: IEnrollment[];
  createdAt: Date;
  updatedAt: Date;
}
