import React from 'react'
import { useEffect } from "react"
import ReactLoading from 'react-loading'
import { defineAddresses } from '../../../configs/mypositions.config'
import Table from '../../dapp/TablePositions/Table'
import Banner from '../../dapp/Banner'
import PriceChart from '../../../shared/PriceChart'
import useEthPrice from '../../../hooks/useEthPrice'







export function MyPositions() {
  const [ethPrice, updateEthPrice] = useEthPrice()

  return (
    <>
      <div className="flex justify-between">
        <Banner Unit={'YourPositions'}/>
        <div className=''>
            <PriceChart data={ethPrice}/>
        </div>
      </div>
      <Table />
    </>
  )
}

export default MyPositions