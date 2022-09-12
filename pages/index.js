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
import useEthPrice from '../app/hooks/useEthPrice'



export default function App () {
  const walletValue = useContext(WalletContext)
  const [activeUnit, setActiveUnit] = useState(SidebarMenuKeys[0])
  const [ethPrice, updateEthPrice] = useEthPrice()


  return (
      <div className='max-w-6xl mx-6 xl:mx-auto '>
        <Header walletAddress={walletValue.wallet} connect={walletValue.request}/>
      <div className='md:flex md:space-x-10'>
        <Sidebar walletAddress={walletValue.wallet} activeUnit={activeUnit} setActiveUnit={setActiveUnit}/>
        <div className='mt-10 '>
          {activeUnit == 'VanillaOptions' && <VanillaOptionForm ethPrice={ethPrice}/>}
          {activeUnit == 'CurvedOptions' &&  <CurvedOptionsForm ethPrice={ethPrice}/>}
          {activeUnit == 'YourPositions' &&  <MyPositions ethPrice={ethPrice}/>}
          {activeUnit == 'AllPositions' &&  <AllPositions ethPrice={ethPrice}/>}
        </div>
      </div>
        <Footer />
      </div>
      )
    }
