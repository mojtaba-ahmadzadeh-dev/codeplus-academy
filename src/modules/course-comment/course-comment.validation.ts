import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { STATUS } from "../../constant/status.constant";

const createCommentSchema = Joi.object({
  content: Joi.string().min(2).max(500).required().messages({
    "string.base": "متن کامنت باید رشته باشد",
    "string.empty": "متن کامنت نمی‌تواند خالی باشد",
    "string.min": "متن کامنت باید حداقل ۲ کاراکتر باشد",
    "string.max": "متن کامنت نباید بیشتر از ۵۰۰ کاراکتر باشد",
    "any.required": "متن کامنت الزامی است",
  }),
  courseId: Joi.number().integer().min(1).required().messages({
    "number.base": "شناسه دوره باید عدد باشد",
    "number.integer": "شناسه دوره باید عدد صحیح باشد",
    "number.min": "شناسه دوره معتبر نیست",
    "any.required": "شناسه دوره الزامی است",
  }),
  status: Joi.string()
    .valid(...Object.values(STATUS))
    .messages({ "any.only": "وضعیت کامنت معتبر نیست" }),
});

const idParamSchema = Joi.object({
  id: Joi.number().integer().min(1).required().messages({
    "number.base": "شناسه کامنت باید عدد باشد",
    "number.integer": "شناسه کامنت باید عدد صحیح باشد",
    "number.min": "شناسه کامنت معتبر نیست",
    "any.required": "شناسه کامنت الزامی است",
  }),
});

// Middleware ها
export function validateCreateComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = createCommentSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const messages = error.details.map((d) => d.message).join(", ");
    return next(createHttpError(400, messages));
  }
  next();
}

export function validateCommentId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = idParamSchema.validate(req.params, { abortEarly: false });
  if (error) {
    const messages = error.details.map((d) => d.message).join(", ");
    return next(createHttpError(400, messages));
  }
  next();
}
