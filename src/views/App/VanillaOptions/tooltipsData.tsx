export const TOOLTIPS_DATA = {
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
