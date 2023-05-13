export interface IPayload {
  sub: string;
  email: string;
  refreshToken?: string;
  iat: number;
  exp: number;
}
