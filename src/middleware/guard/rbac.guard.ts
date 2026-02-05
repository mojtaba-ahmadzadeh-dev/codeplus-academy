import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { Roles } from "../../constant/role_rbac.constant";
import { env } from "../../config/env";
import { RBACMessags } from "../../constant/messages";
import { JwtPayload } from "../types/index.types";

export const rbacGuard = (requiredRoles: Roles[] = []): RequestHandler => {
  return (req, _res, next) => {
    let token = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : req.headers.authorization;

    if (!token && req.cookies?.accessToken) token = req.cookies.accessToken;
    if (!token)
      return next(createHttpError.Unauthorized(RBACMessags.UNAUTHORIZED));

    try {
      const decoded = jwt.verify(token, env.JWT.ACCESS_SECRET) as JwtPayload;

      req.user = {
        id: decoded.userId,
        roles: decoded.roles,
      };

      if (
        requiredRoles.length > 0 &&
        !decoded.roles.some((r) => requiredRoles.includes(r))
      ) {
        return next(createHttpError.Forbidden(RBACMessags.FORBIDDEN));
      }

      next();
    } catch (err) {
      next(createHttpError.Unauthorized(RBACMessags.UNAUTHORIZED));
    }
  };
};