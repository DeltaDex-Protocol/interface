import { createContext } from 'react'
const Wallet = createContext({
    wallet: "",
    balance: "",
    request: () => {},
})

export default Wallet;