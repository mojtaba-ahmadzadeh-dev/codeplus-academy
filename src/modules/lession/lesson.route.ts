import { Router } from "express";
import lessionController from "./lesson.controller";

const lessionRouter = Router()

lessionRouter.post('/create', lessionController.create)

export default lessionRouter