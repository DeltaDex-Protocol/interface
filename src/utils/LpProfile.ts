import { get_tokens_amounts } from '@/utils/upd-uniswap-math'
import { xScale } from './constants'

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
  for (
    let price: number = 0;
    price < xScale * params.currentPrice;
    price += 2
  ) {
    chartPrices.push(price)
  }
  const LPpayoff: Array<[number, number]> = []
  for (
    let price: number = 0;
    price < xScale * params.currentPrice;
    price += 2
  ) {
    const { x, y } = get_tokens_amounts(
      params.currentPrice,
      params.lowerPrice,
      params.upperPrice,
      params.depositAmount,
      price,
    )
    LPpayoff.push([price, price * x + y + params.fees])
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
  // return [chartPrices, LPpayoff]
  return LPpayoff
}

export default LpProfileData
