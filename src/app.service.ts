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



  constructor() {
    this.provider = ethers.getDefaultProvider('goerli')
    this.erc20ContractFactory = new ethers.ContractFactory(tokenJson.abi, tokenJson.bytecode)
   
  }

  getHello(): string {
    return 'This API will be FIRE!!!!!'
  }

// Homework code

getProposals(): string[] {
  return ["NOT IMPLEMENTED"];
   
}

// END of homework code


  async getTotalSupply(address: string): Promise<number> {
    const contractInstance = this.erc20ContractFactory.attach(address).connect(this.provider)
    const totalSupply = await contractInstance.totalSupply()
    return parseFloat(ethers.utils.formatEther(totalSupply))
  }




}
