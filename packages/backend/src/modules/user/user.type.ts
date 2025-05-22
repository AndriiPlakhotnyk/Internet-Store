export type CreateUserData = {
    email: string;
    fullName: string;
    phoneNumber: string;
    shippingAddress: string;
    hashedPassword: string;
    hashedVerificationCode: string;
}