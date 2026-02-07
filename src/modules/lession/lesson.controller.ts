// src/modules/lession/lession.controller.ts
import { NextFunction, Request, Response } from "express";
import lessionService from "./lesson.service";
import { LessionMessages } from "../../constant/messages";

class LessionController {
  private lessionService = lessionService;

  constructor() {
    this.lessionService = lessionService;

    this.create = this.create.bind(this);
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
}

export default new LessionController();
