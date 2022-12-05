import { DAI, WETH, CoreAddress, OptionStorageAddress } from './constants'
import { CallReplicationType, PutReplicationType } from './form.types'

const { parseUnits } = require('ethers/lib/utils')
const ethers = require('ethers')

const storageABI = require('@/abi/OptionStorage.json')
const coreABI = require('@/abi/OptionMaker.json')

const ERC20ABI = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  "function approve(address spender, uint amount) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

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
  const optionmaker = new ethers.Contract(CoreAddress, coreABI, signer)

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
  const optionmaker = new ethers.Contract(CoreAddress, coreABI, signer)

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

export const approveDAI = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  const signer = provider.getSigner()

  const token = new ethers.Contract(DAI, ERC20ABI, signer)
  const amount = await token.balanceOf(signer.getAddress())

  try {
    const tx = await token.approve(CoreAddress, amount)
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

export const approveWETH = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  const signer = provider.getSigner()

  const token = new ethers.Contract(WETH, ERC20ABI, signer)
  const amount = await token.balanceOf(signer.getAddress())

  try {
    const tx = await token.approve(CoreAddress, amount)
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


export const getUserBalance = async (TokenAddress: string) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  const token = new ethers.Contract(TokenAddress, ERC20ABI, signer)
  const address = await signer.getAddress()
  const balance = await token.balanceOf(address);

  return balance
}


export const ClosePosition = async (ID: number) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const optionmaker = new ethers.Contract(CoreAddress, coreABI, signer)

  const optionstorage = new ethers.Contract(
    OptionStorageAddress,
    storageABI,
    signer,
  )

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
