import React from 'react'
import { useState } from "react";
import Banner from '../../dapp/Banner'
import Table from '../../dapp/Tables/AllPositions/Table';



export function AllPositions({ ethPrice }) {
  return (
    <div className=" ">
      <div className="flex justify-between ">
        <div className="mx-auto md:mx-0">
          <Banner Unit={'AllPositions'} />
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

export default AllPositions