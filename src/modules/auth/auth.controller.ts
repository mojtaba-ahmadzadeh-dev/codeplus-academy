import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";
import { StatusCodes } from "http-status-codes";
import { authMessage } from "../../constant/messages";
import { checkOTPSchema, sendOTPSchema } from "./auth.validation";
import createHttpError from "http-errors";

class AuthController {
  private service = authService;

  constructor() {
    this.service = authService;

    this.sendOTP = this.sendOTP.bind(this);
    this.checkOTP = this.checkOTP.bind(this);
    this.refreshToken = this.refreshToken.bind(this); //
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

      const { accessToken, refreshToken, user } = await this.service.checkOTP(
        mobile,
        code,
      );

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
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.refreshToken;
      if (!token)
        throw createHttpError.Unauthorized(authMessage.REFRESH_TOKEN_NOT_FOUND);

      const { accessToken, refreshToken } =
        await this.service.verifyRefreshToken(token);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: authMessage.REFRESH_TOKEN_SUCCESS,
        data: { accessToken, refreshToken },
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new AuthController();
