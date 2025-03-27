import { $Enums, Prisma } from "@prisma/client";

export class User implements Prisma.UserCreateInput {
  id?: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  shippingAddress: string;
  password: string;
  isVerified?: boolean = false;
  verificationCode?: string | null;
  role?: $Enums.Role = $Enums.Role.USER;
  hashedRt?: string | null;
  PasswordResetToken?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
}
