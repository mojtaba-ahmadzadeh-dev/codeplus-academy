// src/modules/basket/basket.validation.ts
import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { BasketAction } from "../../constant/basket.constant";

const basketActionEnum: BasketAction[] = [BasketAction.INCREMENT, BasketAction.DECREMENT];

// Schemas
const createBasketSchema = Joi.object({
  courseId: Joi.number().integer().min(1).required().messages({
    "number.base": "شناسه دوره باید عدد باشد",
    "number.integer": "شناسه دوره باید عدد صحیح باشد",
    "number.min": "شناسه دوره معتبر نیست",
    "any.required": "شناسه دوره الزامی است",
  }),
  quantity: Joi.number().integer().min(1).optional().messages({
    "number.base": "تعداد باید عدد باشد",
    "number.integer": "تعداد باید عدد صحیح باشد",
    "number.min": "تعداد باید حداقل ۱ باشد",
  }),
});

const updateQuantitySchema = Joi.object({
  action: Joi.string()
    .valid(...basketActionEnum)
    .required()
    .messages({
      "any.only": "عملیات معتبر نیست، باید increment یا decrement باشد",
      "any.required": "عملیات الزامی است",
    }),
});

const itemIdParamSchema = Joi.object({
  itemId: Joi.number().integer().min(1).required().messages({
    "number.base": "شناسه آیتم باید عدد باشد",
    "number.integer": "شناسه آیتم باید عدد صحیح باشد",
    "number.min": "شناسه آیتم معتبر نیست",
    "any.required": "شناسه آیتم الزامی است",
  }),
});

export function validateCreateBasket(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = createBasketSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((d) => d.message).join(", ");
    return next(createHttpError(400, messages));
  }
  next();
}

export function validateUpdateQuantity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error: paramError } = itemIdParamSchema.validate(req.params, { abortEarly: false });
  if (paramError) {
    const messages = paramError.details.map((d) => d.message).join(", ");
    return next(createHttpError(400, messages));
  }

  const { error: bodyError } = updateQuantitySchema.validate(req.body, { abortEarly: false });
  if (bodyError) {
    const messages = bodyError.details.map((d) => d.message).join(", ");
    return next(createHttpError(400, messages));
  }

  next();
}

export function validateRemoveItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = itemIdParamSchema.validate(req.params, { abortEarly: false });
  if (error) {
    const messages = error.details.map((d) => d.message).join(", ");
    return next(createHttpError(400, messages));
  }
  next();
}

export function validateGetUserBasket(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // برای گرفتن سبد نیازی به پارامتر نیست، فقط بررسی کاربر می‌کنیم
  if (!req.user?.id) {
    return next(createHttpError(401, "Unauthorized"));
  }
  next();
}