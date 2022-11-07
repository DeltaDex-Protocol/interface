// import { getTokenAmountsFromDepositAmounts } from './liquidityMath'
import { get_tokens_amounts } from '@/utils/upd-uniswap-math'

type LP = {
  currentPrice: number
  lowerPrice: number
  upperPrice: number
  priceUSDX: number
  priceUSDY: number
  depositAmount: number
}

const LpProfileData = async (params: LP): Promise<number[][]> => {
  const chartPrices: Array<number> = []
  for (let price: number = 0; price < 1.2 * params.currentPrice; price += 1) {
    chartPrices.push(price)
  }
  const LPpayoff: Array<number> = []
  for (let price: number = 0; price < 1.2 * params.currentPrice; price += 1) {
    // const { amount0, amount1 } = getTokenAmountsFromDepositAmounts(
    //   price,
    //   params.lowerPrice,
    //   params.upperPrice,
    //   params.priceUSDX,
    //   params.priceUSDY,
    //   params.depositAmount,
    // )

    const { x, y } = get_tokens_amounts(
      params.currentPrice,
      params.lowerPrice,
      params.upperPrice,
      params.depositAmount,
      price,
    )
    LPpayoff.push(price * x + y)
  }
  return [chartPrices, LPpayoff]
}

export default LpProfileData

// const P = 1300
// const Pl = 1300
// const Pu = 1700
// const priceUSDX = 1500
// const priceUSDY = 1
// const targetAmounts = 1000
