import { add } from 'mathjs'
import { ExpandedRowParamsType, PositionsInfoType } from './positions.types'

const pseudoData: PositionsInfoType[] = [
  {
    type: 'Put replication',
    pairAddress: '0x2aff...2290',
    currentBalances: ['150 USDC', '249 1INCH'],
    currentPnL: '+230.48 USDC',
    performance: '93%',
    expand: {
      Expiry: '2022-12-02 00:00 UTC',
      Strike: 1500,
      'Contracts amount': 1.2,
      'Implied volatility': 0.75,
      // 'Liquidity provided': '200 USDC',
      // 'Value to protect': '521 1INCH',
      // 'Hedging costs': '33 USDC',
      // 'Last hedge': '2022-11-02 18:30 UTC',
      // 'Option type': 'long put',
      Leverage: '2x',
      // Advanced: '', // TODO: change to model params & position greeks
    },
  },
  {
    type: 'Put replication',
    pairAddress: '0x0ef1...f210',
    currentBalances: ['100 USDC', '97 1INCH'],
    currentPnL: '+120.26 USDC',
    performance: '96%',
    expand: {
      Expiry: '2022-12-02 00:00 UTC',
      'Liquidity provided': '200 1INCH',
      // 'Value to protect': '521 1INCH',
      'Hedging costs': '33 USDC',
      // 'Last hedge': '2022-11-02 18:30 UTC',
      'Option type': 'long put',
      Leverage: '2x',
      Advanced: '', // TODO: change to model params & position greeks
    },
  },
]

export const getPositionsInfo = async (
  id: number,
): Promise<PositionsInfoType[]> => {
  return pseudoData
}
