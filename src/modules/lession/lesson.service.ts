import createHttpError from "http-errors";
import { LessionMessages } from "../../constant/messages";
import { Lesson } from "./lesson.model";
import { LessonCreationAttributes } from "./types/index.types";

class LessionService {
  private lessionModel: typeof Lesson;

  constructor() {
    this.lessionModel = Lesson;
  }

  async createLesson(data: LessonCreationAttributes): Promise<Lesson> {
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

  async getAllLesson(): Promise<Lesson[]> {
    const lessons = await this.lessionModel.findAll({
      order: [["createdAt", "DESC"]],
    });

    return lessons;
  }

  async getByIdLesson(id: number): Promise<Lesson> {
    const lesson = await this.lessionModel.findByPk(id);

    if (!lesson) {
      throw new createHttpError.NotFound(LessionMessages.LESSON_NOT_FOUND);
    }

    return lesson;
  }

  async updateLesson(id: number, data: Partial<Lesson>): Promise<Lesson> {
    const lesson = await this.lessionModel.findByPk(id);

    if (!lesson) {
      throw new createHttpError.NotFound(LessionMessages.LESSON_NOT_FOUND);
    }

    await lesson.update(data);
    return lesson;
  }

  async deleteLesson(id: number): Promise<void> {
    const lesson = await this.lessionModel.findByPk(id);

    if (!lesson) {
      throw new createHttpError.NotFound(LessionMessages.LESSON_NOT_FOUND);
    }

    await lesson.destroy();
  }
}

export default new LessionService();
