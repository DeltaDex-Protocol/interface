import { QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { StateContextProvider } from '@/state'
import { WalletProvider } from '@viaprotocol/web3-wallets'
import { Header, Footer } from '@/components/layout'
import { MobileMenu } from '@/components/layout'
import { BetaVersionAlert } from '@/components/layout'

import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="">
      {/* <QueryClientProvider client={queryClient}> */}
      <StateContextProvider>
        <WalletProvider>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, user-scalable=no"
            />
            <title>DeltaDex</title>
          </Head>
          <div className="min-h-screen">
            <Header />
            {/* @ts-ignore */}
            <Component {...pageProps} />
          </div>
          <div className='relative'>
            <BetaVersionAlert />
            <Footer />
          </div>
          <MobileMenu />
        </WalletProvider>
      </StateContextProvider>
      {/* </QueryClientProvider> */}
    </div>
  )
}

export default App
