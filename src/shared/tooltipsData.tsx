export const VANILLA_OPTIONS_TOOLTIPS = {
  EXPIRATION: 'Select expiration as if you were buying a real option',
  STRIKE: 'Set the strike price as if you were buying a real option ',
  LEVERAGE:
    'Leveraging allows to decrease amount of liquidity required for replication. However, it increases the risks of being liquidated',
  CONTRACTS_AMOUNT:
    'Set the amount of option contracts as if you were buying a real option',
  FEES_TO_SPLIT:
    'Replication requires a rebalancing every several hours. Set the reward for the users who will hedge your position.',
  HEDGES_PER_DAY: 'Set the amount of rebalances within one day',
  VOLATILITY: (
    <span>
      <span className="text-red ">Advanced:</span> manually set the Implied
      volatility of an option. By default, implied volatility fetches
      automatically
    </span>
  ),
}

export const MY_POSITIONS_TOOLTIPS = {
  Type: '',
  'Pair address': '',
  'Current balances': '',
  'Current PnL': 'Current PnL of the replication. This can be interpreted as a PnL of if you bought a real option initially and sold just now',
  Performance: 'Relative deviation between PnL of a real option (if you bought a real option initially and sold just now) and a PnL of the replication',
  Details: '',
}
