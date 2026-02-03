export enum authMessage {
  // OTP
  OTP_SENT_SUCCESS = "کاربر با موفقیت ثبت نام شد",
  OTP_VERIFIED_SUCCESS = "کد تأیید با موفقیت بررسی شد",
  MOBILE_INVALID = "شماره موبایل وارد شده نامعتبر است",
  MOBILE_REQUIRED = "وارد کردن شماره موبایل الزامی است",
  CODE_REQUIRED = "وارد کردن کد تأیید الزامی است",
  CODE_INVALID = "کد تأیید وارد شده نامعتبر است",
  USER_NOT_FOUND = "کاربر با این شماره موبایل یافت نشد.",
  OTP_NOT_FOUND = "کد تأیید یافت نشد",
  OTP_EXPIRED = "کد تأیید منقضی شده است",
  OTP_INCORRECT = "کد تأیید وارد شده نامعتبر است",

  // Access Token
  UNAUTHORIZED = "توکن دریافت نشد، لطفاً مجدداً وارد شوید",
  ACCESS_TOKEN_INVALID = "توکن دسترسی معتبر نیست",
  ACCESS_TOKEN_EXPIRED = "زمان اعتبار توکن شما به پایان رسیده است. لطفاً دوباره وارد شوید.",
  ACCESS_TOKEN_NOT_DEFINED = "توکن دسترسی در سرور تعریف نشده است",

  // Refresh Token
  REFRESH_TOKEN_INVALID = "توکن معتبر نیست",
  REFRESH_TOKEN_EXPIRED = "رفرش توکن نامعتبر یا منقضی شده است",
  REFRESH_TOKEN_SUCCESS = "توکن با موفقیت رفرش شد",
  REFRESH_TOKEN_NOT_FOUND = "رفرش توکن پیدا نشد",

  // User
  GET_ME_SUCCESS = "اطلاعات کاربر با موفقیت دریافت شد",
  LOGOUT_SUCCESS = "خروج با موفقیت انجام شد",
}
