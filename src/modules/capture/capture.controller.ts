// src/modules/capture/capture.controller.ts
import { Request, Response, NextFunction } from "express";
import captureService from "./capture.service";
import { CaptureCreationAttributes } from "./types/index.types";
import { StatusCodes } from "http-status-codes";
import { CaptureMessages } from "../../constant/messages";
import createHttpError from "http-errors";

class CaptureController {
  private captureService = captureService;

  constructor() {
    this.captureService = captureService;

    this.createCapture = this.createCapture.bind(this);
    this.getAllCaptures = this.getAllCaptures.bind(this);
    this.getCaptureById = this.getCaptureById.bind(this);
    this.updateCapture = this.updateCapture.bind(this);
  }

  async createCapture(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CaptureCreationAttributes = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        courseId: req.body.courseId,
        url: req.file ? `/uploads/${req.file.filename}` : null,
      };

      const capture = await this.captureService.createCapture(data);
      res.status(StatusCodes.CREATED).json({
        message: CaptureMessages.CAPTURE_CREATE_SUCCESSFULLY,
        capture,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllCaptures(req: Request, res: Response, next: NextFunction) {
    try {
      const captures = await this.captureService.getAllCaptures();
      res.status(StatusCodes.OK).json({
        message: CaptureMessages.CAPTURE_FETCHED_SUCCESSFULLY,
        captures,
      });
    } catch (err) {
      next(err);
    }
  }

  async getCaptureById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "ID نامعتبر است" });
      }

      const capture = await this.captureService.getCaptureById(id);

      res.status(StatusCodes.OK).json({
        message: CaptureMessages.CAPTURE_FETCHED_SUCCESSFULLY,
        capture,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateCapture(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const courseId =
        req.body.courseId !== undefined ? Number(req.body.courseId) : undefined;

      const data: Partial<CaptureCreationAttributes> = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        courseId,
        url: req.file ? `/uploads/${req.file.filename}` : undefined,
      };

      const capture = await this.captureService.updateCapture(id, data);

      res.status(StatusCodes.OK).json({
        message: CaptureMessages.CATEGORY_UPDATED_SUCCESSFULLY,
        capture,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new CaptureController();
