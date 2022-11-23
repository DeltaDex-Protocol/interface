import ChangableAmountProvider from './providers/ChangableAmountProvider'
import ClosableProvider from './providers/ClosableProvider'
import ConfigurationProvider from './providers/ConfigurationProvider'
import ConversionRateProvider from './providers/ConversionRateProvider'
import DonationRoutingProvider from './providers/DonationRoutingProvider'
import DonationStack from './stacks/DonationStack'
import ensureDocument from './helpers/ensureDocument'
import ErrorProvider from './providers/ErrorProvider'
import mount from './helpers/mount'
import NavigateProvider from './providers/NavigateProvider'
import PaymentTrackingProvider from './providers/PaymentTrackingProvider'
import PoweredBy from './components/PoweredBy'
import React from 'react'
import requireReactVersion from './helpers/requireReactVersion'
import TransactionTrackingProvider from './providers/TransactionTrackingProvider'
import UpdatableProvider from './providers/UpdatableProvider'
import WalletProvider from './providers/WalletProvider'

let preflight = async({ accept }) => {
  if(!(accept instanceof Array) || accept.length == 0) { throw('You need to set the tokens you accept as donation!') }
  accept.forEach((configuration)=>{
    if(typeof configuration.blockchain === 'undefined') { throw('You need to set the blockchain you want to receive the donation on!') }
    if(!['ethereum', 'bsc', 'polygon'].includes(configuration.blockchain)) { throw('You need to set a supported blockchain!') }
    if(typeof configuration.token === 'undefined') { throw('You need to set the token you want to receive as donation!') }
    if(typeof configuration.receiver === 'undefined') { throw('You need to set the receiver address that you want to receive the donation!') }
  })
}

let Donation = async ({
  amount,
  accept,
  event,
  sent,
  succeeded,
  validated,
  failed,
  error,
  critical,
  style,
  whitelist,
  blacklist,
  providers,
  currency,
  connected,
  closed,
  track,
  fee,
  closable,
  integration,
  link,
  container,
  title,
  document
}) => {
  requireReactVersion()
  try {
    await preflight({ accept })
    let unmount = mount({ style, container, document: ensureDocument(document), closed }, (unmount)=> {
      return (container)=>
        <ErrorProvider errorCallback={ error } container={ container } unmount={ unmount }>
          <ConfigurationProvider configuration={{ type: 'donation', amount, accept, currency, event, track, fee, sent, succeeded, validated, failed, blacklist, whitelist, providers, integration, link, title }}>
            <UpdatableProvider>
              <ClosableProvider unmount={ unmount } closable={ closable }>
                <WalletProvider container={ container } connected={ connected } unmount={ unmount }>
                  <NavigateProvider>
                    <ConversionRateProvider>
                      <ChangableAmountProvider accept={ accept }>
                        <TransactionTrackingProvider>
                          <PaymentTrackingProvider document={ ensureDocument(document) }>
                            <DonationRoutingProvider container={ container } document={ document }>
                              <DonationStack
                                document={ document }
                                container={ container }
                              />
                              <PoweredBy/>
                            </DonationRoutingProvider>
                          </PaymentTrackingProvider>
                        </TransactionTrackingProvider>
                      </ChangableAmountProvider>
                    </ConversionRateProvider>
                  </NavigateProvider>
                </WalletProvider>
              </ClosableProvider>
            </UpdatableProvider>
          </ConfigurationProvider>
        </ErrorProvider>
    })
    return { unmount }
  } catch (error) {
    console.log('critical error', error)
    if(critical != undefined) {
      critical(error)
    }
  }
}

export default Donation
