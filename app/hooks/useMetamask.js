import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const installMetamaskErrorText = 
    'Please install MetaMask browser extension to interact'

export default function useMetamask() {
    const [wallet, setWallet] = useState('')
    const [balance, setBalance] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (
            typeof window !== 'undefined'
            && window.ethereum
        ) {
            window.ethereum.on(
                'accountsChanged', (wallets) => {
                    accountChangedHandler(wallets[0])
                }
            )

            window.ethereum.on(
                'chainChanged', chainChangedHandler
            )
        }

        request()

    }, [])

    const accountChangedHandler = (newAccount) => {
        setWallet(newAccount);
        getAccountBalance(newAccount.toString());
    }

    const getAccountBalance = (account) => {
        window.ethereum.request({
            method: 'eth_getBalance',
            params: [account, 'latest']
        }).then(balance => {
            const bal = ethers.utils.formatEther(balance);
            setBalance(bal);
        }).catch(error => {
            setErrorMessage(error.message);
        });
    };

    const chainChangedHandler = () => {
        window.location.reload();
    }

    const request = () => {
        if (
            typeof window !== 'undefined'
            && window.ethereum
            && window.ethereum.isMetaMask
        ) {
            window.ethereum.request(
                {method: 'eth_requestAccounts'}
            ).then(result => {
                accountChangedHandler(result[0])
            }).catch(error => {
                setErrorMessage(error.message)
            })

        } else {
            setErrorMessage(installMetamaskErrorText)
        }
    }

    return {
        wallet,
        balance,
        request,
    }

}
