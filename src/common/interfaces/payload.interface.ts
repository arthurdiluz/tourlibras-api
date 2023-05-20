export interface IJwtPayload {
  sub: string; // userID
  email: string;
  iat?: number; // CreatedAt
  exp?: number; // ExpiresIn
}
