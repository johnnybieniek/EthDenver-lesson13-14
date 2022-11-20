import { Injectable, ParseFloatPipe } from '@nestjs/common'
import { ethers } from 'ethers'
import * as tokenJson from './assets/MyERC20.json'
import * as tokenizedBallotJson from './assets/tokenizedBallot.json'

const tokenContractAddress = '0xC40ae31250AC7224b3Bc2D036c476D25e9fD16a1' // address of our ERC20 token contract on Goerli
const ballotContractAddress = '0x915575a26a0013D05246ccad3282dF205BEa36Dd' // address of the tokenized Ballot contract on Goerli

@Injectable()
export class AppService {
  provider: ethers.providers.BaseProvider
  signer
  erc20ContractFactory
  ballotContractFactory
  tokenContract
  ballotContract
  STOLEN_PRIVATE = process.env.STOLEN_PRIVATE || ''
  PRIVATE_KEY = process.env.PRIVATE_KEY || ''

  constructor() {
    this.provider = ethers.getDefaultProvider('goerli')
    this.signer = new ethers.Wallet(this.PRIVATE_KEY || '', this.provider)
    this.erc20ContractFactory = new ethers.ContractFactory(tokenJson.abi, tokenJson.bytecode)
    this.ballotContractFactory = new ethers.ContractFactory(
      tokenizedBallotJson.abi,
      tokenizedBallotJson.bytecode,
    )
    this.tokenContract = this.erc20ContractFactory.attach(tokenContractAddress).connect(this.signer)
    this.ballotContract = this.ballotContractFactory
      .attach(ballotContractAddress)
      .connect(this.signer)
  }

  getHello(): string {
    return 'This API will be FIRE!!!!!'
  }

  async getTotalSupply(): Promise<number> {
    const totalSupply = await this.tokenContract.totalSupply()
    return parseFloat(ethers.utils.formatEther(totalSupply))
  }

  async getProposals(): Promise<string[]> {
    const NUM_PROPOSALS = 3
    let proposalArray: string[] = []
    for (let i = 0; i < NUM_PROPOSALS; i++) {
      const proposalName = (await this.ballotContract.proposals(i)).name
      const name = ethers.utils.parseBytes32String(proposalName)
      proposalArray.push(name)
    }
    return proposalArray
  }

  async getUserBalance(address: string): Promise<number> {
    const userBalance = await this.tokenContract.balanceOf(address)
    return parseFloat(ethers.utils.formatEther(userBalance))
  }

  async getWinningProposal(): Promise<string> {
    const winnerNameBytes = await this.ballotContract.winnerName()
    const winnerName = ethers.utils.parseBytes32String(winnerNameBytes)
    return winnerName
  }

  async getProposalVotes(id: number): Promise<number> {
    const currentVoteCount = (await this.ballotContract.proposals(id)).voteCount
    return parseInt(currentVoteCount)
  }

  async getUserVotingPower(address: string): Promise<number> {
    const votingPower = await this.ballotContract.votingPower(address)
    return parseInt(votingPower)
  }
}
