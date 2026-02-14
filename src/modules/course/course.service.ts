import { Course } from "./entities/course.model";
import slugify from "slugify";
import { CreateCourseDTO, UpdateCourseDTO } from "./types/index.types";
import { CourseMessages } from "../../constant/messages";
import createHttpError from "http-errors";
import { Lesson } from "../lession/lesson.model";
import Capture from "../capture/capture.model";
import { CourseBookmark } from "./entities/course-bookmarks.model";
import {
  ReactionResult,
  ToggleBookmarkResult,
} from "../blog/types/index.types";
import { CourseReaction } from "./entities/course-likes.model";
import { col, fn, Op, where } from "sequelize";

interface GetAllCoursesParams {
  search?: string;
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest";
}

interface PaginatedCourses {
  total: number;
  totalPages: number;
  page: number;
  limit: number;
  sort: string;
  courses: any[];
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

  async getAllCourses({
    search = "",
    page = 1,
    limit = 10,
    sort = "newest",
  }: GetAllCoursesParams = {}): Promise<PaginatedCourses> {
    const offset = (page - 1) * limit;

    const result = await Course.findAndCountAll({
      where: search
        ? {
            [Op.or]: ["title", "description"].map((field) =>
              where(fn("LOWER", col(field)), {
                [Op.like]: `%${search.toLowerCase()}%`,
              }),
            ),
          }
        : {},
      order: [["created_at", sort === "newest" ? "DESC" : "ASC"]],
      limit,
      offset,
      distinct: true,
      include: [
        {
          association: "usersWhoBookmarked",
          attributes: ["id"],
          through: { attributes: [] },
        },
        {
          association: "courseReactions",
          attributes: ["id", "isLike"],
        },
      ],
    });

    const courses = result.rows.map((c: any) => {
      const course = c.toJSON();

      // تعداد bookmark
      course.bookmarkCount = course.usersWhoBookmarked?.length || 0;
      delete course.usersWhoBookmarked;

      // تعداد like
      course.likeCount =
        course.courseReactions?.filter((r: any) => r.isLike).length || 0;
      delete course.courseReactions;

      return course;
    });

    return {
      total: result.count,
      totalPages: Math.ceil(result.count / limit),
      page,
      limit,
      sort,
      courses,
    };
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

  async likeOrDislike(
    courseId: number,
    userId: number,
    isLike: boolean,
  ): Promise<ReactionResult> {
    if (isNaN(courseId)) {
      throw createHttpError.BadRequest(CourseMessages.INVALID_COURSE_ID);
    }

    if (typeof isLike !== "boolean") {
      throw createHttpError.BadRequest(CourseMessages.INVALID_REACTION);
    }

    const course = await Course.findByPk(courseId);
    if (!course) {
      throw createHttpError.NotFound(CourseMessages.COURSE_REACTION_NOT_FOUND);
    }

    const existingReaction = await CourseReaction.findOne({
      where: { courseId, userId },
    });

    if (existingReaction) {
      if (existingReaction.isLike === isLike) {
        await existingReaction.destroy();
      } else {
        existingReaction.isLike = isLike;
        await existingReaction.save();
      }
    } else {
      await CourseReaction.create({ courseId, userId, isLike });
    }

    const [likes, dislikes] = await Promise.all([
      CourseReaction.count({ where: { courseId, isLike: true } }),
      CourseReaction.count({ where: { courseId, isLike: false } }),
    ]);

    return {
      likes,
      dislikes,
      message: CourseMessages.REACTION_UPDATED_SUCCESSFULLY,
    };
  }

  async toggleBookmark(
    userId: number,
    courseIdParam: string,
  ): Promise<ToggleBookmarkResult> {
    if (!userId) throw createHttpError.Unauthorized("Unauthorized");

    const courseId = Number(courseIdParam);
    if (isNaN(courseId))
      throw createHttpError.BadRequest("Course id must be a number");

    const course = await Course.findByPk(courseId);
    if (!course) throw createHttpError.NotFound("Course not found");

    const existing = await CourseBookmark.findOne({
      where: { userId, courseId },
    });

    if (existing) {
      await existing.destroy();
      return { isBookmarked: false };
    }

    await CourseBookmark.create({ userId, courseId });
    return { isBookmarked: true };
  }
}

export default new CourseService();
