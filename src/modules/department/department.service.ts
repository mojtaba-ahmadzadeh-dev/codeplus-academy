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

}

export default new DepartmentService();
