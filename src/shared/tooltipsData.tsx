export const VANILLA_OPTIONS_TOOLTIPS = {
  EXPIRATION: 'Select expiration as if you were buying a real option',
  STRIKE: 'Set the strike price as if you were buying a real option ',
  LEVERAGE:
    'Leverage decreases the amout of liquidity required for replication. However, it increases the risk of your position being liquidated',
  CONTRACTS_AMOUNT:
    'Set the amount of option contracts for replication',
  FEES_TO_SPLIT:
    'Option replication requires portfolio rebalancing every several hours. Set the fee reward for the users who will hedge your position.',
  HEDGES_PER_DAY: 'Set the number of delta hedges per day.',
  VOLATILITY: (
    <span>
      <span className="text-red ">Advanced:</span> Manually set the implied
      volatility of an option. By default, implied volatility is set
      automatically.
    </span>
  ),
}

export const MY_POSITIONS_TOOLTIPS = {
  Type: '',
  'Pair address': '',
  'Current balances': '',
  'Current PnL': 'Current PnL of the replication. This can be interpreted as a PnL of if you bought a real option at initially and sold just now',
  Performance: 'Relative deviation between PnL of a real option (if you bought a real option initially and sold just now) and a PnL of the replication',
  Details: '',
}
