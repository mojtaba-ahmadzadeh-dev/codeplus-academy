import { Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { User } from "../../modules/user/user.model";
import { AuthRequest } from "./auth.guard";
import { RBACMessags } from "../../constant/messages";

export const roleGuard = (requiredRole: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId; 
      if (!userId) {
        throw createHttpError.Unauthorized(RBACMessags.UNAUTHORIZED);
      }

      const user = await User.findByPk(userId);
      if (!user) {
        throw createHttpError.NotFound(RBACMessags.USER_NOT_FOUND);
      }

      if (user.role !== requiredRole) {
        throw createHttpError.Forbidden(RBACMessags.FORBIDDEN);
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
