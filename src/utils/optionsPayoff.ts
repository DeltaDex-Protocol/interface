import { xScale } from './constants'

export type Option = {
  currentPrice: number
  strike: number
  expiry: number // in days
  riskFree: number
  volatility: number
  contractAmount: number
  optionCost: number
}

export const putPayoffData = async (
  params: Option,
): Promise<Array<number[]>> => {
  // console.log(OptionCost)

  const chartPrices: Array<number> = []
  for (
    let price: number = 0;
    price < xScale * params.currentPrice;
    price += 2
  ) {
    chartPrices.push(price)
  }
  const putPayoffs: Array<[number, number]> = []
  for (
    let price: number = 0;
    price < xScale * params.currentPrice;
    price += 2
  ) {
    putPayoffs.push([
      price,
      Math.max(0, params.strike - price) * params.contractAmount -
        params.optionCost,
    ])
  }

  // return [chartPrices, putPayoffs]
  return putPayoffs
}

export const callPayoffData = async (
  params: Option,
): Promise<Array<number[]>> => {
  // console.log(OptionCost)

  const chartPrices: Array<number> = []
  for (
    let price: number = 0;
    price < xScale * params.currentPrice;
    price += 2
  ) {
    chartPrices.push(price)
  }
  const callPayoffs: Array<[number, number]> = []
  for (
    let price: number = 0;
    price < xScale * params.currentPrice;
    price += 2
  ) {
    callPayoffs.push([
      price,
      Math.max(0, price - params.strike) * params.contractAmount -
        params.optionCost,
    ])
  }

  // return [chartPrices, putPayoffs]
  return callPayoffs
}

export default { putPayoffData, callPayoffData }
