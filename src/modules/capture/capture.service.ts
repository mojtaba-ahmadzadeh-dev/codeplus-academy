import { Capture } from "./capture.model";
import createHttpError from "http-errors";
import { CaptureCreationAttributes } from "./types/index.types";

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
}

export default new CaptureService();
