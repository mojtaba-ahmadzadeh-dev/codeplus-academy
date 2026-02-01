import createHttpError from "http-errors";
import { OTP, User } from "../user/user.model"; // ایمپورت مدل User
import { randomInt } from "crypto";

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

     console.log(`OTP for ${mobile}: ${code} (expires at ${expires_in.toISOString()})`);
  }
}

export default new AuthService();
