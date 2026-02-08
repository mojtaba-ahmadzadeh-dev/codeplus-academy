import { Router } from "express";
import courseCommentController from "./course-comment.controller";

const courseCommentRouter = Router()

courseCommentRouter.post('/create', courseCommentController.createComment)
courseCommentRouter.get("/", courseCommentController.getAllComments);

export default courseCommentRouter