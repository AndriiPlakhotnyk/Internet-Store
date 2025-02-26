import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

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


