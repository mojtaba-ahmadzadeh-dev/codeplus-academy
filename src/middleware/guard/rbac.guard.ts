import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { env } from "../../config/env";
import { RBACMessags } from "../../constant/messages";
import { JwtPayload } from "../types/index.types";
import {
  Permissions,
  RolePermissions,
  Roles,
} from "../../constant/role.constant";

export const rbacGuard = (
  requiredPermissions: Permissions[] = [],
): RequestHandler => {
  return (req, res, next) => {
    let token = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : req.headers.authorization;

    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return next(createHttpError.Unauthorized(RBACMessags.UNAUTHORIZED));
    }

    try {
      const decoded = jwt.verify(token, env.JWT.ACCESS_SECRET) as JwtPayload & {
        userId: string;
        roles: Roles[];
      };

      req.user = {
        id: decoded.userId,
        roles: decoded.roles,
      };

      const userPermissions = new Set<Permissions>();

      (req.user.roles as Roles[]).forEach((role) => {
        RolePermissions[role].forEach((perm) => userPermissions.add(perm));
      });

      const hasPermission = requiredPermissions.every((perm) =>
        userPermissions.has(perm),
      );

      if (!hasPermission) {
        return res.status(403).json({ message: "شما دسترسی لازم برای انجام این عملیات را ندارید" });
      }
      next();
    } catch (err) {
      next(createHttpError.Unauthorized(RBACMessags.UNAUTHORIZED));
    }
  };
};
