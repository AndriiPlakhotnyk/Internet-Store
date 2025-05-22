import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AccessTokenGuard } from '@/modules/security/guards';
import { GetUserDecorator } from '@/decorators';
import { CreateDetailForOrderDto } from '@/dto/order-detail';
import { UpdateOrderDto } from '@/dto/order';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @UseGuards(AccessTokenGuard)
    makeOrderWithDetails(
        @Body() dto: CreateDetailForOrderDto[],
        @GetUserDecorator('id') userId: string
    ) {
        return this.orderService.createOrderWithDetails(dto, userId);
    }

    @Get('orders')
    @UseGuards(AccessTokenGuard)
    findAllOrders(
        @Query('payment') paymentStatus?: 'Pending' | 'Complete' | 'Failed',
        @Query('delivery') deliveryStatus?: 'Pending' | 'InTransit' |  'Delivered',
        @Query('date') dateSort?: 'asc' | 'desc',
    ) {
        return this.orderService.getAllOrders(paymentStatus, deliveryStatus, dateSort);
    }

    @Get(':id')
    @UseGuards(AccessTokenGuard)
    findOrderById(@Param('id') id: string) {
        return this.orderService.getOrderById(id);
    }

    @Put(':id')
    @UseGuards(AccessTokenGuard)
    updateOrder(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
        return this.orderService.updateOrder(id, dto);
    }

    @Delete(':id')
    @UseGuards(AccessTokenGuard)
    removeOrder(@Param('id') orderId: string) {
        return this.orderService.deleteOrder(orderId);
    }
}
