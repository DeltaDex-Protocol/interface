export const settingsInfo = {
  feesToSplit: { desc: 'Fees per hedge - DAI', type: 'input' },
  hedgesPerDay: { desc: 'Number of delta hedges per day', type: 'input' },
  optionType: { desc: 'Option type', type: 'dropdown' },
  risk: { desc: 'Risk', type: 'input' },
  modelParams: { desc: 'Model used for replication', type: 'dropdown' },
}
export const SettingsArrays = {
  optionType: ['call', 'put'],
  modelParams: ['Black-Scholes'],
}
