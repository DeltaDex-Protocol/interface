// essential to import tailwind here
import 'tailwindcss/tailwind.css'

import WalletContext from '../app/contexts/Wallet'
import useMetamask from '../app/hooks/useMetamask'



function MyApp({ Component, pageProps }) {
  const walletValue = useMetamask()


  return (
    <div className='h-full w-full bg-gradient-to-r from-slate-900 to-indigo-900'>
      <WalletContext.Provider value={walletValue}>
          <Component {...pageProps} />
      </WalletContext.Provider>
    </div>
  )
}

export default MyApp