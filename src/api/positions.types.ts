export type ExpandedRowParamsType =
  | {
      'Contracts amount': number
      Strike: number
      'Implied volatility': number
      // 'Liquidity provided': string
      // 'Value to protect': string
      // 'Hedging costs': string
      // 'Last hedge': string
      // 'Option type': string
      Leverage: string
      'Hedges per day': number
      'Fee Balance': string

      'Next Hedge': string
      Expiry: string
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
