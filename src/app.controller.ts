import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { AppService, CreatePaymentOrderDto, PaymentOrder } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }




  // The real code starts here
@Get('get-proposals')
getProposals(): string[] {
  return this.appService.getProposals()
}


  // The end of real code
}
