export type ExpandedRowParamsType =
  | {
      Expiry: string
      Strike: number
      'Contracts amount': number
      'Implied volatility': number
      // 'Liquidity provided': string
      // 'Value to protect': string
      // 'Hedging costs': string
      // 'Last hedge': string
      // 'Option type': string
      Leverage: string
      'Next Hedge': string
      // Advanced: any // TODO: change to model params & position greeks
    }
  | undefined

export type PositionsInfoType = {
  type: string
  pairAddress: string
  currentBalances: Array<string>
  currentPnL: string
  performance: string
  expand: ExpandedRowParamsType
}
