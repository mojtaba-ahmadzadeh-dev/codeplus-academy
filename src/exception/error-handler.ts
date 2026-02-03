import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";

export const errorHandler = (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(err.status || 500).json({
    statusCode: err.status || 500,
    message: err.message,
  });
};
