import ChevronRight from '../components/ChevronRight'
import Dialog from '../components/Dialog'
import React, { useState, useEffect, useContext } from 'react'
import { getWallets, wallets } from '@depay/web3-wallets'
import { NavigateStackContext } from '@depay/react-dialog-stack'

export default (props)=>{

  const [showExplanation, setShowExplanation] = useState(false)
  const { navigate } = useContext(NavigateStackContext)
  const wallet = getWallets()[0]
  
  useEffect(()=>{
    (
      async ()=>{
        if(wallet) {
          let account = await wallet.account()
          if(account == undefined) {
            navigate('ConnectingWallet')
            props.connect(wallet)
          }
        }
      }
    )()
  }, [wallet])

  const connect = (walletClass)=>{
    let wallet = new walletClass()
    props.setWallet(wallet)
    navigate('ConnectingWallet')
    props.connect(wallet)
  }

  let availableWallets = [wallets.WalletConnect, wallets.WalletLink]
  if(wallet) { availableWallets.unshift(wallet.constructor) }

  let walletCards = availableWallets.map((wallet, index)=>{
    let name = wallet.info.name
    if(name == 'WalletConnect') { name = 'via WalletConnect' }
    return(
      <div key={index} className="PaddingBottomXS">
        <button
          className="Card small"
          title={`Connect ${name}`}
          onClick={()=>connect(wallet)}
        >
          <div className="CardImage square">
            <img className="transparent" src={wallet.info.logo}/>
          </div>
          <div className="CardBody">
            <div className="CardBodyWrapper PaddingLeftXS">
              <h2 className="CardText FontWeightBold">
                { name }
              </h2>
            </div>
          </div>
        </button>
      </div>
    )
  })

  return(
    <Dialog
      header={
        <div className="PaddingTopS PaddingLeftM PaddingRightM TextLeft">
          <h1 className="LineHeightL FontSizeL">Select a wallet</h1>
        </div>
      }
      body={
        <div className="PaddingBottomS PaddingLeftS PaddingRightS">
          { walletCards }
        </div>
      }
      footer={
        <div className="PaddingBottomS">
          <button className="FontSizeS FontWeightBold TextButton" onClick={()=>setShowExplanation(!showExplanation)}>
            <strong className="Opacity05">What is a wallet?</strong>
          </button>
          {showExplanation &&
            <p className="PaddingLeftM PaddingRightM">
              Wallets are used to send, receive, and store digital assets. Wallets come in many forms. They are either built into your browser, an extension added to your browser, a piece of hardware plugged into your computer or even an app on your phone.
            </p>
          }
        </div>
      }
    />
  )
}
