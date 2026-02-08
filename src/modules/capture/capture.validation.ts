// src/modules/capture/capture.validation.ts
import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

const statusEnum = ["active", "inactive", "pending"];

const createCaptureSchema = Joi.object({
  title: Joi.string().min(2).max(100).required().messages({
    "string.base": "عنوان باید متن باشد",
    "string.empty": "عنوان نمی‌تواند خالی باشد",
    "string.min": "عنوان باید حداقل ۲ کاراکتر باشد",
    "string.max": "عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد",
    "any.required": "عنوان capture الزامی است",
  }),
  description: Joi.string().allow("", null).max(500).messages({
    "string.base": "توضیحات باید متن باشد",
    "string.max": "توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد",
  }),
  status: Joi.string().valid(...statusEnum).required().messages({
    "any.only": "وضعیت capture معتبر نیست",
    "any.required": "وضعیت capture الزامی است",
  }),
  courseId: Joi.number().integer().min(1).allow(null).messages({
    "number.base": "شناسه دوره باید عدد باشد",
    "number.integer": "شناسه دوره باید عدد صحیح باشد",
    "number.min": "شناسه دوره معتبر نیست",
  }),
});

const updateCaptureSchema = Joi.object({
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
  status: Joi.string().valid(...statusEnum).messages({
    "any.only": "وضعیت capture معتبر نیست",
  }),
  courseId: Joi.number().integer().min(1).allow(null).messages({
    "number.base": "شناسه دوره باید عدد باشد",
    "number.integer": "شناسه دوره باید عدد صحیح باشد",
    "number.min": "شناسه دوره معتبر نیست",
  }),
});

const idParamSchema = Joi.object({
  id: Joi.number().integer().min(1).required().messages({
    "number.base": "شناسه capture باید عدد باشد",
    "number.integer": "شناسه capture باید عدد صحیح باشد",
    "number.min": "شناسه capture معتبر نیست",
    "any.required": "شناسه capture الزامی است",
  }),
});

// Middleware ها

export function validateCreateCapture(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = createCaptureSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((d) => d.message).join(", ");
    return next(createHttpError(400, messages));
  }
  next();
}

export function validateUpdateCapture(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = updateCaptureSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((d) => d.message).join(", ");
    return next(createHttpError(400, messages));
  }
  next();
}

export function validateDeleteCapture(
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

export function validateGetCapture(
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