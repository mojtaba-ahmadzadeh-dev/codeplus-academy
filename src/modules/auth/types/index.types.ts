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
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    mobile: string;
  };
}

