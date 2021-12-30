export interface JwtPayload {
  userId: number;
  tokenVersion?: number;
  iat: number;
  exp: number;
}
