import { number, round } from 'mathjs'
import api from './api'

export const getExpirations = async () => {
  const res = await api.get('https://deltadex.io/optionsdata/expirations')

  // @ts-ignore
  return res.data
}

export const EvaluateOption = async (strike, expirationDate, isCall) => {
  const res: {
    data: { data: { underlying_price; implied_volatility; price } }
  } = await api.get(
    `https://deltadex.io/optionsdata/get-option-price?strike=${strike}&expiry=${expirationDate}&iscall=${isCall}`,
  )
  return {
    underlying_price: round(res.data.data.underlying_price, 3),
    strike: strike,
    expirationDate: expirationDate,
    implied_volatility: round(res.data.data.implied_volatility, 3),
    price: round(res.data.data.price, 3),
  }
}
