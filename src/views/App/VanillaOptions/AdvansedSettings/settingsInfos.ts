export const settingsInfo = {
  feesToSplit: {
    desc: 'Fees per rebalancing - DAI',
    type: 'input',
    advanced: false,
    tooltip: 'FEES_TO_SPLIT',
  },
  hedgesPerDay: {
    desc: 'Number of rebalances per day',
    type: 'input',
    advanced: false,
    tooltip: 'HEDGES_PER_DAY',
  },
  // optionType: { desc: 'Option type', type: 'dropdown' },
  // risk: { desc: 'Risk', type: 'input' },
  volatility: {
    desc: 'Implied volatility',
    type: 'input',
    advanced: true,
    tooltip: 'VOLATILITY',
  },
  // feesToSplit: { desc: 'Fees per hedge - DAI', type: 'input' },
}
