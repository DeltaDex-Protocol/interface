import { useState, useContext } from 'react'
import { VanillaOptionForm, 
        CurvedOptionsForm, 
        MyPositions, 
        AllPositions } from '../app/components/screens/dapp/index'
import WalletContext from '../app/contexts/Wallet.jsx'
import Header from '../app/components/layout/Header.jsx'
import Sidebar from '../app/components/layout/Sidebar'
import Footer from '../app/components/layout/Footer'
import { SidebarMenuKeys } from '../app/configs/sidebar.config'



export default function App () {
  const walletValue = useContext(WalletContext)
  const [activeUnit, setActiveUnit] = useState(SidebarMenuKeys[0])

  return (
      <div className='max-w-6xl mx-6 xl:mx-auto '>
        <Header walletAddress={walletValue.wallet} connect={walletValue.request}/>
      <div className='flex space-x-44'>
        <Sidebar walletAddress={walletValue.wallet} activeUnit={activeUnit} setActiveUnit={setActiveUnit}/>
        <div className='mt-10 w-screen'>
          {activeUnit == 'VanillaOptions' && <VanillaOptionForm />}
          {activeUnit == 'CurvedOptions' &&  <CurvedOptionsForm />}
          {activeUnit == 'YourPositions' &&  <MyPositions />}
          {activeUnit == 'AllPositions' &&  <AllPositions />}
        </div>
      </div>
        <Footer />
      </div>
      )
    }
