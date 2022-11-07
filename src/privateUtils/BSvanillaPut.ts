import cdfNormal from './some-math'
import { Option } from '@/utils/optionsPayoff'

export const BSvanillaPut = async (params): Promise<number> => {
  var S = Number(params.currentPrice)
  var K = Number(params.strike)
  var T = Number(params.expiry) / 365
  var r = Number(params.riskFree)
  var sigma = Number(params.volatility)
  var amount = Number(params.contractAmount)

  var d1 = (Math.log(S / K) + (r + sigma ** 2 / 2) * T) / (sigma * Math.sqrt(T))
  var d2 = d1 - sigma * Math.sqrt(T)

  var d1Normal = cdfNormal(-d1)
  var d2Normal = cdfNormal(-d2)

  const putPrice = K * d2Normal * Math.exp(-r * T) - S * d1Normal

  return putPrice * amount
}

export const deltaBSvanillaPut = async (params): Promise<number> => {
  var S = Number(params.currentPrice)
  var K = Number(params.strike)
  var T = Number(params.expiry)
  var r = Number(params.riskFree)
  var sigma = Number(params.volatility)
  var amount = Number(params.contractAmount)

  var d1 = (Math.log(S / K) + (r + sigma ** 2 / 2) * T) / (sigma * Math.sqrt(T))

  var d1Normal = cdfNormal(d1)

  var putDelta = d1Normal - 1

  return putDelta * amount
}

export default { BSvanillaPut, deltaBSvanillaPut }
