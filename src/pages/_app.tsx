import { queryClient } from '@/hooks/queries/common/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { FormContextProvider } from '@/context/form/formContext'
import { StateContextProvider } from '@/state'
import { WalletProvider } from '@viaprotocol/web3-wallets'

import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <FormContextProvider>
        <QueryClientProvider client={queryClient}>
          <StateContextProvider>
            <WalletProvider>
              <Head>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, user-scalable=no"
                />
                <title>DeltaDex</title>
              </Head>
              <Component {...pageProps} />
            </WalletProvider>
          </StateContextProvider>
        </QueryClientProvider>
      </FormContextProvider>
    </>
  )
}

export default App
