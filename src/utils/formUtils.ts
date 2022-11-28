import { round } from 'mathjs'
import { DAYS_IN_YEAR } from './constants'

export const getNumerrarie = (formData) => {
  const numerrarie =
    formData.advancedSettings.optionType == 'call'
      ? formData.token1
      : formData.advancedSettings.optionType == 'put'
      ? formData.token2
      : undefined

  return numerrarie
}

export const getMinValueForReplication = (formData) => {
  const contractsAmount = Number(formData.contractsAmount)
  const strike = Number(formData.strike)
  const leverage = Number(formData.leverage.slice(1))
  const optionTypeFactor =
    formData.advancedSettings.optionType === 'call' ? strike : 1
  const minimalValue = (optionTypeFactor * contractsAmount) / leverage

  return round(minimalValue, 3)
}

/** Samples of input:
 * (1) '7 Days' -> 0.0192
 * (2) '10' -> 0.0274 */
export const getExpiryDaysToYears = (expiry: string) => {
  expiry = expiry.split(' ')[0]

  return round(Number(expiry) / DAYS_IN_YEAR, 3)
}
