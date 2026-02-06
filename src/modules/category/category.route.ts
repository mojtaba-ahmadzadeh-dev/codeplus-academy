import { Router } from "express";
import categoryController from "./category.controller";

const categoryRouter: Router = Router();

categoryRouter.post('/create', categoryController.create)
categoryRouter.get("/", categoryController.getAll);

export default categoryRouter