import { round, erf } from 'mathjs'
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

// BLACK SCHOLES 
function cdfNormal (x) {
  return (1 - erf(-x / (Math.sqrt(2)))) / 2
}

function D1(S, K, T, r, sigma) {
  let d1 = (Math.log(S/K) + (r + Math.pow(sigma, 2)/2) * T) / (sigma * Math.sqrt(T));
  return d1;
}

function D2(d1, sigma, T) {
  let d2 = d1 - sigma * Math.sqrt(T);
  return d2;
}

function blackScholes(S, K, T, r, sigma, isCall) {
  let d1 = D1(S, K, T, r, sigma);
  let d2 = D2(d1, sigma, T);
  let call = S * cdfNormal(d1) - K * Math.exp(-r * T) * cdfNormal(d2);
  let put = K * Math.exp(-r * T) * cdfNormal(-d2) - S * cdfNormal(-d1);

  return isCall ? call : put;
}

function getExpiryInDays(expiry) {
  expiry = expiry.split(' ')[0]

  return Number(expiry)
}

function getExpiryInYears(expiry) {
  expiry = expiry.split(' ')[0]

  return round(Number(expiry) / DAYS_IN_YEAR, 3)
}

export const getHedgeCost = (formData) => {
  const feesToSplit = formData.advancedSettings.feesToSplit;
  const perDay = formData.advancedSettings.hedgesPerDay;
  const hedgeCost = feesToSplit * perDay * getExpiryInDays(formData.expiresIn);
  return hedgeCost;
}

export const getOptionPrice = (formData) => {
  const feesToSplit = formData.advancedSettings.feesToSplit;
  const perDay = formData.advancedSettings.hedgesPerDay;
  const hedgeCost = feesToSplit * perDay * getExpiryInDays(formData.expiresIn)

  const S = 1257;
  // let S = ethers.utils.formatEther(await optionmaker.getPrice(WETH, DAI));

  const K = formData.strike;
  const T = getExpiryInYears(formData.expiresIn);
  const r = 0.1;
  const sigma = 0.75;
  const isCall = formData.advancedSettings.optionType === 'call' ? true: false;

  const C = blackScholes(S, K, T, r, sigma, isCall);

  const optionPrice = C + hedgeCost;

  return round(optionPrice, 2)
}