import { Course } from "./course.model";
import slugify from "slugify";
import { CreateCourseDTO } from "./types/index.types";
import { CourseMessages } from "../../constant/messages";
import createHttpError from "http-errors";

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

  async getAllCourses() {
    const courses = await Course.findAll({
      include: [
        { association: "category" },
        {
          association: "teacher",
          attributes: ["id", "mobile", "full_name", "avatar", "role"],
        },
      ],
      order: [["created_at", "DESC"]],
    });
    return courses;
  }

  async getCourseById(id: number) {
    const course = await Course.findOne({
      where: { id },
      include: [
        { association: "category" },
        {
          association: "teacher",
          attributes: ["id", "mobile", "full_name", "avatar", "role"],
        },
      ],
    });

    if (!course) {
      throw createHttpError.BadRequest(CourseMessages.COURSE_NOT_FOUND);
    }

    return course;
  }
}

export default new CourseService();
