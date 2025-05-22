import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { OrderDetailService } from './order-details.service';
import { AccessTokenGuard } from '@/modules/security/guards';
import { CreateOrderDetailDto, UpdateQuantityDetailDto } from '@/dto/order-detail';

@Controller('order-details')
export class OrderDetailController {
    constructor(private readonly orderDetailService: OrderDetailService) {}

    @Post()
    @UseGuards(AccessTokenGuard)
    createOrderDetails(@Body() dto: CreateOrderDetailDto) {
        return this.orderDetailService.createOrderDetail(dto);
    }

    @Get('order/:orderId')
    @UseGuards(AccessTokenGuard)
    findAllOrderDetails(
        @Param('orderId') orderId: string,
    ) {
        return this.orderDetailService.getAllOrderDetails(orderId);
    }

    @Get(':id')
    @UseGuards(AccessTokenGuard)
    findById(@Param('id') id: string) {
        return this.orderDetailService.getOrderDetailById(id);
    }

    @Patch(':id')
    @UseGuards(AccessTokenGuard)
    updateQuantityDetail(@Param('id') id: string, @Body() dto: UpdateQuantityDetailDto) {
        console.log('DETAILS_CONTROLLER_WORK')
        return this.orderDetailService.updateOrderDetail(id, dto);
    }

    @Delete(':id')
    @UseGuards(AccessTokenGuard)
    removeOrderDetails(@Param('id') id: string) {
        return this.orderDetailService.deleteOrderDetail(id);
    }

    @Delete()
    @UseGuards(AccessTokenGuard)
    removeAllOrdersAndDetails() {
        return this.orderDetailService.deleteAll();
    }
}
