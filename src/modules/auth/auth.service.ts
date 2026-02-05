import createHttpError from "http-errors";
import { OTP, User } from "../user/user.model";
import { randomInt } from "crypto";
import { authMessage } from "../../constant/messages";
import { JwtPayload } from "jsonwebtoken";
import { TokenPair, UserDTO } from "./types/index.types";
import TokenService from "./token.service"; // import درست
import { Roles } from "../../constant/role_rbac.constant";

class AuthService {
  private userModel: typeof User;
  private otpModel: typeof OTP;
  private tokenService = TokenService;

  constructor() {
    this.userModel = User;
    this.otpModel = OTP;
    this.tokenService = TokenService;
  }

  async sendOTP(mobile: string): Promise<void> {
    const now = new Date();
    let user = await this.userModel.findOne({ where: { mobile } });
     if (!user) {
      // اگر کاربر وجود نداشت، بساز
      const userCount = await this.userModel.count();
      const role = userCount === 0 ? Roles.ADMIN : Roles.USER;

      user = await this.userModel.create({ mobile, role });
    }

    const code = randomInt(100000, 999999).toString().padStart(6, "0");
    const expires_in = new Date(now.getTime() + 2 * 60 * 1000);

    const existingOtp = await this.otpModel.findOne({
      where: { user_id: user.id },
    });
    if (existingOtp) await existingOtp.update({ code, expires_in });
    else await this.otpModel.create({ user_id: user.id, code, expires_in });
  }

  async verifyOTP( mobile: string, code: string): Promise<{ accessToken: string; refreshToken: string; user: any }> {
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

      const roles = [user.role as Roles];

    const payload: JwtPayload = { userId: user.id, mobile: user.mobile, roles };
    const { accessToken, refreshToken } =
      this.tokenService.generateTokens(payload);

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, mobile: user.mobile, role: user.role },
    };
  }

  async refreshToken(token: string): Promise<TokenPair> {
    return this.tokenService.refreshTokens(token);
  }

  async getMe(userId: string): Promise<UserDTO> {
    const user = await this.userModel.findOne({ where: { id: userId } });
    if (!user) throw createHttpError.NotFound(authMessage.USER_NOT_FOUND);

    return { id: user.id, mobile: user.mobile };
  }
}

export default new AuthService();
