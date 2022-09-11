import Head from 'next/head'
import Image from 'next/image'
import Header from '../app/components/layout/Header.jsx'
// import styles from '../styles/Home.module.css'

import WalletContext from '../app/contexts/Wallet'
import {useContext} from 'react'


export default function App () {
  const wallet = useContext(WalletContext)
  return (
    // <Home/>
    <>
    <Header/>
    {console.log(wallet)}
    </>
  )
}
