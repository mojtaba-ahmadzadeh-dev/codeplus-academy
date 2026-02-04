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

export enum userMessage {
  GET_ALL_USERS_SUCCESSFULLY = "تمام کاربران با موفقیت دریافت شدند",
  GET_USER_SUCCESSFULLY = "کاربر با موفقیت دریافت شد",
  UPDATE_USER_SUCCESSFULLY = "کاربر با موفقیت بروزرسانی شد",
  DELETE_USER_SUCCESSFULLY = "کاربر موردنظر با موفقیت حذف شد",
  USER_NOT_FOUND = "کاربر موردنظر یافت نشد",
  ROLE_IS_REQUIRED = "نقش کاربر الزامی است",
  ACCESS_TOKEN_SECRET_NOT_DEFINED = "ACCESS_TOKEN_SECRET not defined"
}

export enum RBACMessags {
  PERMISSION_ALREADY_EXISTS = "مجوز مورد نظر از قبل وجود دارد",
  PERMISSION_CREATE_SUCCESS = "مجوز با موفقیت ایجاد شد",

  ROLE_ALREADY_EXISTS = "نقش مورد نظر از قبل وجود دارد",
  ROLE_CREATE_SUCCESS = "نقش با موفقیت ایجاد شد",
  ROLE_ASSIGN_SUCCESS = "نقش با موفقیت اختصاص داده شد",

  ROLE_NOT_FOUND = "نقش مورد نظر یافت نشد",
  PERMISSION_NOT_FOUND = "یک یا چند مجوز یافت نشد",

  PERMISSION_ASSIGN_SUCCESS = "مجوزها با موفقیت به نقش اختصاص داده شدند",

  USER_NOT_FOUND = "کاربر مورد نظر یافت نشد",
  UNAUTHORIZED = "دسترسی غیرمجاز. لطفاً وارد شوید",
  FORBIDDEN = "دسترسی غیرمجاز. تنها ادمین مجاز است",
};
