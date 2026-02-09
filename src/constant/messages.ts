export enum authMessage {
  // OTP
  OTP_SENT_SUCCESS = "کد تایید با موفقیت ارسال شد",
  OTP_REGISTER_SUCCESS = "ثبت نام با موفقیت انجام شد",
  OTP_LOGIN_SUCCESS = "ورود با موفقیت انجام شد",
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
  USER_CREATED_SUCCESSFULLY = "کاربر با موفقیت ساخته شد",
  MOBILE_ALREADY_EXISTS = "شماره موبایل وارد شده قبلاً ثبت شده است",
  BAN_STATUS_REQUIRED = "وضعیت مسدودسازی کاربر الزامی است",
  USER_BANNED = "کاربر با موفقیت مسدود شد",
  USER_UNBANNED = "کاربر از حالت مسدود خارج شد",
  ACCESS_TOKEN_SECRET_NOT_DEFINED = "ACCESS_TOKEN_SECRET not defined",
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
  FORBIDDEN = "دسترسی غیرمجاز. تنها ادمین و مدرس مجاز است",
  ROLE_UPDATE_SUCCESS = "نقش مورد نطر با موفقیت بروزرسانی شد",
  PERMISSIONS_FETCH_SUCCESS = "مجوزها با موفقیت دریافت شدند",
  PERMISSION_UPDATE_SUCCESS = "مجوز موردنظر با موفقیت بروزرسانی شد",
  ROLE_DELETE_SUCCESS = "نقش موردنظر با موفقیت حذف شد",
  PERMISSION_DELETE_SUCCESS = "مجوز مورد نظر با موفقیت حذف شد",
}

export enum CategoryMessages {
  CATEGORY_NOT_FOUND = "دسته‌بندی موردنظر یافت نشد",
  PARENT_NOT_FOUND = "دسته‌بندی والد یافت نشد",
  INVALID_PARENT = "دسته‌بندی نمی‌تواند والد خودش باشد",
  TITLE_ALREADY_EXISTS = "عنوان دسته‌بندی قبلا استفاده شده است",
  CATEGORY_HAS_CHILDREN = "ابتدا زیرمجموعه‌های این دسته‌بندی را حذف کنید",
}

export enum CourseMessages {
  COURSE_CREATED_SUCCESSFULLY = "دوره آموزشی با موفقیت ایجاد شد",
  COURSE_FETCHED_SUCCESSFULLY = "دوره آموزشی با موفقیت دریافت شد",
  COURSES_FETCHED_SUCCESSFULLY = "لیست دوره‌ها با موفقیت دریافت شد",
  COURSE_NOT_FOUND = "دوره مورد نظر یافت نشد",
  COURSE_ALREADY_EXISTS = "دوره‌ای با این عنوان قبلاً وجود دارد",
  COURSE_UPDATED_SUCCESSFULLY = "دوره با موفقیت به‌روزرسانی شد",
  COURSE_DELETED_SUCCESSFULLY = "دوره با موفقیت حذف شد",
}

export enum LessionMessages {
  LESSION_CREATED_SUCCESSFULLY = "درس با موفقیت ایجاد شد",
  LESSION_ALREADY_EXISTS = "این درس برای این دوره قبلاً ایجاد شده است",
  LESSONS_FETCHED_SUCCESSFULLY = "لیست درس‌ها با موفقیت دریافت شد",
  LESSON_FETCHED_SUCCESSFULLY = "درس با موفقیت دریافت شد",
  LESSON_UPDATED_SUCCESSFULLY = "درس با موفقیت ویرایش شد",
  LESSON_DELETED_SUCCESSFULLY = "درس با موفقیت حذف شد",
  LESSON_NOT_FOUND = "درس مورد نظر یافت نشد",
}

export enum CaptureMessages {
  CAPTURE_CREATE_SUCCESSFULLY = "درس موردنظر با موفقیت ایجاد شد",
  CAPTURE_FETCHED_SUCCESSFULLY = "درس ها با موفقیت دریافت شدند",
  CATEGORY_UPDATED_SUCCESSFULLY = "Capture با موفقیت بروزرسانی شد",
  CAPTURE_ALREADY_EXISTS = "این capture قبلاً اضافه شده است",
  CAPTURE_NOT_FOUND = "Capture پیدا نشد",
  CAPTURE_DELETED_SUCCESSFULLY = "Capture با موفقیت حذف شد",
}

export enum CourseCommentMessages {
  COURSE_COMMENT_CREATE_SUCCESSFULLY = "کامنت با موفقیت ایجاد شد",
  COURSE_COMMENT_FETCHED_SUCCESSFULLY = "کامنت‌ها با موفقیت دریافت شدند",
  COURSE_COMMENT_FETCHED_SINGLE_SUCCESSFULLY = "کامنت با موفقیت دریافت شد",
  COURSE_COMMENT_ACCEPTED_SUCCESSFULLY = "کامنت با موفقیت تایید شد",
  COURSE_COMMENT_NOT_FOUND = "کامنت موردنظر پیدا نشد",
  COURSE_COMMENT_REJECTED_SUCCESSFULLY = "کامنت مورد نظر با موفقیت رد شد",
  COURSE_COMMENT_DELETED_SUCCESSFULLY = "کامنت مورد نظر با موفقیت حذف شد",
}
export enum BlogMessages {
  BLOG_CREATE_SUCCESSFULLY = "بلاگ مورد نظر با موفقیت ساخته شد",
  BLOG_FETCHED_SUCCESSFULLY = "بلاگ‌ها با موفقیت دریافت شدند",
  BLOG_NOT_FOUND = "هیچ بلاگی یافت نشد",
  BLOG_NOT_FOUND_SEARCH = 'هیچ بلاگی با عنوان یا محتوای "{search}" یافت نشد',
  BLOG_SINGLE_FETCHED_SUCCESSFULLY = "بلاگ با موفقیت دریافت شد",
  BLOG_UPDATED_SUCCESSFULLY = "بلاگ موردنظر با موفقیت آپدیت شد",
  BLOG_UPDATE_FORBIDDEN = "شما فقط می‌توانید بلاگ‌هایی که خودتان ساخته‌اید را ویرایش کنید.",
  BLOG_DELETED_SUCCESSFULLY = "بلاگ موردنظر با موفقیت حذف شد",
  BLOG_DELETE_FORBIDDEN = "امکان حذف این بلاگ برای شما وجود ندارد"
}