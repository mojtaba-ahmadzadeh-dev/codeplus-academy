import { User } from "../user/user.model";

export interface IUser {
  id?: number;
  mobile: string;
  full_name?: string | null;
  avatar?: string | null;
  is_banned?: boolean;
  isAdmin?: boolean;
  role: string;
  created_at?: Date;
}

export interface IOTP {
  id?: number;
  user_id: number;
  code: string;
  expires_in: Date;
  created_at?: Date;
  user?: User;
}
