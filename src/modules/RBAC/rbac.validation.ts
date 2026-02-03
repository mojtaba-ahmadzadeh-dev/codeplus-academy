import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

const createPermissionSchema = Joi.object({
  name: Joi.string().max(50).required()
    .messages({
      "any.required": "نام Permission الزامی است",
      "string.empty": "نام Permission نمی‌تواند خالی باشد",
      "string.max": "نام Permission نمی‌تواند بیش از ۵۰ کاراکتر باشد"
    }),
  description: Joi.string().max(255).optional()
    .messages({
      "string.max": "توضیحات نمی‌تواند بیش از ۲۵۵ کاراکتر باشد"
    }),
});

export function validateCreatePermission(req: Request, res: Response, next: NextFunction) {
  const { error } = createPermissionSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map(d => d.message).join(", ");
    return next(createHttpError(400, messages));
  }

  next();
}
