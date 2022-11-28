export const settingsInfo = {
  feesToSplit: { desc: 'Fees to split (in usdcs per hedge)', type: 'input' },
  hedgesPerDay: { desc: 'Amount of delta-hedges per day', type: 'input' },
  optionType: { desc: 'Option type', type: 'dropdown' },
  modelParams: { desc: 'Model used for replication', type: 'dropdown' },
}
export const SettingsArrays = {
  optionType: ['call', 'put'],
  modelParams: ['Black-Scholes'],
}
