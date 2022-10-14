const curvedOptionInitialValues = {
  token1: 'WETH',
  token2: 'USDC',
  type: 'curved', // or vanilla
  valueToProtect: '',
  expiresIn: '7 Days',
  leverage: 'x1',
  providedLiquidity: '',
  advancedSettings: {
    feesToSplit: '0.5',
    hedgesPerDay: '4',
    optionType: 'put',
    modelName: 'Black-Scholes',
    modelParams: {
      sigma: '0.7',
    },
  },
}

export { curvedOptionInitialValues }
