import { useState, useContext } from 'react'
import VanillaOptionForm from '../app/components/screens/dapp/VanillaOptionForm'
import WalletContext from '../app/contexts/Wallet.jsx'
import Header from '../app/components/layout/Header.jsx'
import Sidebar from '../app/components/layout/Sidebar'
import Footer from '../app/components/layout/Footer'
import { SidebarMenuLabels } from '../app/configs/Sidebar'



export default function App () {
  const walletValue = useContext(WalletContext)
  const [activeUnit, setActiveUnit] = useState(SidebarMenuLabels[0])

  return (
      <div className='max-w-6xl mx-6 xl:mx-auto '>
        <Header walletAddress={walletValue.wallet} connect={walletValue.request}/>
        <div className='flex space-x-44'>
          <Sidebar walletAddress={walletValue.wallet} activeUnit={activeUnit} setActiveUnit={setActiveUnit}/>
          {activeUnit == 'VanillaOptions' && <VanillaOptionForm />}
        </div>
          <Footer />
      </div>
      )
    }
