import { Router } from "express";
import authRouter from "../modules/auth/auth.routes";
import userRouter from "../modules/user/user.route";
import RBACRouter from "../modules/RBAC/rbac.route";
import categoryRouter from "../modules/category/category.route";
import courseRouter from "../modules/course/course.route";
import lessionRouter from "../modules/lession/lesson.route";
import captureRouter from "../modules/capture/capture.route";
import courseCommentRouter from "../modules/course-comment/course-comment.route";
import blogRouter from "../modules/blog/blog.route";
import basketRouter from "../modules/basket/basket.route";
import orderRouter from "../modules/order/order.route";
import ticketRouter from "../modules/ticket/ticket.route";

const AllRoutes: Router = Router();

AllRoutes.use(`/auth`, authRouter);
AllRoutes.use(`/users`, userRouter);
AllRoutes.use(`/rbac`, RBACRouter);
AllRoutes.use(`/categories`, categoryRouter);
AllRoutes.use(`/courses`, courseRouter);
AllRoutes.use(`/lessons`, lessionRouter);
AllRoutes.use(`/captures`, captureRouter);
AllRoutes.use(`/course-comments`, courseCommentRouter);
AllRoutes.use(`/blogs`, blogRouter);
AllRoutes.use(`/basket`, basketRouter);
AllRoutes.use(`/order`, orderRouter);
AllRoutes.use(`/tickets`, ticketRouter);

export { AllRoutes };
