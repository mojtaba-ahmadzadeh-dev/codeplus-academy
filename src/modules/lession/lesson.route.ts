import { Router } from "express";
import lessionController from "./lesson.controller";

const lessionRouter = Router()

lessionRouter.post('/create', lessionController.createLesson)
lessionRouter.get('/', lessionController.getAllLesson)
lessionRouter.get('/:id', lessionController.getByIdLesson)
lessionRouter.put('/update/:id', lessionController.updateLesson)
lessionRouter.delete("/delete/:id", lessionController.deleteLesson);

export default lessionRouter