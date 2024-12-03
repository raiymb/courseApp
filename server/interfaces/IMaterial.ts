export interface IMaterial {
    id: number;
    title: string;
    content: string; // Could be a URL or raw content
    type: "video" | "document" | "quiz"; // Types of materials
    courseId: number; // Foreign key linking to Course
    createdAt: Date;
    updatedAt: Date;
  }
  