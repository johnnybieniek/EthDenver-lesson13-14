import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { AppService, CreatePaymentOrderDto, PaymentOrder } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('total-supply')
  getTotalSupply(): Promise<number> {
    return this.appService.getTotalSupply()
  }

  @Get('get-proposals')
  getProposals(): Promise<string[]> {
  return this.appService.getProposals()
  }

  @Get('user-balance/:address')
  getUserBalance(@Param('address') address: string): Promise<number> {
    return this.appService.getUserBalance(address)
  }


}
