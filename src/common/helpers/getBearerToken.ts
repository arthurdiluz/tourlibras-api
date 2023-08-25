/**
 * Get only the jwt token
 * @param bearerToken Authorization string from header
 * @returns Only the token string
 */

export function getBearerToken(bearerToken: string): string {
  const strings = bearerToken.split(' ');
  const token = strings[strings.length - 1];

  return token;
}
