import { DAI, WETH } from './constants'
import Web3 from 'web3'
const { parseUnits } = require('ethers/lib/utils')
const ethers = require('ethers')
// const { parseUnits } = ethers

// const provider = new ethers.providers.Web3Provider(window.ethereum)
const contractABI = require('@/abi/OptionMaker.json')
const contractAddress = '0xd7a89AEa304A491Ef4B5e74928370059fa53D8C6' // to change

type CallReplicationType = {
  tokenA_balance: string
  amount: string
  fee: string
  perDay: string
  strike: string
  expiration: string
  riskFree: string
  sigma: string
}

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
  // try {
  // const tx = await optionmaker.BS_START_REPLICATION(input)
  // // wait until the transaction is mined
  // console.log('here')
  // await tx.wait()
  // console.log('success')
  try {
    const tx = await optionmaker.BS_START_REPLICATION(input);
    // wait until the transaction is mined
    // // console.log('here')
    await tx.wait();
    console.log('success')
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/",
    };
  } catch (error: any) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }


  // const tx = await optionmaker.connect(accounts[0]).BS_START_REPLICATION(input)
  // wait until the transaction is mined
  // await tx.wait()

  //   const pair = await optionstorage.getPair(DAI, WETH)
  //   console.log('address of pair:', pair)
}
