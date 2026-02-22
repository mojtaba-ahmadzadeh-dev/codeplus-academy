import Joi from "joi";
import { validate } from "../../middleware/validate/validate.middleware";

const updateUserSchema = Joi.object({
  mobile: Joi.string()
    .pattern(/^09\d{9}$/)
    .messages({
      "string.pattern.base": "شماره موبایل نامعتبر است",
    }),

  full_name: Joi.string().max(255).messages({
    "string.max": "نام نباید بیشتر از 255 کاراکتر باشد",
  }),

  avatar: Joi.string().uri().allow(null, "").messages({
    "string.uri": "آدرس avatar معتبر نیست",
  }),
});

const changeRoleSchema = Joi.object({
  role: Joi.string().valid("user", "admin", "moderator").required().messages({
    "any.only": "نقش وارد شده معتبر نیست",
    "any.required": "نقش الزامی است",
  }),
});

const createUserSchema = Joi.object({
  mobile: Joi.string()
    .pattern(/^09\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "شماره موبایل نامعتبر است",
      "any.required": "موبایل الزامی است",
    }),

  full_name: Joi.string().max(255).optional(),

  role: Joi.string().valid("user", "admin", "moderator").optional().messages({
    "any.only": "نقش معتبر نیست",
  }),
});

const banUserSchema = Joi.object({
  is_banned: Joi.boolean().required().messages({
    "any.required": "وضعیت ban الزامی است",
    "boolean.base": "مقدار ban باید true یا false باشد",
  }),
});

export const validateUpdateUser = validate(updateUserSchema);
export const validateChangeUserRole = validate(changeRoleSchema);
export const validateCreateUser = validate(createUserSchema);
export const validateBanUser = validate(banUserSchema);
