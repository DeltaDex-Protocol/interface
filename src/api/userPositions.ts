// Copyright 2022 DeltaDex
import {
  CALL_REPLICATION,
  PUT_REPLICATION,
} from '@/views/App/MyPositions/Position/titles'
import Position from '@/views/App/MyPositions/Position'
import { CoreAddress, OptionStorageAddress } from './constants'
import shortenAddress from '@/utils/shortenAddress'
import { PositionsInfoType } from './positions.types'
const { ethers } = require('ethers')
const storageABI = require('@/abi/OptionStorage.json')
const OptionMakerABI = require('@/abi/OptionMaker.json')

type Position = {
  pairAddress: string
  userAddress: string
  id: number

  addressTokenA: string
  addressTokenB: string
  tokenA_balance: string
  tokenB_balance: string
  contractsAmount: number
  isCall: boolean
  leverage: string
  // isLong: boolean

  expiry: number
  fees: string
  perDay: number
  hedgeFee: number

  lastHedgeTimeStamp: number
  nextHedgeTimeStamp: number

  strike: number
  T: number
  r: number
  sigma: number
}

export type UserPositionsType = {
  id: number
  data: PositionsInfoType
}

async function UserPositions(): Promise<UserPositionsType[]> {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const userAddress = await signer.getAddress()

  const optionstorage = new ethers.Contract(
    OptionStorageAddress,
    storageABI,
    signer,
  )

  const optionmaker = new ethers.Contract(CoreAddress, OptionMakerABI, signer)

  const PairAddresses = await optionstorage.getUserPositions(userAddress)

  const numberOfPairs = PairAddresses.length

  let PositionsInfo: UserPositionsType[] = []

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

    let { tokenA, tokenB } = await optionstorage.BS_tokenAddr(
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

    let currentBalance = [tokenA_balance, tokenB_balance]

    let price = await optionmaker.getPrice(tokenB, tokenA)

    let position: Position = {
      pairAddress: pairAddress,
      userAddress: userAddress,
      id: id,

      addressTokenA: positionParams[0],
      addressTokenB: positionParams[1],
      tokenA_balance: Number(
        ethers.utils.formatEther(positionParams[2]),
      ).toFixed(2),
      tokenB_balance: Number(
        ethers.utils.formatEther(positionParams[3]),
      ).toFixed(2),
      contractsAmount: Number(ethers.utils.formatEther(positionParams[6])),
      isCall: positionParams[4],
      leverage: '1x',

      expiry: positionParams[7].toNumber(),
      fees: Number(ethers.utils.formatEther(positionParams[8])).toFixed(2),
      perDay: positionParams[9].toNumber(),
      hedgeFee: Number(ethers.utils.formatEther(positionParams[10])),

      lastHedgeTimeStamp: positionParams[11].toNumber(),
      nextHedgeTimeStamp: nextHedgeTimeStamp(
        positionParams[9].toNumber(),
        positionParams[11].toNumber(),
      ),

      strike: Number(ethers.utils.formatEther(positionParams[12][0])),
      T: Number(ethers.utils.formatEther(positionParams[12][1])),
      r: Number(ethers.utils.formatEther(positionParams[12][2])),
      sigma: Number(ethers.utils.formatEther(positionParams[12][3])),
    }

    // needs to get historical price from somewhere...
    let status = await optionstorage.getPositionStatus(
      pairAddress,
      userAddress,
      id,
    )
    let pnl = await getPnL(1250, price, initialBalance, currentBalance)
    let performance = await getPerformance(
      1250,
      price,
      initialBalance,
      currentBalance,
    )

    PositionsInfo.push({
      id: id,
      data: {
        type: position.isCall ? CALL_REPLICATION : PUT_REPLICATION,
        pairAddress: shortenAddress(position.pairAddress),
        currentBalances: [
          `${position.tokenA_balance} DAI`,
          `${position.tokenB_balance} WETH`,
        ],
        currentPnL: status
          ? `Closed`
          : Number(pnl) > 0
          ? `+${pnl} DAI`
          : `${pnl} DAI`,
        performance: status ? `Closed` : `${performance}%`,
        expand: {
          // 'ID': id,
          'Contracts amount': position.contractsAmount,
          Strike: position.strike,
          'Implied volatility': position.sigma,
          // 'Liquidity provided': '200 USDC',
          // 'Value to protect': '521 1INCH',
          // 'Hedging costs': '33 USDC',
          // 'Last hedge': '2022-11-02 18:30 UTC',
          // 'Option type': 'long put',
          Leverage: position.leverage,
          'Hedges per day': position.perDay,
          'Fee Balance': `${position.fees} DAI`,
          'Next Hedge': status
            ? `-`
            : unixTimeToUTC(position.nextHedgeTimeStamp),
          Expiry: new Date(position.expiry * 1000).toLocaleString('en-US'),

          // Advanced: '', // TODO: change to model params & position greeks
        },
      },
    })
  }
  return PositionsInfo
}

async function getPerformance(
  historicalPrice,
  currentPrice,
  initialBalance,
  currentBalance,
) {
  currentPrice = ethers.utils.formatEther(currentPrice)

  let balanceTokenA = ethers.utils.formatEther(initialBalance[0])
  let balanceTokenB = ethers.utils.formatEther(initialBalance[1])

  let currentBalanceTokenA = ethers.utils.formatEther(currentBalance[0])
  let currentBalanceTokenB = ethers.utils.formatEther(currentBalance[1])

  let p0 = Number(balanceTokenB) * historicalPrice + Number(balanceTokenA)
  let p1 =
    Number(currentBalanceTokenB) * currentPrice + Number(currentBalanceTokenA)

  let pnl = (((p1 - p0) / p0) * 100).toFixed(2)

  return pnl
}

async function getPnL(
  historicalPrice,
  currentPrice,
  initialBalance,
  currentBalance,
) {
  currentPrice = ethers.utils.formatEther(currentPrice)

  let balanceTokenA = ethers.utils.formatEther(initialBalance[0])
  let balanceTokenB = ethers.utils.formatEther(initialBalance[1])

  let currentBalanceTokenA = ethers.utils.formatEther(currentBalance[0])
  let currentBalanceTokenB = ethers.utils.formatEther(currentBalance[1])

  let p0 = Number(balanceTokenB) * historicalPrice + Number(balanceTokenA)
  let p1 =
    Number(currentBalanceTokenB) * currentPrice + Number(currentBalanceTokenA)

  let pnl = (p1 - p0).toFixed(2)

  return pnl
}

function nextHedgeTimeStamp(perDay, lastHedgeTimeStamp) {
  let interval = 86400 / perDay
  let nextTimeStamp = lastHedgeTimeStamp + interval
  return nextTimeStamp
}

function unixTimeToUTC(unixTime) {
  let date = new Date(unixTime * 1000)

  return date.toLocaleString('en-us')
}

export default UserPositions
