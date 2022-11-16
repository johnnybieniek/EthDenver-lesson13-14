import { Injectable } from '@nestjs/common'
import { ethers } from 'ethers'
import * as tokenJson from './assets/MyERC20.json'

export class CreatePaymentOrderDto {
  value: number
  secret: string
}

export class PaymentOrder {
  value: number
  id: number
  secret: string
}

@Injectable()
export class AppService {
  provider: ethers.providers.BaseProvider
  erc20ContractFactory

  paymentOrders: PaymentOrder[]

  constructor() {
    this.provider = ethers.getDefaultProvider('goerli')
    this.erc20ContractFactory = new ethers.ContractFactory(tokenJson.abi, tokenJson.bytecode)
    this.paymentOrders = []
  }

  getHello(): string {
    return 'Hello Jan and World!'
  }

  getBlock(blockNumberOrTag = 'latest') {
    return this.provider.getBlock(blockNumberOrTag)
  }

  async getTotalSupply(address: string): Promise<number> {
    const contractInstance = this.erc20ContractFactory.attach(address).connect(this.provider)
    const totalSupply = await contractInstance.totalSupply()
    return parseFloat(ethers.utils.formatEther(totalSupply))
  }

  getPaymentOrder(id: number) {
    return { value: this.paymentOrders[id].value, id: this.paymentOrders[id].id }
  }

  createPaymentOrder(value: number, secret: string) {
    const newOrder = new PaymentOrder()
    newOrder.value = value
    newOrder.secret = secret
    newOrder.id = this.paymentOrders.length
    this.paymentOrders.push(newOrder)
    return newOrder.id
  }
}
