// src/modules/lession/lession.controller.ts
import { NextFunction, Request, Response } from "express";
import lessionService from "./lesson.service";
import { LessionMessages } from "../../constant/messages";
import { StatusCodes } from "http-status-codes";

class LessionController {
  private lessionService = lessionService;

  constructor() {
    this.lessionService = lessionService;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const lesson = await this.lessionService.create(data);
      res.status(201).json({
        message: LessionMessages.LESSION_CREATED_SUCCESSFULLY,
        lesson,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const lessons = await this.lessionService.getAll();
      res.status(StatusCodes.OK).json({
        message: LessionMessages.LESSONS_FETCHED_SUCCESSFULLY,
        lessons,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const lesson = await this.lessionService.getById(Number(id));

      res.status(StatusCodes.OK).json({
        message: LessionMessages.LESSON_FETCHED_SUCCESSFULLY,
        lesson,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new LessionController();
