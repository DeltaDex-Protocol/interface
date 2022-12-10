import api from './api'

export const getExpirations = async () => {
  const res = await api.get('http://deltadex.io:5000/optionsdata/expirations')

  // @ts-ignore
  return res.data
}
