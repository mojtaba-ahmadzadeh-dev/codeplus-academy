import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { authMessage } from "../../constant/messages";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    mobile: string;
  };
}

const sendError = (res: Response, statusCode: number, message: string) => {
  return res.status(statusCode).json({ statusCode, message });
};

const verifyToken = (token: string): JwtPayload | null => {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) return null;

  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch {
    return null;
  }
};

export const authGuard = (req: AuthRequest, res: Response, next: NextFunction) => {

  const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  if (!token) return sendError(res, 401, authMessage.UNAUTHORIZED);

  const payload = verifyToken(token);
  if (!payload) return sendError(res, 401, authMessage.ACCESS_TOKEN_INVALID);
  if (!payload.userId) return sendError(res, 401, authMessage.ACCESS_TOKEN_EXPIRED);

  req.user = {
    userId: payload.userId,
    mobile: payload.mobile,
  };

  next();
};
