import { Router } from "express";
import departmentController from "./department.controller";

const departmentRouter = Router()

departmentRouter.post("/", departmentController.createDepartment);
departmentRouter.get("/", departmentController.getAllDepartments);
departmentRouter.put("/:id", departmentController.updateDepartment);

export default departmentRouter