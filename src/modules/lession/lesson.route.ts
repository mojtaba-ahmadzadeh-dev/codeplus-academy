import { Router } from "express";
import lessionController from "./lesson.controller";

const lessionRouter = Router()

lessionRouter.post('/create', lessionController.create)
lessionRouter.get('/', lessionController.getAll)
lessionRouter.get('/:id', lessionController.getById)

export default lessionRouter