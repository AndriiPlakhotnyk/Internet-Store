import { PaymentStatus } from "@prisma/client";

export function getRandomPaymentStatus(): PaymentStatus {
  return Math.random() < 0.5 ? PaymentStatus.COMPLETE : PaymentStatus.FAILED;
}
