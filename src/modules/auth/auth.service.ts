import createHttpError from "http-errors";
import { OTP, User } from "../user/user.model"; // ایمپورت مدل User
import { randomInt } from "crypto";
import { authMessage } from "../../constant/messages";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { env } from "../../config/env";

class AuthService {
  private userModel: typeof User;
  private otpModel: typeof OTP;

  constructor() {
    this.userModel = User;
    this.otpModel = OTP;
  }

  async sendOTP(mobile: string): Promise<void> {
    const now = new Date();

    let user = await this.userModel.findOne({ where: { mobile } });
    if (!user) {
      user = await this.userModel.create({ mobile });
    }

    const code = randomInt(100000, 999999).toString().padStart(6, "0");

    const expires_in = new Date(now.getTime() + 2 * 60 * 1000);

    const existingOtp = await this.otpModel.findOne({
      where: { user_id: user.id },
    });

    if (existingOtp) {
      await existingOtp.update({ code, expires_in });
    } else {
      await this.otpModel.create({
        user_id: user.id,
        code,
        expires_in,
      });
    }
  }

  async checkOTP(
    mobile: string,
    code: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: any }> {
    const user = await this.userModel.findOne({ where: { mobile } });

    if (!user) throw createHttpError.NotFound(authMessage.USER_NOT_FOUND);

    const otp = await this.otpModel.findOne({
      where: { user_id: user.id },
      order: [["created_at", "DESC"]],
    });

    if (!otp) throw createHttpError.NotFound(authMessage.OTP_NOT_FOUND);

    if (otp.code !== code)
      throw createHttpError.Unauthorized(authMessage.OTP_INCORRECT);

    if (otp.expires_in < new Date())
      throw createHttpError.BadRequest(authMessage.OTP_EXPIRED);

    await otp.destroy();

    const payload: JwtPayload = {
      userId: user.id,
      mobile: user.mobile,
    };

    const { accessToken, refreshToken } = this.generateTokens(payload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        mobile: user.mobile,
      },
    };
  }

  generateTokens(payload: JwtPayload) {
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
}

export default new AuthService();
