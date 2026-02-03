import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import createHttpError from "http-errors";
import { env } from "../../config/env";
import { authMessage } from "../../constant/messages";
import { TokenPair } from "./types/index.types";

class TokenService {

  generateTokens(payload: JwtPayload): TokenPair {
    const accessToken = jwt.sign(payload, env.JWT.ACCESS_SECRET, {
      expiresIn: env.JWT.ACCESS_EXPIRES_IN,
      algorithm: "HS256",
    } as SignOptions);

    const refreshToken = jwt.sign(payload, env.JWT.REFRESH_SECRET, {
      expiresIn: env.JWT.REFRESH_EXPIRES_IN,
      algorithm: "HS256",
    } as SignOptions);

    return { accessToken, refreshToken };
  }

  refreshTokens(token: string): TokenPair {
    try {
      const payload = jwt.verify(token, env.JWT.REFRESH_SECRET) as JwtPayload;
      if (!payload?.userId)
        throw createHttpError.Unauthorized(authMessage.REFRESH_TOKEN_INVALID);

      return this.generateTokens({
        userId: payload.userId,
        mobile: payload.mobile,
      });
    } catch (error) {
      throw createHttpError.Unauthorized(authMessage.REFRESH_TOKEN_EXPIRED);
    }
  }
  
}

export default new TokenService();
