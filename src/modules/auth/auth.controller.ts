import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";
import { StatusCodes } from "http-status-codes";
import { authMessage } from "../../constant/messages";
import { checkOTPSchema, sendOTPSchema } from "./auth.validation";

class AuthController {
  private service = authService;

  constructor() {
    this.service = authService;

    this.sendOTP = this.sendOTP.bind(this);
    this.checkOTP = this.checkOTP.bind(this);
  }

  async sendOTP(req: Request, res: Response, next: NextFunction) {
    try {
      const { mobile } = await sendOTPSchema.validateAsync(req.body, {
        abortEarly: false,
      });

      const user = await this.service.sendOTP(mobile);

      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: authMessage.OTP_SENT_SUCCESS,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async checkOTP(req: Request, res: Response, next: NextFunction) {
    try {
      const { mobile, code } = await checkOTPSchema.validateAsync(req.body, {
        abortEarly: false,
      });

      const { accessToken, refreshToken, user } = await this.service.checkOTP(  mobile,  code,);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.cookie("accessToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: authMessage.OTP_VERIFIED_SUCCESS,
        data: {
          user,
          accessToken,
          refreshToken
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();