import createHttpError from "http-errors";
import { Department } from "./department.model";
import { departmentMessages } from "../../constant/messages";

class DepartmentService {
  private departmentModel: typeof Department;
  constructor() {
    this.departmentModel = Department;
  }

  private async findDepartmentOrFail(id: number) {
    const department = await this.departmentModel.findByPk(id);
    if (!department)
      throw createHttpError.BadRequest(departmentMessages.DEPARTMENT_NOT_FOUND);
    return department;
  }

  async createDepartment(title: string) {
    const department = await this.departmentModel.create({ title });
    return department;
  }

  async getAllDepartments() {
    const departments = await this.departmentModel.findAll();
    return departments;
  }

  async updateDepartment(id: number, title: string) {
    const department = await this.findDepartmentOrFail(id);
    department.title = title;
    await department.save();
    return department;
  }

  async deleteDepartment(id: number) {
    const department = await this.findDepartmentOrFail(id);
    await department.destroy();
    return true;
  }
}

export default new DepartmentService();
