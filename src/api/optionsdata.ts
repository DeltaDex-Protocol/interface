import api from './api'

export const getExpirations = async () => {
  const res = await api.get('http://localhost:5000/optionsdata/expirations')

  // @ts-ignore
  return res.data
}
