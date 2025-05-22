import { Body, Controller, Patch, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "@/dto/payment/create-payment.dto";
import { UpdatePaymentStatusDto } from "@/dto/payment/update-payment-status.dto";

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post()
    async createPayment(@Body() dto: CreatePaymentDto) {
        console.log('CONTROLLER_METHOD_START', dto)
        return this.paymentService.payOrder(dto);
    }

    @Patch()
    async updatePayment(@Body() dto: UpdatePaymentStatusDto) {
        return this.paymentService.updatePaymentStatus(dto);
    }
}