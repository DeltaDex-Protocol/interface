// Copyright 2022 DeltaDex
import {
  CALL_REPLICATION,
  PUT_REPLICATION,
} from '@/views/App/MyPositions/Position/titles'
import Position from '@/views/App/MyPositions/Position'
import { OptionStorageAddress } from './constants'
import shortenAddress from '@/utils/shortenAddress'
import { PositionsInfoType } from './positions.types'
const { ethers } = require('ethers')
const storageABI = require('@/abi/OptionStorage.json')

type Position = {
  pairAddress: string
  userAddress: string
  id: number

  addressTokenA: string
  addressTokenB: string
  contractsAmount: number
  tokenA_balance: number
  tokenB_balance: number
  isCall: boolean
  leverage: string
  // isLong: boolean

  amount: number
  expiry: number
  fees: number
  perDay: number
  hedgeFee: number

  lastHedgeTimeStamp: number
  nextHedgeTimeStamp: number

  strike: number
  T: number
  r: number
  sigma: number
}

async function UserPositions(): Promise<PositionsInfoType[]> {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const userAddress = await signer.getAddress()

  const optionstorage = new ethers.Contract(
    OptionStorageAddress,
    storageABI,
    signer,
  )
  const PairAddresses = await optionstorage.getUserPositions(userAddress)

  const numberOfPairs = PairAddresses.length

  let PositionsInfo: PositionsInfoType[] = []

  for (let id = 0; id < numberOfPairs; id++) {
    let pairAddress = PairAddresses[id]

    /*
    struct BSOptionParams {
      int K; 
      int T; 
      int r; 
      int sigma; 
    }
    struct BS_params {
      address tokenA;
      address tokenB;

      uint tokenA_balance;
      uint tokenB_balance;

      bool isCall;
      bool isLong;

      uint amount;
      uint expiry;
      uint fees;
      uint perDay;
      uint hedgeFee;

      uint lastHedgeTimeStamp;

      BSOptionParams parameters;
    }
    */
    // all position data
    let positionParams = await optionstorage.BS_allPositionParams(
      pairAddress,
      userAddress,
      id,
    )

    // initial token balances
    let initialBalance = await optionstorage.getInitialBalance(
      pairAddress,
      userAddress,
      id,
    )

    let positionData = await optionstorage.BS_PositionParams(
      pairAddress,
      userAddress,
      id,
    )
    let optionParams = await optionstorage.BS_getDeltaParams(
      pairAddress,
      userAddress,
      id,
    )

    let { tokenA, tokenB } = await optionstorage.BS_tokenAddr(
      pairAddress,
      userAddress,
      id,
    )

    let contractsAmount = await optionstorage.BS_Options_contractAmount(
      pairAddress,
      userAddress,
      id,
    )

    let tokenA_balance = await optionstorage.BS_Options_tokenA_balance(
      pairAddress,
      userAddress,
      id,
    )

    let tokenB_balance = await optionstorage.BS_Options_tokenB_balance(
      pairAddress,
      userAddress,
      id,
    )

    let position: Position = {
      addressTokenA: positionParams[0],
      addressTokenB: positionParams[1],
      tokenA_balance: positionParams[2],
      tokenB_balance: positionParams[3],
      pairAddress: pairAddress,
      userAddress: userAddress,
      leverage: '1x',
      contractsAmount: Number(ethers.utils.formatEther(positionParams[6])),
      id: id,
      amount: Number(ethers.utils.formatEther(positionData[0])),
      expiry: positionData[1].toNumber(),
      fees: Number(ethers.utils.formatEther(positionData[2])),
      perDay: positionData[3].toNumber(),
      hedgeFee: Number(ethers.utils.formatEther(positionData[4])),

      lastHedgeTimeStamp: positionData[5].toNumber(),
      nextHedgeTimeStamp: nextHedgeTimeStamp(
        positionData[3].toNumber(),
        positionData[5].toNumber(),
      ),
      strike: Number(ethers.utils.formatEther(optionParams[0])),
      T: Number(ethers.utils.formatEther(optionParams[1])),
      r: Number(ethers.utils.formatEther(optionParams[2])),
      sigma: Number(ethers.utils.formatEther(optionParams[3])),
      isCall: optionParams[4],
    }
    // console.log(position)
    PositionsInfo.push({
      type: position.isCall ? CALL_REPLICATION : PUT_REPLICATION,
      pairAddress: shortenAddress(position.pairAddress),
      currentBalances: ['150 USDC', '249 1INCH'],
      currentPnL: '+230.48 USDC',
      performance: '93%',
      expand: {
        Expiry: new Date(position.expiry * 1000).toLocaleDateString('en-US'),
        Strike: position.strike,
        'Contracts amount': position.contractsAmount,
        'Implied volatility': position.sigma,
        // 'Liquidity provided': '200 USDC',
        // 'Value to protect': '521 1INCH',
        // 'Hedging costs': '33 USDC',
        // 'Last hedge': '2022-11-02 18:30 UTC',
        // 'Option type': 'long put',
        Leverage: position.leverage,
        'Next Hedge': unixTimeToUTC(position.nextHedgeTimeStamp),
        // Advanced: '', // TODO: change to model params & position greeks
      },
    })
  }
  // return PositionsInfo

  return PositionsInfo
}

function nextHedgeTimeStamp(perDay, lastHedgeTimeStamp) {
  let interval = 86400 / perDay
  let nextTimeStamp = lastHedgeTimeStamp + interval
  return nextTimeStamp
}

function unixTimeToUTC(unixTime) {
  let date = new Date(unixTime * 1000)
  return date.toUTCString()
}

export default UserPositions
