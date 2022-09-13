const sliderInfos = {
  strike: {
    title: 'Strike Price',
    min: 300,
    max: 5900,
    step: 50,
    symbol: '$',
  },
  expiry: {
    title: 'Expiration in',
    min: 5,
    max: 500,
    step: 1,
    symbol: ' days',
  },
  totalValue: {
    title: 'Total value invested in Uniswap V2 LP position',
    min: 100,
    max: 20000,
    step: 100,
    symbol: '$',
  },
  OptionAmount: {
    title: 'Contracts amount to replicate',
    min: 1,
    max: 5,
    step: 1,
    symbol: '',
  },
  deltaHedgesPerDay: {
    title: 'Number of delta hedges per day',
    min: 1,
    max: 24,
    step: 1,
    symbol: '',
  },
  feesToHedgers: {
    title: 'Fees to be split between hedgers',
    min: 1,
    max: 900,
    step: 1,
    symbol: '$',
  },
  riskFree: {
    title: 'Risk-free rate',
    min: 0,
    max: 20,
    step: 1,
    symbol: '%',
  },
  token1Balance: {
    title: 'Amount of token 1',
    min: 10,
    max: 10000,
    step: 10,
    symbol: '',
  },
  token2Balance: {
    title: 'Amount of token 2',
    min: 10,
    max: 10000,
    step: 10,
    symbol: '',
  },
}

export { sliderInfos }
