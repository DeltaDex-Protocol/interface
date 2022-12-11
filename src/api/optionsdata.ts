import { number, round } from 'mathjs'
import api from './api'

export const getExpirations = async () => {
  const res = await api.get('http://deltadex.io:5000/optionsdata/expirations')

  // @ts-ignore
  return res.data
}

export const EvaluateOption = async (strike, expirationDate, isCall) => {
  const res = await api.get(
    `http://deltadex.io:5000/optionsdata/get-option-price?strike=${strike}&expiry=${expirationDate}&iscall=${isCall}`,
  )
  // @ts-ignore
  return {
    strike: strike,
    expirationDate: expirationDate,
    // @ts-ignore
    implied_volatility: round(res.data.data.implied_volatility, 3),
    // @ts-ignore
    price: round(res.data.data.price, 3),
  }
}
