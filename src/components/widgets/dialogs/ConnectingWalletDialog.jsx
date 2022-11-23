import Dialog from '../components/Dialog'
import React, { useState, useContext, useEffect } from 'react'
import { NavigateStackContext } from '@depay/react-dialog-stack'

export default (props)=> {

  const [ showConnectButton, setShowConnectButton ] = useState(false)
  const { navigate } = useContext(NavigateStackContext)
  const wallet = props.wallet
  const walletName = wallet?.name ? wallet.name : 'wallet'
  const walletLogo = wallet?.logo ? wallet.logo : undefined

  useEffect(()=> {
    let timeout = setTimeout(()=>setShowConnectButton(true), 10000)
    return ()=>clearTimeout(timeout)
  }, [])
  
  if(props.pending) {
    return(
      <Dialog
        stacked={ true }
        body={
          <div className="TextCenter">
            { walletLogo &&
              <div className="GraphicWrapper PaddingTopS PaddingBottomS">
                <img className="Graphic" src={walletLogo}/>
              </div>
            }
            <h1 className="LineHeightL Text FontSizeL FontWeightBold PaddingTopS">Connect Wallet</h1>
            <div className="Text PaddingTopS PaddingBottomS PaddingLeftS PaddingRightS">
              <strong className="FontSizeM PaddingLeftM PaddingRightM">
                Your wallet is already open and asking for permission to connect.
                Please find your wallet dialog and confirm this connection.
              </strong>
            </div>
          </div>
        }
      />
    )
  } else {
    return(
      <Dialog
        stacked={ true }
        body={
          <div className="TextCenter">
            { walletLogo &&
              <div className="GraphicWrapper PaddingTopS PaddingBottomS">
                <img className="Graphic" src={walletLogo}/>
              </div>
            }
            <h1 className="LineHeightL Text FontSizeL FontWeightBold PaddingTopS">Connect Wallet</h1>
            <div className="Text PaddingTopS PaddingBottomS PaddingLeftS PaddingRightS">
              <p className="FontSizeM PaddingLeftM PaddingRightM">
                Access to your wallet is required. Please login and authorize access to your account to continue.
              </p>
              <div className="PaddingTopS">
                <button onClick={()=>navigate('back')} className="TextButton">Connect with another wallet</button>
              </div>
            </div>
          </div>
        }
        footer={
          showConnectButton &&
            <div className="PaddingTopXS PaddingRightM PaddingLeftM PaddingBottomM">
              <button className='ButtonPrimary' onClick={()=>props.connect(wallet)}>
                Connect
              </button>
            </div>
        }
      />
    )
  }
}
