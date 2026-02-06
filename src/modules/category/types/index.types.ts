import { Optional } from "sequelize";
import { STATUS } from "../../../constant/status.constant";

export interface CategoryAttributes {
  id: number;
  title: string;
  description?: string | null;
  status: (typeof STATUS)[keyof typeof STATUS];
  parentId?: number | null; 
}

export interface CategoryCreationAttributes extends Optional<
  CategoryAttributes,
  "id"
> {}
