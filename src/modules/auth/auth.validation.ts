import Joi from "joi";
import { authMessage } from "../../constant/messages";

const sendOTPSchema = Joi.object({
  mobile: Joi.string()
    .pattern(/^09\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": authMessage.MOBILE_INVALID,
      "any.required": authMessage.MOBILE_REQUIRED,
    }),
});

const checkOTPSchema = Joi.object({
  mobile: Joi.string()
    .pattern(/^09\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": authMessage.MOBILE_INVALID,
      "any.required": authMessage.MOBILE_REQUIRED,
    }),
  code: Joi.string()
    .length(6)
    .pattern(/^\d{6}$/)
    .required()
    .messages({
      "string.pattern.base": authMessage.CODE_INVALID,
      "string.length": authMessage.CODE_INVALID,
      "any.required": authMessage.CODE_REQUIRED,
    }),
});


export { sendOTPSchema, checkOTPSchema };
