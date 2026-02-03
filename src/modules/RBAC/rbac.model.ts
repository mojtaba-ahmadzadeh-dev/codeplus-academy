import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from "../../config/sequelize.config";

export class Role extends Model {
  declare id: CreationOptional<number>;
  declare name: string; 
  declare description: string | null;
  declare created_at: CreationOptional<Date>;
}

Role.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    description: { type: DataTypes.STRING(255), allowNull: true },
  },
  {
    sequelize,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    modelName: "role",
    tableName: "roles",
  }
);


export class Permission extends Model {
  declare id: CreationOptional<number>;
  declare name: string; 
  declare description: string | null;
  declare created_at: CreationOptional<Date>;
}

Permission.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    description: { type: DataTypes.STRING(255), allowNull: true },
  },
  {
    sequelize,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    modelName: "permission",
    tableName: "permissions",
  }
);


export class RolePermission extends Model {
  declare id: CreationOptional<number>;
  declare role_id: number;
  declare permission_id: number;
}

RolePermission.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    role_id: { type: DataTypes.INTEGER, allowNull: false },
    permission_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "role_permission",
    tableName: "role_permissions",
  }
);

export class UserRole extends Model {
  declare id: CreationOptional<number>;
  declare user_id: number;
  declare role_id: number;
}

UserRole.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    role_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "user_role",
    tableName: "user_roles",
  }
);