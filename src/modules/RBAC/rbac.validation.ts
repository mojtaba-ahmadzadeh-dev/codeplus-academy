import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

const createPermissionSchema = Joi.object({
  name: Joi.string().max(50).required().messages({
    "any.required": "نام Permission الزامی است",
    "string.empty": "نام Permission نمی‌تواند خالی باشد",
    "string.max": "نام Permission نمی‌تواند بیش از ۵۰ کاراکتر باشد",
  }),
  description: Joi.string().max(255).optional().messages({
    "string.max": "توضیحات نمی‌تواند بیش از ۲۵۵ کاراکتر باشد",
  }),
});

const createRoleSchema = Joi.object({
  name: Joi.string().max(50).required().messages({
    "any.required": "نام نقش الزامی است",
    "string.empty": "نام نقش نمی‌تواند خالی باشد",
    "string.max": "نام نقش نمی‌تواند بیش از ۵۰ کاراکتر باشد",
  }),
  description: Joi.string().max(255).optional().messages({
    "string.max": "توضیحات نقش نمی‌تواند بیش از ۲۵۵ کاراکتر باشد",
  }),
});

const assignPermissionToRoleSchema = Joi.object({
  roleId: Joi.number().integer().required().messages({
    "any.required": "شناسه نقش الزامی است",
    "number.base": "شناسه نقش باید عدد باشد",
    "number.integer": "شناسه نقش باید یک عدد صحیح باشد",
  }),
  permissionIds: Joi.array()
    .items(
      Joi.number().integer().required().messages({
        "number.base": "شناسه مجوز باید عدد باشد",
        "number.integer": "شناسه مجوز باید یک عدد صحیح باشد",
      }),
    )
    .min(1)
    .required()
    .messages({
      "any.required": "لیست شناسه‌های مجوز الزامی است",
      "array.min": "حداقل یک مجوز باید ارسال شود",
    }),
});

const assignRoleToUserSchema = Joi.object({
  userId: Joi.number().integer().required().messages({
    "any.required": "شناسه کاربر الزامی است",
    "number.base": "شناسه کاربر باید عدد باشد",
    "number.integer": "شناسه کاربر باید یک عدد صحیح باشد",
  }),

  roleIds: Joi.array()
    .items(
      Joi.number().integer().required().messages({
        "number.base": "شناسه نقش باید عدد باشد",
        "number.integer": "شناسه نقش باید یک عدد صحیح باشد",
      }),
    )
    .min(1)
    .required()
    .messages({
      "any.required": "لیست نقش‌ها الزامی است",
      "array.min": "حداقل یک نقش باید ارسال شود",
    }),
});

export function validateAssignRoleToUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = assignRoleToUserSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const messages = error.details.map((d) => d.message).join(", ");
    return next(createHttpError(400, messages));
  }

  next();
}

export function validateAssignPermissionToRole(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = assignPermissionToRoleSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const messages = error.details.map((d) => d.message).join(", ");
    return next(createHttpError(400, messages));
  }

  next();
}

export function validateCreateRole(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = createRoleSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((d) => d.message).join(", ");
    return next(createHttpError(400, messages));
  }
  next();
}

export function validateCreatePermission(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = createPermissionSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const messages = error.details.map((d) => d.message).join(", ");
    return next(createHttpError(400, messages));
  }

  next();
}
