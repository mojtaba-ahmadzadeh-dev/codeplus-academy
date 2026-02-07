import { Router } from "express";
import lessionController from "./lesson.controller";

const lessionRouter = Router()

lessionRouter.post('/create', lessionController.create)
lessionRouter.get('/', lessionController.getAll)
lessionRouter.get('/:id', lessionController.getById)
lessionRouter.put('/update/:id', lessionController.update)
lessionRouter.delete("/delete/:id", lessionController.delete);

export default lessionRouter