import { Course } from "./course.model";
import slugify from "slugify";

interface CreateCourseDTO {
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

class CourseService {
  async createCourse(data: CreateCourseDTO) {
    const slug = slugify(data.title, {
      lower: true,
      strict: true,
    });

    const exists = await Course.findOne({ where: { slug } });
    if (exists) {
      throw new Error("Course with this title already exists");
    }

    const course = await Course.create({
      title: data.title,
      slug,
      description: data.description,
      price: data.price,
      discount: data.discount ?? null,
      thumbnail: data.thumbnail ?? null,
      level: data.level,
      duration: data.duration,
      category_id: data.category_id,
      teacher_id: data.teacher_id,
      status: "draft",
    });

    return course;
  }
}

export default new CourseService();