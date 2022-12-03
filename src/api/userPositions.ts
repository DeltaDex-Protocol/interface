// Copyright 2022 DeltaDex
import { OptionStorageAddress } from './constants'
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
  // isLong: boolean

  amount: number
  expiry: number
  fees: number
  perDay: number
  hedgeFee: number

  lastHedgeTimeStamp: number
  nextHedgeTimeStamp: number

  K: number
  T: number
  r: number
  sigma: number
}

async function UserPositions() {
  let userAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

  const provider = new ethers.providers.Web3Provider(window.ethereum)

  const signer = provider.getSigner()

  const optionstorage = new ethers.Contract(
    OptionStorageAddress,
    storageABI,
    signer,
  )
  const PairAddresses = await optionstorage.getUserPositions(userAddress)

  let numberOfPairs = PairAddresses.length
  console.log(numberOfPairs)

  for (let id = 0; id < numberOfPairs; id++) {
    let pairAddress = PairAddresses[id]

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

    let contractsAmount = await optionstorage.BS_Options_getAmount(
      pairAddress,
      userAddress,
      id,
    )

    let tokenA_balance = await optionstorage.BS_Options_getTokenA_bal(
      pairAddress,
      userAddress,
      id,
    )

    let tokenB_balance = await optionstorage.BS_Options_getTokenB_bal(
      pairAddress,
      userAddress,
      id,
    )

    console.log(ethers.utils.formatEther(contractsAmount))

    let position: Position = {
      addressTokenA: tokenA,
      addressTokenB: tokenB,
      tokenA_balance: tokenA_balance,
      tokenB_balance: tokenB_balance,
      pairAddress: pairAddress,
      userAddress: userAddress,
      contractsAmount: Number(ethers.utils.formatEther(contractsAmount)),
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
      K: Number(ethers.utils.formatEther(optionParams[0])),
      T: Number(ethers.utils.formatEther(optionParams[1])),
      r: Number(ethers.utils.formatEther(optionParams[2])),
      sigma: Number(ethers.utils.formatEther(optionParams[3])),
      isCall: optionParams[4],
    }
    console.log(id)
    console.log(position)
  }
}

function nextHedgeTimeStamp(perDay, lastHedgeTimeStamp) {
  let interval = 86400 / perDay
  let nextTimeStamp = lastHedgeTimeStamp + interval
  return nextTimeStamp
}

export default UserPositions
