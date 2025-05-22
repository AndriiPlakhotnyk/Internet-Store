/*
  Warnings:

  - You are about to drop the column `delivered_status` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "delivered_status",
ADD COLUMN     "delivery_status" "DeliveryStatus" NOT NULL DEFAULT 'PENDING';
