import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";
import { StatusCodes } from "http-status-codes";
import { authMessage } from "../../constant/messages";
import createHttpError from "http-errors";
import tokenService from "./token.service";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

class AuthController {
  private service = authService;

  constructor() {
    this.sendOTP = this.sendOTP.bind(this);
    this.verifyOTP = this.verifyOTP.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.getMe = this.getMe.bind(this);
    this.logout = this.logout.bind(this);
  }

  async sendOTP(req: Request, res: Response, next: NextFunction) {
    try {
      const { mobile } = req.body;

      const { user, isNewUser } = await this.service.sendOTP(mobile);

      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: isNewUser
          ? authMessage.OTP_REGISTER_SUCCESS
          : authMessage.OTP_LOGIN_SUCCESS,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyOTP(req: Request, res: Response, next: NextFunction) {
    try {
      const { mobile, code } = req.body;

      const { accessToken, refreshToken, user } = await this.service.verifyOTP(
        mobile,
        code,
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: authMessage.OTP_REGISTER_SUCCESS,
        data: { user },
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

      const { accessToken, refreshToken } = tokenService.refreshTokens(token);

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

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.accessToken;
      if (!token)
        throw createHttpError.Unauthorized(authMessage.ACCESS_TOKEN_INVALID);

      const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
      if (!ACCESS_TOKEN_SECRET) {
        throw createHttpError.InternalServerError(
          authMessage.ACCESS_TOKEN_NOT_DEFINED,
        );
      }

      const payload = jwt.verify(token, env.JWT.ACCESS_SECRET) as JwtPayload;

      if (!payload?.userId)
        throw createHttpError.Unauthorized(authMessage.ACCESS_TOKEN_INVALID);

      const user = await this.service.getMe(payload.userId);

      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: authMessage.GET_ME_SUCCESS,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: authMessage.LOGOUT_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
