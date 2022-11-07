import {} from './helper'

// def get_liquidity_0(x, sa, sb):
// return x * sa * sb / (sb - sa)

// def get_liquidity_1(y, sa, sb):
// return y / (sb - sa)

// def get_liquidity(x, y, sp, sa, sb):
// if sp <= sa:
//     liquidity = get_liquidity_0(x, sa, sb)
// elif sp < sb:
//     liquidity0 = get_liquidity_0(x, sp, sb)
//     liquidity1 = get_liquidity_1(y, sa, sp)
//     liquidity = min(liquidity0, liquidity1)
// else:
//     liquidity = get_liquidity_1(y, sa, sb)
// return liquidity

// #
// # Calculate x and y given liquidity and price range
// #
// def calculate_x(L, sp, sa, sb):
// sp = max(min(sp, sb), sa)     # if the price is outside the range, use the range endpoints instead
// return L * (sb - sp) / (sp * sb)

// def calculate_y(L, sp, sa, sb):
// sp = max(min(sp, sb), sa)     # if the price is outside the range, use the range endpoints instead
// return L * (sp - sa)

// def get_tokens_amounts(initial_price, lowerPrice, upperPrice, initial_y, currentPrice):
//     sp = initial_price ** 0.5
//     sa = lowerPrice ** 0.5
//     sb = upperPrice ** 0.5
//     current_sp = currentPrice ** 0.5
//     L = uniMath.get_liquidity_1(initial_y, sa, sp)
//     x = uniMath.calculate_x(L, current_sp, sa, sb)
//     y = uniMath.calculate_y(L, current_sp, sa, sb)
//     return (x, y)

const get_liquidity_0 = (x, sa, sb) => {
  return (x * sa * sb) / (sb - sa)
}

const get_liquidity_1 = (y, sa, sb) => {
  return y / (sb - sa)
}

const get_liquidity = (x, y, sp, sa, sb) => {
  let liquidity
  if (sp <= sa) {
    liquidity = get_liquidity_0(x, sa, sb)
  } else if (sp < sb) {
    let liquidity0 = get_liquidity_0(x, sp, sb)
    let liquidity1 = get_liquidity_1(y, sa, sp)
    liquidity = Math.min(liquidity0, liquidity1)
  } else {
    liquidity = get_liquidity_1(y, sa, sb)
  }
  return liquidity
}

// Calculate x and y given liquidity and price range

const calculate_x = (L, sp, sa, sb) => {
  sp = Math.max(Math.min(sp, sb), sa) // if the price is outside the range, use the range endpoints instead
  return (L * (sb - sp)) / (sp * sb)
}

const calculate_y = (L, sp, sa, sb) => {
  sp = Math.max(Math.min(sp, sb), sa) // if the price is outside the range, use the range endpoints instead
  return L * (sp - sa)
}

const get_tokens_amounts_by_initial_y = (
  initial_price,
  lowerPrice,
  upperPrice,
  initial_y,
  currentPrice,
) => {
  let sp = initial_price ** 0.5
  let sa = lowerPrice ** 0.5
  let sb = upperPrice ** 0.5
  let current_sp = currentPrice ** 0.5
  let L = get_liquidity_1(initial_y, sa, sp)
  let x = calculate_x(L, current_sp, sa, sb)
  let y = calculate_y(L, current_sp, sa, sb)
  return { x, y }
}

const uniswapV3_TV = (S, priceUpper, priceLower, initial_y, initial_price) => {
  let { x, y } = get_tokens_amounts_by_initial_y(
    initial_price,
    priceLower,
    priceUpper,
    initial_y,
    S,
  )

  return x * S + y
}

const get_tokens_amounts = (
  initial_price,
  lowerPrice,
  upperPrice,
  depositAmount,
  currentPrice,
) => {
  let sp = initial_price ** 0.5
  let sa = lowerPrice ** 0.5
  let sb = upperPrice ** 0.5
  let current_sp = currentPrice ** 0.5

  // this is correct formula
  let initial_y =
    (sa * sb * depositAmount - sb * sp * depositAmount) /
    (sa * sb - 2 * sb * sp + sp ** 2)

  let L = get_liquidity_1(initial_y, sa, sp)
  let x = calculate_x(L, current_sp, sa, sb)
  let y = calculate_y(L, current_sp, sa, sb)
  return { x, y }
}

export { get_tokens_amounts, get_tokens_amounts_by_initial_y, uniswapV3_TV }
