import { Course } from "./course.model";
import slugify from "slugify";
import { CreateCourseDTO, UpdateCourseDTO } from "./types/index.types";
import { CourseMessages } from "../../constant/messages";
import createHttpError from "http-errors";
import { Lesson } from "../lession/lesson.model";
import Capture from "../capture/capture.model";

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

  async updateCourse(id: number, data: UpdateCourseDTO) {
    const course = await Course.findByPk(id);
    if (!course) {
      throw createHttpError.NotFound(CourseMessages.COURSE_NOT_FOUND);
    }

    if (data.title && data.title !== course.title) {
      const slug = slugify(data.title, { lower: true, strict: true });
      const exists = await Course.findOne({ where: { slug, id: { $ne: id } } });
      if (exists) {
        throw createHttpError.Conflict(CourseMessages.COURSE_ALREADY_EXISTS);
      }
      course.slug = slug;
    }

    course.title = data.title ?? course.title;
    course.description = data.description ?? course.description;
    course.price = data.price ?? course.price;
    course.discount = data.discount ?? course.discount;
    course.thumbnail = data.thumbnail ?? course.thumbnail;
    course.level = data.level ?? course.level;
    course.duration = data.duration ?? course.duration;
    course.category_id = data.category_id ?? course.category_id;
    course.status = data.status ?? course.status;

    await course.save();

    return course;
  }

  async deleteCourse(id: number) {
    const course = await Course.findByPk(id);
    if (!course) {
      throw createHttpError.NotFound(CourseMessages.COURSE_NOT_FOUND);
    }

    await Lesson.destroy({ where: { courseId: id } });

    await Capture.destroy({ where: { courseId: id } });

    await course.destroy();

    return { message: CourseMessages.COURSE_DELETED_SUCCESSFULLY };
  }
}

export default new CourseService();
