import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { OrderORM } from './order.orm'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/')
  async placeOrder(@Body() orderORM: OrderORM[]) {
    return await this.orderService.placeOrder(orderORM)
  }

  @Get('all')
  async getAll() {
    return await this.orderService.getAll()
  }

  @Get('one/:order_id')
  async getOne(@Param() params) {
    return await this.orderService.getOne(params.order_id)
  }

  @Get('all/user/:user_id')
  async getAllUser(@Param() params) {
    return await this.orderService.getAllUser(params.user_id)
  }
}
