import Joi from "joi";
import { validate } from "../../middleware/validate/validate.middleware";
import { authMessage } from "../../constant/messages";

// Send OTP validation
const sendOTPSchema = Joi.object({
  mobile: Joi.string()
    .pattern(/^09\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": authMessage.MOBILE_INVALID,
      "any.required": authMessage.MOBILE_REQUIRED,
    }),
});

// Check OTP validation
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

//  Export middlewares
export const validateSendOTP = validate(sendOTPSchema);
export const validateCheckOTP = validate(checkOTPSchema);
