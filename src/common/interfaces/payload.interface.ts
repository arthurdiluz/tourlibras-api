export interface IJwtPayload {
  sub: number; // userID
  email: string;
  iat?: number; // CreatedAt
  exp?: number; // ExpiresIn
}
