-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
