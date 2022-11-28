export type ExpandedRowParamsType =
  | {
      Expiry: string
      'Liquidity provided': string
      'Value to protect': string
      'Expected costs for replication': string
      // 'Last hedge': string
      'Option type': string
      Leverage: string
      Advanced: any // TODO: change to model params & position greeks
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