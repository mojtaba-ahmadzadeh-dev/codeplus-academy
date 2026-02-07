import createHttpError from "http-errors";
import { LessionMessages } from "../../constant/messages";
import { Lesson } from "./lesson.model";
import { LessonCreationAttributes } from "./types/index.types";

class LessionService {
  private lessionModel: typeof Lesson;

  constructor() {
    this.lessionModel = Lesson;
  }

  async create(data: LessonCreationAttributes): Promise<Lesson> {
    const existingLesson = await this.lessionModel.findOne({
      where: {
        title: data.title,
        courseId: data.courseId,
      },
    });

    if (existingLesson) {
      throw new createHttpError.BadRequest(
        LessionMessages.LESSION_ALREADY_EXISTS,
      );
    }

    const lesson = await Lesson.create(data);
    return lesson;
  }

  async getAll(): Promise<Lesson[]> {
    const lessons = await this.lessionModel.findAll({
      order: [["createdAt", "DESC"]],
    });

    return lessons;
  }
}

export default new LessionService();
