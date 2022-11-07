import { get_tokens_amounts } from '@/utils/upd-uniswap-math'

type LP = {
  currentPrice: number
  lowerPrice: number
  upperPrice: number
  priceUSDX: number
  priceUSDY: number
  depositAmount: number
  fees: number
}

const LpProfileData = async (params: LP): Promise<Array<number[]>> => {
  const chartPrices: Array<number> = []
  for (let price: number = 0; price < 1.2 * params.currentPrice; price += 1) {
    chartPrices.push(price)
  }
  const LPpayoff: Array<number> = []
  for (let price: number = 0; price < 1.2 * params.currentPrice; price += 1) {
    const { x, y } = get_tokens_amounts(
      params.currentPrice,
      params.lowerPrice,
      params.upperPrice,
      params.depositAmount,
      price,
    )
    LPpayoff.push(price * x + y + params.fees)
    // if (price === 1000) {
    //   console.log()
    //   console.log(
    //     get_tokens_amounts(
    //       params.currentPrice,
    //       params.lowerPrice,
    //       params.upperPrice,
    //       params.depositAmount,
    //       price,
    //     ),
    //   )
    // }
  }
  return [chartPrices, LPpayoff]
}

export default LpProfileData
