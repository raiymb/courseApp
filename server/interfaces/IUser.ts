export interface IUser {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: "student" | "instructor" | "admin";
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  