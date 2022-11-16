import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { AppService, CreatePaymentOrderDto, PaymentOrder } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('block/:hash')
  getBlock(@Param('hash') hash: string) {
    return this.appService.getBlock(hash)
  }

  @Get('total-supply/:address')
  getTotalSupply(@Param('address') address: string) {
    return this.appService.getTotalSupply(address)
  }

  @Get('payment-order/:id')
  getPaymentOrder(@Param('id') id: number): any {
    return this.appService.getPaymentOrder(id)
  }

  @Post('payment-order')
  createPaymentOrder(@Body() body: CreatePaymentOrderDto): number {
    return this.appService.createPaymentOrder(body.value, body.secret)
  }
}
