import Joi from "joi";
import { validate } from "../../middleware/validate/validate.middleware";

// Create Permission
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

// Create Role
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

// Assign Permission to Role
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

export const validateCreatePermission = validate(createPermissionSchema);
export const validateCreateRole = validate(createRoleSchema);
export const validateAssignPermissionToRole = validate(
  assignPermissionToRoleSchema,
);
