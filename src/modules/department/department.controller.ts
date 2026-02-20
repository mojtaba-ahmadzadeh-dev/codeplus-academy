import { Request, Response, NextFunction } from "express";
import departmentService from "./department.service";
import { departmentMessages } from "../../constant/messages";

class DepartmentController {
  private departmentService: typeof departmentService;
  constructor() {
    this.departmentService = departmentService;

    this.createDepartment = this.createDepartment.bind(this);
    this.getAllDepartments = this.getAllDepartments.bind(this);
    this.updateDepartment = this.updateDepartment.bind(this);
    this.deleteDepartment = this.deleteDepartment.bind(this);
  }

  async createDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.body;

      const department = await this.departmentService.createDepartment(title);
      res.status(201).json({
        message: departmentMessages.DEPARTMENT_CREATE_SUCCESSFULLY,
        department
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllDepartments(req: Request, res: Response, next: NextFunction) {
    try {
      const departments = await this.departmentService.getAllDepartments();
      res.status(200).json({
        statusCode: 200,
        message: departmentMessages.DEPARTMENT_FETCHED_SUCCESSFULLY,
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

      const updated = await this.departmentService.updateDepartment(
        Number(id),
        title,
      );

      res.status(200).json({
        statusCode: 200,
        message: departmentMessages.DEPARTMENT_UPDATE_SUCCESSFULLY,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const deleted = await this.departmentService.deleteDepartment(Number(id));

      res.status(200).json({
        statusCode: 200,
        message: departmentMessages.DEPARTMENT_DELETE_SUCCESSFULLY,
        deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new DepartmentController();
