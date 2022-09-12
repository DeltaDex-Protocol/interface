import React from 'react'
import { useEffect } from 'react'
import ReactLoading from 'react-loading'
import { defineAddresses } from '../../../configs/mypositions.config'
import Table from '../../dapp/Tables/MyPositions/Table'
import Banner from '../../dapp/Banner'
import PriceChart from '../../../shared/PriceChart'



export function MyPositions({ ethPrice }) {
  return (
    <div className=" ">
      <div className="flex justify-between ">
        <div className="mx-auto md:mx-0">
          <Banner Unit={'YourPositions'} />
        </div>
        {/* <div className='invisible lg:visible'>
            <PriceChart data={ethPrice}/>
        </div> */}
      </div>
      <div className="mx-auto md:mx-0 overflow-x-scroll max-w-xs sm:max-w-md md:max-w-xl lg:max-w-4xl xl:max-w-5xl ">
        <Table />
      </div>
    </div>
  )
}

export default MyPositions
