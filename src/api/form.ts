const { parseUnits } = require('ethers/lib/utils')
import { DAI, WETH } from './constants'

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

const CallReplication = async (formData: CallReplicationType) => {
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

  //   const tx = await optionmaker.connect(accounts[0]).BS_START_REPLICATION(input)
  // wait until the transaction is mined
  //   await tx.wait()

  //   const pair = await optionstorage.getPair(DAI, WETH)
  //   console.log('address of pair:', pair)
}
