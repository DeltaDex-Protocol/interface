const curvedOptionInitialValues = {
  token1: 'WETH',
  token2: 'USDC',
  valueToProtect: '100',
  expiresIn: '7 Days',
  leverage: 'x1',
  providedLiquidity: '',
  advancedSettings: {
    feesToSplit: '0.5',
    hedgesPerDay: '4',
    model: {
      BS: {
        sigma: '0.7',
      },
    },
  },
}

export { curvedOptionInitialValues }
