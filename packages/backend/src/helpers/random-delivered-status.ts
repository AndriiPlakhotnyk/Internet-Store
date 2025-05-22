import { DeliveryStatus } from "@prisma/client";

export function getRandomDeliveryStatus(): DeliveryStatus {
  return Math.random() < 0.5 ? DeliveryStatus.DELIVERED : DeliveryStatus.IN_TRANSIT;
}
