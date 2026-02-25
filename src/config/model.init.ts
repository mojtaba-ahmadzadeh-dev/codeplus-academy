import { sequelize } from "../config/sequelize.config";
import { Blog } from "../modules/blog/entities/blog.model";
import { Bookmark } from "../modules/blog/entities/blog-bookmarks.model";
import { Capture } from "../modules/capture/capture.model";
import { Category } from "../modules/category/category.model";
import { CourseComment } from "../modules/course-comment/course-comment.model";
import { Course } from "../modules/course/entities/course.model";
import { Lesson } from "../modules/lession/lesson.model";
import { Permission, Role, RolePermission } from "../modules/RBAC/rbac.model";
import { Reaction } from "../modules/blog/entities/blog-likes.model";
import { OTP, User } from "../modules/user/user.model";
import { CourseBookmark } from "../modules/course/entities/course-bookmarks.model";
import { CourseReaction } from "../modules/course/entities/course-likes.model";
import { Basket } from "../modules/basket/basket.model";
import { Order } from "../modules/order/order.model";
import { Ticket } from "../modules/ticket/ticket.model";
import { Department } from "../modules/department/department.model";
import { Notification } from "../modules/notification/notification.model";
import { BlogComment } from "../modules/blog-comment/blog-comment.model";
import { Room } from "../modules/suport/entities/room.model";
import { Message } from "../modules/suport/entities/message.model";
import { Conversation } from "../modules/suport/entities/conversation.model";
import { Location } from "../modules/suport/entities/location.model";

const initDatabase = async (): Promise<void> => {
  // User → OTP
  User.hasMany(OTP, { foreignKey: "user_id" });
  OTP.belongsTo(User, { foreignKey: "user_id" });

  // Role ↔ Permission (Many-to-Many)
  Role.belongsToMany(Permission, {
    through: RolePermission,
    foreignKey: "role_id",
  });
  Permission.belongsToMany(Role, {
    through: RolePermission,
    foreignKey: "permission_id",
  });

  // Category → Category (Self reference)
  Category.hasMany(Category, { as: "children", foreignKey: "parentId" });
  Category.belongsTo(Category, { as: "parent", foreignKey: "parentId" });

  // User → Course
  User.hasMany(Course, { foreignKey: "teacher_id", as: "coursesTaught" });
  Course.belongsTo(User, { foreignKey: "teacher_id", as: "teacher" });

  // Category → Course
  Category.hasMany(Course, { foreignKey: "category_id" });
  Course.belongsTo(Category, { foreignKey: "category_id" });

  // Course → Lesson
  Course.hasMany(Lesson, {
    foreignKey: "courseId",
    onDelete: "CASCADE",
    hooks: true,
  });
  Lesson.belongsTo(Course, { foreignKey: "courseId" });

  // Course → Capture
  Course.hasMany(Capture, {
    foreignKey: "courseId",
    onDelete: "CASCADE",
    hooks: true,
  });
  Capture.belongsTo(Course, { foreignKey: "courseId" });

  // User → CourseComment
  User.hasMany(CourseComment, { foreignKey: "userId" });
  CourseComment.belongsTo(User, { foreignKey: "userId" });

  // Blog → User & Category
  Blog.belongsTo(User, { foreignKey: "authorId" });
  Blog.belongsTo(Category, { foreignKey: "categoryId" });

  // Category → Blog
  Category.hasMany(Blog, { foreignKey: "categoryId" });

  // User → Blog (Author)
  User.hasMany(Blog, { foreignKey: "authorId" });

  // User ↔ Blog (Bookmark Many-to-Many)
  User.belongsToMany(Blog, {
    through: Reaction,
    foreignKey: "userId",
    as: "likedBlogs",
  });
  Blog.belongsToMany(User, {
    through: Reaction,
    foreignKey: "blogId",
    as: "usersWhoLiked",
  });

  // User → Bookmark
  User.belongsToMany(Blog, {
    through: Bookmark,
    foreignKey: "userId",
    otherKey: "blogId",
    as: "bookmarkedBlogs",
  });

  // Blog → Reaction

  Blog.belongsToMany(User, {
    through: Bookmark,
    foreignKey: "blogId",
    otherKey: "userId",
    as: "usersWhoBookmarked",
  });

  Reaction.belongsTo(Blog, { foreignKey: "blogId" });

  // User → Reaction
  User.hasMany(Reaction, { foreignKey: "userId" });
  Reaction.belongsTo(User, { foreignKey: "userId" });

  // User ↔ Course (Bookmark Many-to-Many)
  User.belongsToMany(Course, {
    through: CourseBookmark,
    foreignKey: "userId",
    as: "bookmarkedCourses",
  });
  Course.belongsToMany(User, {
    through: CourseBookmark,
    foreignKey: "courseId",
    as: "usersWhoBookmarked",
  });

  // User → CourseBookmark
  User.hasMany(CourseBookmark, { foreignKey: "userId" });

  // User ↔ Course (Likes Many-to-Many) - اصلاح شده
  User.belongsToMany(Course, {
    through: CourseReaction,
    foreignKey: "userId",
    as: "likedCourses", // مهم برای include
  });
  Course.belongsToMany(User, {
    through: CourseReaction,
    foreignKey: "courseId",
    as: "usersWhoLikedCourses",
  });

  // Course → CourseReaction
  Course.hasMany(CourseReaction, {
    foreignKey: "courseId",
    as: "courseReactions",
  });
  CourseReaction.belongsTo(Course, { foreignKey: "courseId" });

  // User → CourseReaction
  User.hasMany(CourseReaction, { foreignKey: "userId" });
  CourseReaction.belongsTo(User, { foreignKey: "userId" });

  User.hasOne(Basket, { foreignKey: "userId", as: "basket" });
  Basket.belongsTo(User, { foreignKey: "userId", as: "user" });

  // Basket → Course
  Basket.belongsTo(Course, { foreignKey: "courseId", as: "course" });

  // User → Order
  User.hasMany(Order, { foreignKey: "userId", as: "orders" });
  Order.belongsTo(User, { foreignKey: "userId", as: "user" });

  // Course → Order
  Course.hasMany(Order, { foreignKey: "courseId", as: "orders" });
  Order.belongsTo(Course, { foreignKey: "courseId", as: "course" });

  User.hasMany(Ticket, { foreignKey: "userId", as: "tickets" });
  Ticket.belongsTo(User, { foreignKey: "userId", as: "user" });

  Department.hasMany(Ticket, { foreignKey: "departmentId", as: "tickets" });
  Ticket.belongsTo(Department, {
    foreignKey: "departmentId",
    as: "department",
  });

  User.hasMany(Notification, {
    foreignKey: "userId",
    as: "notifications",
    onDelete: "CASCADE",
  });

  // Notification -> User
  Notification.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  // User → BlogComment
  User.hasMany(BlogComment, {
    foreignKey: "userId",
    as: "comments",
    onDelete: "CASCADE",
  });
  BlogComment.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  // Blog → BlogComment
  Blog.hasMany(BlogComment, {
    foreignKey: "blogId",
    as: "comments",
    onDelete: "CASCADE",
  });
  BlogComment.belongsTo(Blog, {
    foreignKey: "blogId",
    as: "blog",
  });

  Room.hasMany(Message, { foreignKey: "roomId", as: "messages" });
  Message.belongsTo(Room, { foreignKey: "roomId" });

  Room.hasMany(Location, { foreignKey: "roomId", as: "locations" });
  Location.belongsTo(Room, { foreignKey: "roomId" });

  Conversation.hasMany(Room, { foreignKey: "conversationId", as: "rooms" });
  Room.belongsTo(Conversation, { foreignKey: "conversationId" });

  // sequelize.sync({alter: true})
  console.log("✅ Database associations initialized successfully");
};

export { initDatabase };
