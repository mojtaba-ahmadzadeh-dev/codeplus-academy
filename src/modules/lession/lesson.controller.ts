// src/modules/lession/lession.controller.ts
import { NextFunction, Request, Response } from "express";
import lessionService from "./lesson.service";
import { LessionMessages } from "../../constant/messages";
import { StatusCodes } from "http-status-codes";

class LessionController {
  private lessionService = lessionService;

  constructor() {
    this.lessionService = lessionService;

    this.createLesson = this.createLesson.bind(this);
    this.getAllLesson = this.getAllLesson.bind(this);
    this.getByIdLesson = this.getByIdLesson.bind(this);
    this.updateLesson = this.updateLesson.bind(this);
    this.deleteLesson = this.deleteLesson.bind(this);
  }

  async createLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const lesson = await this.lessionService.createLesson(data);
      res.status(201).json({
        message: LessionMessages.LESSION_CREATED_SUCCESSFULLY,
        lesson,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const lessons = await this.lessionService.getAllLesson();
      res.status(StatusCodes.OK).json({
        message: LessionMessages.LESSONS_FETCHED_SUCCESSFULLY,
        lessons,
      });
    } catch (error) {
      next(error);
    }
  }

  async getByIdLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const lesson = await this.lessionService.getByIdLesson(Number(id));

      res.status(StatusCodes.OK).json({
        message: LessionMessages.LESSON_FETCHED_SUCCESSFULLY,
        lesson,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;

      const lesson = await this.lessionService.updateLesson(Number(id), data);

      res.status(StatusCodes.OK).json({
        message: LessionMessages.LESSON_UPDATED_SUCCESSFULLY,
        lesson,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.lessionService.deleteLesson(Number(id));

      res.status(StatusCodes.OK).json({
        message: LessionMessages.LESSON_DELETED_SUCCESSFULLY,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new LessionController();
