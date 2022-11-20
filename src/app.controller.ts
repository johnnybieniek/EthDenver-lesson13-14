import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { AppService } from './app.service'

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

  @Get('winning-proposal')
  getWinningProposal(): Promise<string> {
    return this.appService.getWinningProposal()
  }

  @Get('get-proposal-votes/:id')
  getProposalVotes(@Param('id') id: number): Promise<number> {
    return this.appService.getProposalVotes(id)
  }

  @Get('user-voting-power/:address')
  getUserVotingPower(@Param('address') address: string): Promise<number> {
    return this.appService.getUserVotingPower(address)
  }

  @Get('get-all-votes')
  getAllVotes(): Promise<number[]> {
    return this.appService.getAllVotes()
  }

  @Get('mint-tokens/:address')
  mintTokens(@Param('address') address: string): Promise<string> {
    return this.appService.mintTokens(address)
  }
}
