import { NextFunction, Request, Response } from "express";
import CourseService from "./course.service";
import { StatusCodes } from "http-status-codes";
import { CourseMessages } from "../../constant/messages";

class CourseController {
  private courseService: typeof CourseService;

  constructor() {
    this.courseService = CourseService;

    this.createCourse = this.createCourse.bind(this);
  }
  async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        title,
        description,
        price,
        discount,
        thumbnail,
        level,
        duration,
        category_id,
      } = req.body;

      const teacher_id = (req as any).user.id;

      const course = await this.courseService.createCourse({
        title,
        description,
        price,
        discount,
        thumbnail,
        level,
        duration,
        category_id,
        teacher_id,
      });

      return res.status(StatusCodes.CREATED).json({
        message: CourseMessages.COURSE_CREATED_SUCCESSFULLY,
        course,
      });
    } catch (error: any) {
      next(error);
    }
  }
}

export default new CourseController();
