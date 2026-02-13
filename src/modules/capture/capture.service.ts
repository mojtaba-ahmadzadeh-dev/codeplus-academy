import { Capture } from "./capture.model";
import createHttpError from "http-errors";
import { CaptureCreationAttributes } from "./types/index.types";
import sequelize from "sequelize";
import { Op } from "sequelize";
import { CaptureMessages, CourseMessages } from "../../constant/messages";
import { Lesson } from "../lession/lesson.model";
import { Course } from "../course/course.model";

class CaptureService {
  async createCapture(data: CaptureCreationAttributes): Promise<Capture> {
    const existing = await Capture.findOne({
      where: {
        title: data.title,
        courseId: data.courseId,
      },
    });

    if (existing) {
      throw new createHttpError.BadRequest("این capture قبلاً اضافه شده است");
    }

    const capture = await Capture.create(data);
    return capture;
  }

  async getAllCaptures() {
    return Capture.findAll({
      order: [["createdAt", "DESC"]],
    });
  }

  async getCaptureById(id: number) {
    // فقط بر اساس id می‌گردونیم
    const capture = await Capture.findOne({ where: { id } });
    if (!capture) {
      throw new createHttpError.NotFound("Capture پیدا نشد");
    }
    return capture;
  }

  async updateCapture(
    id: number,
    data: Partial<CaptureCreationAttributes>,
  ): Promise<Capture> {
    const capture = await Capture.findOne({ where: { id } });
    if (!capture) {
      throw new createHttpError.NotFound(CaptureMessages.CAPTURE_NOT_FOUND);
    }

    const currentCourseId = capture.courseId;

    if (data.title || data.courseId) {
      const existing = await Capture.findOne({
        where: {
          title: data.title || capture.title,
          courseId: data.courseId ?? currentCourseId,
          id: { [Op.ne]: id },
        },
      });

      if (existing) {
        throw new createHttpError.BadRequest(
          CaptureMessages.CAPTURE_ALREADY_EXISTS,
        );
      }
    }

    await capture.update(data);
    return capture;
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

export default new CaptureService();
