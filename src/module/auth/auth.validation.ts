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

export { sendOTPSchema };
