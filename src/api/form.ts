import { DAI, WETH, CoreAddress, OptionStorageAddress } from './constants'
import { CallReplicationType, PutReplicationType } from './form.types'

const { parseUnits } = require('ethers/lib/utils')
const ethers = require('ethers')

const storageABI = require('@/abi/OptionStorage.json')
const storageAddress = OptionStorageAddress

const contractABI = require('@/abi/OptionMaker.json')
const contractAddress = CoreAddress

export const CallReplication = async (formData: CallReplicationType) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const tokenA_balance = parseUnits(formData.tokenA_balance)
  const amount = parseUnits(formData.amount)
  const fee = parseUnits(formData.fee)
  const perDay = parseUnits(formData.perDay, 'wei')

  const K = parseUnits(formData.strike)
  const T = parseUnits(formData.expiration)
  const r = parseUnits(formData.riskFree)
  const sigma = parseUnits(formData.sigma)

  const input = [
    DAI,
    WETH,
    tokenA_balance,
    0,
    true,
    true,
    amount,
    0,
    fee,
    perDay,
    0,
    0,
    [K, T, r, sigma],
  ]

  const signer = provider.getSigner()
  const optionmaker = new ethers.Contract(contractAddress, contractABI, signer)

  try {
    const tx = await optionmaker.BS_START_REPLICATION(input)
    // wait until the transaction is mined
    await tx.wait()
    console.log('success')
    return {
      success: true,
      status:
        '✅ Check out your transaction on Etherscan',
    }
  } catch (error) {
    return {
      success: false,
      // @ts-ignore
      status: '😥 Something went wrong: ' + error.message,
    }
  }
}

export const PutReplication = async (formData: PutReplicationType) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const tokenB_balance = parseUnits(formData.tokenB_balance)
  const amount = parseUnits(formData.amount)
  const fee = parseUnits(formData.fee)
  const perDay = parseUnits(formData.perDay, 'wei')

  const K = parseUnits(formData.strike)
  const T = parseUnits(formData.expiration)
  const r = parseUnits(formData.riskFree)
  const sigma = parseUnits(formData.sigma)

  const input = [
    DAI,
    WETH,
    0,
    tokenB_balance,
    false,
    true,
    amount,
    0,
    fee,
    perDay,
    0,
    0,
    [K, T, r, sigma],
  ]

  const signer = provider.getSigner()
  const optionmaker = new ethers.Contract(contractAddress, contractABI, signer)

  try {
    const tx = await optionmaker.BS_START_REPLICATION(input)
    // wait until the transaction is mined
    await tx.wait()
    console.log('success')
    return {
      success: true,
      status:
        '✅ Check out your transaction on Etherscan',
    }
  } catch (error) {
    return {
      success: false,
      // @ts-ignore
      status: '😥 Something went wrong: ' + error.message,
    }
  }
}


export const ClosePosition = async (ID: number) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const optionmaker = new ethers.Contract(contractAddress, contractABI, signer)

  const optionstorage = new ethers.Contract(
    OptionStorageAddress,
    storageABI,
    signer,
  )

  console.log("here");
  const userAddress = await signer.getAddress()
  const PairAddresses = await optionstorage.getUserPositions(userAddress)
  const PairAddress = PairAddresses[ID];


  try {
    const tx = await optionmaker.BS_Withdraw(PairAddress, ID)
    // wait until the transaction is mined
    await tx.wait()
    console.log('success')
    return {
      success: true,
      status:
        '✅ Check out your transaction on Etherscan',
    }
  } catch (error) {
    return {
      success: false,
      // @ts-ignore
      status: '😥 Something went wrong: ' + error.message,
    }
  }
}
