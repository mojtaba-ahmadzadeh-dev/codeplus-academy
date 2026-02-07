import { User } from "../../modules/user/user.model";

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: number;
        roles: string[];
      };
    }
  }
}