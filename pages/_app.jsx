// essential to import tailwind here
import 'tailwindcss/tailwind.css'

import WalletContext from '../app/contexts/Wallet'
import useMetamask from '../app/hooks/useMetamask'


function MyApp({ Component, pageProps }) {
  const walletValue = useMetamask()


  return (
    <WalletContext.Provider value={walletValue}>
        <Component {...pageProps} />
    </WalletContext.Provider>
  )
}

export default MyApp
