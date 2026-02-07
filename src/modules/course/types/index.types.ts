export interface ICourse {
  id?: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  discount?: number | null;
  thumbnail?: string | null;
  level: "beginner" | "intermediate" | "advanced";
  status: "draft" | "published";
  duration: number; // minutes
  teacher_id: number;
  category_id: number;
  created_at?: Date;
}

export interface CreateCourseDTO {
  title: string;
  description: string;
  price: number;
  discount?: number | null;
  thumbnail?: string | null;
  level: "beginner" | "intermediate" | "advanced";
  duration: number;
  category_id: number;
  teacher_id: number;
}

export interface UpdateCourseDTO {
  title?: string;
  description?: string;
  price?: number;
  discount?: number | null;
  thumbnail?: string | null;
  level?: "beginner" | "intermediate" | "advanced";
  duration?: number;
  category_id?: number;
  status?: "draft" | "published";
}
