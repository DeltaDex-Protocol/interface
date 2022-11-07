export type Option = {
  currentPrice: number
  strike: number
  expiry: number // in days
  riskFree: number
  volatility: number
  contractAmount: number
}

const putPayoffData = async (params: Option): Promise<Array<number[]>> => {
  const OptionCost = await fetch(
    `/api/get-option-costs?currentPrice=${String(params.currentPrice)}
    &strike=${String(params.currentPrice)}&expiry=${params.expiry}&riskFree=${
      params.riskFree
    }
    &volatility=${params.volatility}&contractAmount=${params.contractAmount}`,
  ).then((res) => res.json())

  console.log(OptionCost)

  const chartPrices: Array<number> = []
  for (let price: number = 0; price < 1.2 * params.currentPrice; price += 1) {
    chartPrices.push(price)
  }
  const putPayoffs: Array<number> = []
  for (let price: number = 0; price < 1.2 * params.currentPrice; price += 1) {
    putPayoffs.push(
      Math.max(0, params.strike - price) * params.contractAmount - OptionCost,
    )
  }

  return [chartPrices, putPayoffs]
}

export default putPayoffData
