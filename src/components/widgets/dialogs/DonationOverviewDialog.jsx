import ChangableAmountContext from '../contexts/ChangableAmountContext'
import ChevronRight from '../components/ChevronRight'
import ConfigurationContext from '../contexts/ConfigurationContext'
import Dialog from '../components/Dialog'
import DonationOverviewSkeleton from '../skeletons/DonationOverviewSkeleton'
import Footer from '../components/Footer'
import format from '../helpers/format'
import PaymentContext from '../contexts/PaymentContext'
import PaymentValueContext from '../contexts/PaymentValueContext'
import React, { useContext, useState, useEffect } from 'react'
import { Blockchain } from '@depay/web3-blockchains'
import { Currency } from '@depay/local-currency'
import { NavigateStackContext } from '@depay/react-dialog-stack'
import { TokenImage } from '@depay/react-token-image'

export default (props)=>{
  const { currencyCode, title } = useContext(ConfigurationContext)
  const { amount } = useContext(ChangableAmountContext)
  const { payment, paymentState } = useContext(PaymentContext)
  const { displayedPaymentValue } = useContext(PaymentValueContext)
  const { navigate } = useContext(NavigateStackContext)
  
  if(payment == undefined) { return(<DonationOverviewSkeleton/>) }

  const blockchain = Blockchain.findByName(payment.blockchain)

  return(
    <Dialog
      header={
        <div className="PaddingTopS PaddingLeftM PaddingRightM TextLeft">
          <h1 className="LineHeightL FontSizeL">{ title || 'Donation' }</h1>
        </div>
      }
      body={
        <div className="PaddingLeftM PaddingRightM PaddingBottomXS">
          <div 
            className={["Card", (paymentState == 'initialized' ? '' : 'disabled')].join(' ')}
            title={paymentState == 'initialized' ? "Change amount" : undefined}
            onClick={ ()=>{
              if(paymentState != 'initialized') { return }
              navigate('ChangeAmount')
            } }
          >
            <div className="CardBody">
              <div className="CardBodyWrapper">
                <h4 className="CardTitle">
                  Amount
                </h4>
                <h2 className="CardText">
                  <div className="TokenAmountRow">
                    { displayedPaymentValue }
                  </div>
                </h2>
              </div>
            </div>
            <div className="CardAction">
              <ChevronRight/>
            </div>
          </div>
          <div 
            className={["Card", (paymentState == 'initialized' ? '' : 'disabled')].join(' ')}
            title={paymentState == 'initialized' ? "Change payment" : undefined}
            onClick={ ()=>{
              if(paymentState != 'initialized') { return }
              navigate('ChangePayment')
            } }
          >
            <div className="CardImage" title={ payment.name }>
              <TokenImage
                blockchain={ payment.route.blockchain }
                address={ payment.token }
              />
              <img className="BlockchainLogo small" src={ blockchain.logo } alt={ blockchain.label } title={ blockchain.label }/>
            </div>
            <div className="CardBody">
              <div className="CardBodyWrapper">
                <h4 className="CardTitle">
                  Payment
                </h4>
                <h2 className="CardText">
                  <div className="TokenAmountRow">
                    <span className="TokenSymbolCell">
                      { payment.symbol }
                    </span>
                    <span>&nbsp;</span>
                    <span className="TokenAmountCell">
                      { format(payment.amount) }
                    </span>
                  </div>
                </h2>
              </div>
            </div>
            <div className="CardAction">
              <ChevronRight/>
            </div>
          </div>
        </div>
      }
      footer={
        <div className="PaddingTopXS PaddingRightM PaddingLeftM PaddingBottomM">
          <Footer/>
        </div>
      }
    />
  )
}
