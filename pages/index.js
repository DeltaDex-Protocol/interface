import { useState, useContext } from 'react'
import VanillaOptions from '../app/components/screens/dapp/VanillaOptions'
import WalletContext from '../app/contexts/Wallet.jsx'
import Header from '../app/components/layout/Header.jsx'
import Sidebar from '../app/components/layout/Sidebar'


export default function App () {
  const walletValue = useContext(WalletContext)

  return (
      <div className='max-w-6xl mx-6 xl:mx-auto'>
        <Header walletAddress={walletValue.wallet} connect={walletValue.request}/>
        <Sidebar walletAddress={walletValue.wallet} />
        <VanillaOptions />
      </div>
  )
}
