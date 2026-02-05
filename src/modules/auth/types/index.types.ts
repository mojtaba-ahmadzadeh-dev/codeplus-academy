export interface JwtPayload {
  userId: number;
  mobile: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface UserDTO {
  id: number;
  mobile: string;
  full_name: string | null;
  avatar: string | null;
  is_banned: boolean;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    mobile: string;
  };
}

