import api from './api'

export const getEthPrice = async () => {
  const res = await api.get(
    'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
  )
  // @ts-ignore
  return res.data['USD']
}
