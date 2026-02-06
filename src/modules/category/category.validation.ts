import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { CategoryMessages } from "../../constant/messages";

const updateCategorySchema = Joi.object({
  title: Joi.string().min(2).max(100).required().messages({
    "string.base": "عنوان باید متن باشد",
    "string.empty": "عنوان نمی‌تواند خالی باشد",
    "string.min": "عنوان باید حداقل ۲ کاراکتر باشد",
    "string.max": "عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد",
    "any.required": "عنوان دسته‌بندی الزامی است",
  }),
  description: Joi.string().allow("", null).max(500).messages({
    "string.base": "توضیحات باید متن باشد",
    "string.max": "توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد",
  }),
  parentId: Joi.number().integer().min(1).allow(null).messages({
    "number.base": "شناسه والد باید عدد باشد",
    "number.integer": "شناسه والد باید عدد صحیح باشد",
    "number.min": "شناسه والد معتبر نیست",
  }),
  status: Joi.string()
    .valid("active", "inactive")
    .messages({
      "any.only": "وضعیت دسته‌بندی معتبر نیست",
    }),
});

const createCategorySchema = Joi.object({
  title: Joi.string().min(2).max(100).required().messages({
    "string.base": "عنوان باید متن باشد",
    "string.empty": "عنوان نمی‌تواند خالی باشد",
    "string.min": "عنوان باید حداقل ۲ کاراکتر باشد",
    "string.max": "عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد",
    "any.required": "عنوان دسته‌بندی الزامی است",
  }),
  description: Joi.string().allow("", null).max(500).messages({
    "string.base": "توضیحات باید متن باشد",
    "string.max": "توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد",
  }),
  parentId: Joi.number().integer().min(1).allow(null).messages({
    "number.base": "شناسه والد باید عدد باشد",
    "number.integer": "شناسه والد باید عدد صحیح باشد",
    "number.min": "شناسه والد معتبر نیست",
  }),
  status: Joi.string()
    .valid("active", "inactive")
    .messages({
      "any.only": "وضعیت دسته‌بندی معتبر نیست",
    }),
});

export function validateCreateCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = createCategorySchema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map(d => d.message).join(", ");
    return next(createHttpError(400, messages));
  }

  next();
}

export function validateUpdateCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = updateCategorySchema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((d) => d.message).join(", ");
    return next(createHttpError(400, messages));
  }

  next();
}