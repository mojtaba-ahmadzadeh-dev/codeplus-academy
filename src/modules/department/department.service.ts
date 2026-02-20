import { Department } from "./department.model";

class DepartmentService {
  private departmentModel: typeof Department;
  constructor() {
    this.departmentModel = Department;
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
    const department = await this.departmentModel.findByPk(id);
    if (!department) return null;

    department.title = title;
    await department.save();
    return department;
  }
}

export default new DepartmentService();
