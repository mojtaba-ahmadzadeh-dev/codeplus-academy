import Joi from "joi";
import { validate } from "../../middleware/validate/validate.middleware";

// Create Blog
const createBlogSchema = Joi.object({
  title: Joi.string().max(200).required().messages({
    "any.required": "عنوان الزامی است",
    "string.empty": "عنوان نمی‌تواند خالی باشد",
    "string.max": "عنوان نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد",
  }),

  content: Joi.string().required().messages({
    "any.required": "محتوا الزامی است",
    "string.empty": "محتوا نمی‌تواند خالی باشد",
  }),
});

// Update Blog
const updateBlogSchema = Joi.object({
  title: Joi.string().max(200).messages({
    "string.max": "عنوان نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد",
  }),

  content: Joi.string().messages({
    "string.empty": "محتوا نمی‌تواند خالی باشد",
  }),
}).min(1);

// Get All Blogs (pagination & search)
const getAllBlogsSchema = Joi.object({
  search: Joi.string().allow("").optional(),

  page: Joi.number().integer().min(1).messages({
    "number.base": "شماره صفحه باید عدد باشد",
    "number.min": "شماره صفحه معتبر نیست",
  }),

  limit: Joi.number().integer().min(1).max(50).messages({
    "number.base": "تعداد باید عدد باشد",
    "number.min": "حداقل تعداد ۱ است",
    "number.max": "حداکثر تعداد ۵۰ است",
  }),

  sort: Joi.string().valid("newest", "oldest").messages({
    "any.only": "مقدار sort معتبر نیست",
  }),
});

//  Get Blog By Id (param)
const getBlogByIdSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "any.required": "شناسه بلاگ الزامی است",
    "number.base": "شناسه باید عدد باشد",
    "number.integer": "شناسه باید عدد صحیح باشد",
  }),
});

//  Toggle Bookmark
const toggleBookmarkSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "any.required": "شناسه بلاگ الزامی است",
    "number.base": "شناسه باید عدد باشد",
  }),
});

//   Like or Dislike
const likeSchema = Joi.object({
  isLike: Joi.boolean().required().messages({
    "any.required": "وضعیت like الزامی است",
    "boolean.base": "مقدار باید true یا false باشد",
  }),
});

export const validateCreateBlog = validate(createBlogSchema);
export const validateUpdateBlog = validate(updateBlogSchema);
export const validateGetAllBlogs = validate(getAllBlogsSchema);
export const validateGetBlogById = validate(getBlogByIdSchema);
export const validateToggleBookmark = validate(toggleBookmarkSchema);
export const validateLike = validate(likeSchema);
