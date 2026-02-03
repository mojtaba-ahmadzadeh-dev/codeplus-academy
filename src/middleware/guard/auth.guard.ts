import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import createHttpError from "http-errors";
import { authMessage } from "../../constant/messages";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    mobile: string;
  };
}

export const authGuard = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw createHttpError.Unauthorized(authMessage.UNAUTHORIZED);
    }

    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      throw createHttpError.InternalServerError(authMessage.ACCESS_TOKEN_NOT_DEFINED);
    }

    const payload = jwt.verify(token, secret) as JwtPayload;

    if (!payload.userId) {
      throw createHttpError.Unauthorized(
        authMessage.ACCESS_TOKEN_INVALID
      );
    }

    req.user = {
      userId: payload.userId,
      mobile: payload.mobile,
    };

    next();
  } catch (error) {
    next(error);
  }
};
