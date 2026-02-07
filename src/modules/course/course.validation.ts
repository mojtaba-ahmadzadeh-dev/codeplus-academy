import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

const createCourseSchema = Joi.object({
  title: Joi.string().max(150).required().messages({
    "any.required": "عنوان دوره الزامی است",
    "string.empty": "عنوان دوره نمی‌تواند خالی باشد",
    "string.max": "عنوان دوره نمی‌تواند بیش از ۱۵۰ کاراکتر باشد",
  }),

  description: Joi.string().required().messages({
    "any.required": "توضیحات دوره الزامی است",
    "string.empty": "توضیحات دوره نمی‌تواند خالی باشد",
  }),

  price: Joi.number().min(0).required().messages({
    "any.required": "قیمت دوره الزامی است",
    "number.base": "قیمت دوره باید عدد باشد",
    "number.min": "قیمت دوره نمی‌تواند منفی باشد",
  }),

  discount: Joi.number().min(0).max(100).optional().messages({
    "number.base": "تخفیف باید عدد باشد",
    "number.min": "تخفیف نمی‌تواند کمتر از ۰ باشد",
    "number.max": "تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد",
  }),

  thumbnail: Joi.string().uri().optional().messages({
    "string.uri": "آدرس تصویر نامعتبر است",
  }),

  level: Joi.string()
    .valid("beginner", "intermediate", "advanced")
    .required()
    .messages({
      "any.required": "سطح دوره الزامی است",
      "any.only": "سطح دوره باید beginner یا intermediate یا advanced باشد",
    }),

  duration: Joi.number().integer().min(1).required().messages({
    "any.required": "مدت زمان دوره الزامی است",
    "number.base": "مدت زمان دوره باید عدد باشد",
    "number.integer": "مدت زمان دوره باید عدد صحیح باشد",
    "number.min": "مدت زمان دوره باید بیشتر از ۰ باشد",
  }),

  category_id: Joi.number().integer().required().messages({
    "any.required": "شناسه دسته‌بندی الزامی است",
    "number.base": "شناسه دسته‌بندی باید عدد باشد",
    "number.integer": "شناسه دسته‌بندی باید عدد صحیح باشد",
  }),
});

const updateCourseSchema = Joi.object({
  title: Joi.string().max(150).optional().messages({
    "string.empty": "عنوان دوره نمی‌تواند خالی باشد",
    "string.max": "عنوان دوره نمی‌تواند بیش از ۱۵۰ کاراکتر باشد",
  }),

  description: Joi.string().optional().messages({
    "string.empty": "توضیحات دوره نمی‌تواند خالی باشد",
  }),

  price: Joi.number().min(0).optional().messages({
    "number.base": "قیمت دوره باید عدد باشد",
    "number.min": "قیمت دوره نمی‌تواند منفی باشد",
  }),

  discount: Joi.number().min(0).max(100).optional().messages({
    "number.base": "تخفیف باید عدد باشد",
    "number.min": "تخفیف نمی‌تواند کمتر از ۰ باشد",
    "number.max": "تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد",
  }),

  thumbnail: Joi.string().uri().optional().allow(null).messages({
    "string.uri": "آدرس تصویر نامعتبر است",
  }),

  level: Joi.string()
    .valid("beginner", "intermediate", "advanced")
    .optional()
    .messages({
      "any.only": "سطح دوره باید beginner یا intermediate یا advanced باشد",
    }),

  duration: Joi.number().integer().min(1).optional().messages({
    "number.base": "مدت زمان دوره باید عدد باشد",
    "number.integer": "مدت زمان دوره باید عدد صحیح باشد",
    "number.min": "مدت زمان دوره باید بیشتر از ۰ باشد",
  }),

  category_id: Joi.number().integer().optional().messages({
    "number.base": "شناسه دسته‌بندی باید عدد باشد",
    "number.integer": "شناسه دسته‌بندی باید عدد صحیح باشد",
  }),

  status: Joi.string().valid("draft", "published").optional().messages({
    "any.only": "وضعیت دوره باید draft یا published باشد",
  }),
});

const courseIdParamSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "any.required": "شناسه دوره الزامی است",
    "number.base": "شناسه دوره باید عدد باشد",
    "number.integer": "شناسه دوره باید عدد صحیح باشد",
  }),
});

export function validateCreateCourse(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = createCourseSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const messages = error.details.map((d) => d.message).join(", ");
    return next(createHttpError(400, messages));
  }

  next();
}

export function validateUpdateCourse(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = updateCourseSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const messages = error.details.map((d) => d.message).join(", ");
    return next(createHttpError(400, messages));
  }

  next();
}

export function validateCourseIdParam(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = courseIdParamSchema.validate(req.params, {
    abortEarly: false,
  });

  if (error) {
    const messages = error.details.map((d) => d.message).join(", ");
    return next(createHttpError(400, messages));
  }

  next();
}