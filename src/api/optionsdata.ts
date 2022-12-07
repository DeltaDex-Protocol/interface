import api from './api'

export const getExpirations = async () => {
    const res = await api.get(
      'http://localhost:5000/optionsdata/expirations',
    )
//   const res = fetch('http://localhost:5000/optionsdata/expirations', {
//     method: "GET", 
//     mode: 'cors',
//     headers: {
//         'Content-Type': 'application/json',
//     }
// }).then(
//     (response) => {
//       if (!response.ok) {
//         throw new Error(response.statusText)
//       }
//       return response.json()
//     },
//   )

    // @ts-ignore
    return res.data
}
