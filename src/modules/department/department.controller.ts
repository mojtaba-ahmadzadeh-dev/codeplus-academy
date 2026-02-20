import { Request, Response, NextFunction } from "express";
import departmentService from "./department.service";

class DepartmentController {
  private departmentService: typeof departmentService;
  constructor() {
    this.departmentService = departmentService;

    this.createDepartment = this.createDepartment.bind(this);
    this.getAllDepartments = this.getAllDepartments.bind(this);
    this.updateDepartment = this.updateDepartment.bind(this);
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

  async getAllDepartments(req: Request, res: Response, next: NextFunction) {
    try {
      const departments = await this.departmentService.getAllDepartments();
      res.status(200).json({
        statusCode: 200,
        message: "Departments retrieved successfully",
        data: departments,
      });
    } catch (error) {
      next(error);
    }
  }

   async updateDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title } = req.body;

      const updated = await this.departmentService.updateDepartment(Number(id), title);

      res.status(200).json({
        statusCode: 200,
        message: "Department updated successfully",
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new DepartmentController();
