import { Request, Response, NextFunction } from "express";
import departmentService from "./department.service";

class DepartmentController {
  private departmentService: typeof departmentService;
  constructor() {
    this.departmentService = departmentService;

    this.createDepartment = this.createDepartment.bind(this);
  }

  async createDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.body;

      if (!title) {
        return res.status(400).json({ message: "Department name is required" });
      }

      const department = await this.departmentService.createDepartment(title);
      res.status(201).json(department);
    } catch (error) {
      next(error);
    }
  }
  
}

export default new DepartmentController();
