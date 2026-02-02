export interface JwtPayload {
  userId: number;
  mobile: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}