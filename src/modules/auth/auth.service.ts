import createHttpError from "http-errors";
import { OTP, User } from "../user/user.model"; // ایمپورت مدل User
import { randomInt } from "crypto";
import { authMessage } from "../../constant/messages";

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

    if (!user) user = await this.userModel.create({ mobile });

    const code = randomInt(100000, 999999).toString().padStart(6, "0");

    const expires_in = new Date(now.getTime() + 2 * 60 * 1000);

    await this.otpModel.create({
      user_id: user.id,
      code,
      expires_in,
    });
  }
  async checkOTP(mobile: string, code: string): Promise<void> {
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
  }
}

export default new AuthService();
