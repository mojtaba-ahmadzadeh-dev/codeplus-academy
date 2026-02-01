export enum authMessage {
  OTP_SENT_SUCCESS = "کاربر با موفقعیت ثبت نام شد",
  OTP_VERIFIED_SUCCESS = "کد تأیید با موفقیت بررسی شد",
  MOBILE_INVALID = "شماره موبایل وارد شده نامعتبر است",
  MOBILE_REQUIRED = "وارد کردن شماره موبایل الزامی است",
  CODE_REQUIRED = "وارد کردن کد تأیید الزامی است",
  CODE_INVALID = "کد تأیید وارد شده نامعتبر است",
  USER_NOT_FOUND = "کاربر با این شماره موبایل یافت نشد.",
  OTP_NOT_FOUND = "کد تأیید یافت نشد",
  OTP_EXPIRED = "کد تأیید منقضی شده است", 
  OTP_INCORRECT = "کد تأیید وارد شده نامعتبر است", 
}
