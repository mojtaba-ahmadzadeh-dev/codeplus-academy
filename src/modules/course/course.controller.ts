import { NextFunction, Request, Response } from "express";
import CourseService from "./course.service";
import { StatusCodes } from "http-status-codes";
import { CourseMessages } from "../../constant/messages";

class CourseController {
  private courseService: typeof CourseService;

  constructor() {
    this.courseService = CourseService;

    this.createCourse = this.createCourse.bind(this);
    this.getAllCourses = this.getAllCourses.bind(this);
    this.getCourseById = this.getCourseById.bind(this);
    this.updateCourse = this.updateCourse.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.toggleBookmark = this.toggleBookmark.bind(this);
    this.likeOrDislike = this.likeOrDislike.bind(this);
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

  async getAllCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const courses = await this.courseService.getAllCourses();
      res.status(StatusCodes.OK).json({
        message: CourseMessages.COURSES_FETCHED_SUCCESSFULLY,
        courses,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getCourseById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const course = await this.courseService.getCourseById(Number(id));

      res.status(StatusCodes.OK).json({
        message: CourseMessages.COURSE_FETCHED_SUCCESSFULLY,
        course,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async updateCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updatedCourse = await this.courseService.updateCourse(
        Number(id),
        req.body,
      );

      res.status(StatusCodes.OK).json({
        message: CourseMessages.COURSE_UPDATED_SUCCESSFULLY,
        course: updatedCourse,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async deleteCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.courseService.deleteCourse(Number(id));

      res.status(StatusCodes.OK).json({
        message: result.message,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async likeOrDislike(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.courseService.likeOrDislike(
        Number(req.params.id),
        req.user!.id,
        req.body.isLike,
      );

      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async toggleBookmark(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.courseService.toggleBookmark(
        req.user!.id,
        req.params.id,
      );
      res.status(StatusCodes.OK).json({
        message: "Course bookmark updated successfully",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CourseController();
