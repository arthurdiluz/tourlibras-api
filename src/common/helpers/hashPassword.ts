import { hash, verify, needsRehash } from 'argon2';

export async function hashPassword(password: string): Promise<string> {
  let passwordHash: string = undefined;

  do {
    passwordHash = await hash(password);
  } while (needsRehash(passwordHash) && (await verify(password, passwordHash)));

  return passwordHash;
}
