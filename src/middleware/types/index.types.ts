import { Roles } from "../../constant/role_rbac.constant";

export interface JwtPayload {
  userId: number;
  mobile: string;
  roles: Roles[];
}