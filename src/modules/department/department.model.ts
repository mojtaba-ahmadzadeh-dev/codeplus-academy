import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";

export interface DepartmentAttributes {
  id: number;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DepartmentCreationAttributes
  extends Omit<DepartmentAttributes, "id" | "createdAt" | "updatedAt"> {}

class Department
  extends Model<DepartmentAttributes, DepartmentCreationAttributes>
  implements DepartmentAttributes
{
  public id!: number;
  public title!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "department",
    tableName: "departments",
    timestamps: true,
  }
);

export { Department };