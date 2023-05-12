import { hash, verify, needsRehash, argon2i } from 'argon2';

/**
 * Hash a string with Argon2
 * @param text String to be hashed
 * @returns Promise of the hashed string
 */

export async function hashString(text: string): Promise<string> {
  let textHash: string = undefined;

  do {
    textHash = await hash(text, {
      hashLength: 32,
      timeCost: 3,
      memoryCost: 65536,
      parallelism: 4,
      type: argon2i,
      raw: false,
      saltLength: 16,
    });
  } while (needsRehash(textHash) && (await verify(text, textHash)));

  return textHash;
}
