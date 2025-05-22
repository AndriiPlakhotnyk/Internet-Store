-- AlterTable
ALTER TABLE "order" ADD COLUMN     "delivered_status" "DeliveryStatus" NOT NULL DEFAULT 'PENDING';
