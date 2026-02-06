import { Roles } from "../../constant/role.constant";

export interface JwtPayload {
  userId: number;
  mobile: string;
  roles: Roles[];
}