// department.types.ts
export interface DepartmentAttributes {
  id: number;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// تایپ ورودی برای ایجاد دپارتمان
export interface DepartmentCreationAttributes
  extends Omit<DepartmentAttributes, "id" | "createdAt" | "updatedAt"> {}