import { ROLE } from '@prisma/client';

export interface IJwtPayload {
  sub: number; // userID
  email: string;
  role: ROLE;
  iat?: number; // CreatedAt
  exp?: number; // ExpiresIn
}
