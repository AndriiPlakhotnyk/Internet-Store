import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { randomBytes } from 'crypto';

export async function hashData(data: string): Promise<string> {
  const salt = await bcrypt.genSalt(13);
  return bcrypt.hash(data, salt);
}

export async function verifyHash(data: string, hash: string): Promise<boolean> {
  return bcrypt.compare(data, hash);
}

export function generateSecureFourDigitCode(): string {
  const code = crypto.randomInt(1000, 10000);
  return code.toString();
}

export function generateRandomToken(length: number = 32): string {
  return randomBytes(length).toString('hex');
}
export function convertExpiresInToSeconds(expiresIn: string): number {
  const value = parseInt(expiresIn, 10);
  if (expiresIn.includes('d')) return value * 24 * 60 * 60;
  if (expiresIn.includes('h')) return value * 60 * 60;
  if (expiresIn.includes('m')) return value * 60;
  if (expiresIn.includes('s')) return value;
  return 0;
}


