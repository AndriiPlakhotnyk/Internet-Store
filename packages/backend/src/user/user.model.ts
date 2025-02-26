import { $Enums, Prisma } from "@prisma/client";

export class User implements Prisma.UserCreateInput {
    id?: string | undefined;
    email: string;
    fullName: string;
    phoneNumber: string;
    shippingAddress: string;
    password: string;
    isVerified?: boolean | undefined;
    verificationCode?: string | null | undefined;
    role?: $Enums.Role | undefined;
    accessToken?: string | null | undefined;
    refreshToken?: string | null | undefined;
    
}