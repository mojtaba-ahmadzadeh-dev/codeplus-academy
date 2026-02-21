import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

const createLessonSchema = Joi.object({
  title: Joi.string().min(2).max(100).required().messages({
    "string.base": "عنوان باید متن باشد",
    "string.empty": "عنوان نمی‌تواند خالی باشد",
    "string.min": "عنوان باید حداقل ۲ کاراکتر باشد",
    "string.max": "عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد",
    "any.required": "عنوان درس الزامی است",
  }),
  description: Joi.string().allow("", null).max(500).messages({
    "string.base": "توضیحات باید متن باشد",
    "string.max": "توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد",
  }),
  courseId: Joi.number().integer().min(1).required().messages({
    "number.base": "شناسه دوره باید عدد باشد",
    "number.integer": "شناسه دوره باید عدد صحیح باشد",
    "number.min": "شناسه دوره معتبر نیست",
    "any.required": "شناسه دوره الزامی است",
  }),
  status: Joi.string().valid("ACTIVE", "INACTIVE").messages({
    "any.only": "وضعیت درس معتبر نیست",
  }),
});

const updateLessonSchema = Joi.object({
  title: Joi.string().min(2).max(100).messages({
    "string.base": "عنوان باید متن باشد",
    "string.empty": "عنوان نمی‌تواند خالی باشد",
    "string.min": "عنوان باید حداقل ۲ کاراکتر باشد",
    "string.max": "عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد",
  }),
  description: Joi.string().allow("", null).max(500).messages({
    "string.base": "توضیحات باید متن باشد",
    "string.max": "توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد",
  }),
  status: Joi.string().valid("ACTIVE", "INACTIVE").messages({
    "any.only": "وضعیت درس معتبر نیست",
  }),
});

const idParamSchema = Joi.object({
  id: Joi.number().integer().min(1).required().messages({
    "number.base": "شناسه درس باید عدد باشد",
    "number.integer": "شناسه درس باید عدد صحیح باشد",
    "number.min": "شناسه درس معتبر نیست",
    "any.required": "شناسه درس الزامی است",
  }),
});

export function validateCreateLesson(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = createLessonSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error)
    return next(
      createHttpError(400, error.details.map((d) => d.message).join(", ")),
    );
  next();
}

export function validateUpdateLesson(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = updateLessonSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error)
    return next(
      createHttpError(400, error.details.map((d) => d.message).join(", ")),
    );
  next();
}

export function validateGetLesson(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = idParamSchema.validate(req.params, { abortEarly: false });
  if (error)
    return next(
      createHttpError(400, error.details.map((d) => d.message).join(", ")),
    );
  next();
}

export function validateDeleteLesson(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = idParamSchema.validate(req.params, { abortEarly: false });
  if (error)
    return next(
      createHttpError(400, error.details.map((d) => d.message).join(", ")),
    );
  next();
}
