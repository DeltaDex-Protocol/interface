import { useState, useEffect } from 'react'
import Banner from '../../dapp/Banner'
// import ProfitChart from '../../../shared/OptionChart'
import PriceChart from '../../../shared/PriceChart'



export const VanillaOptionForm = ({ ethPrice }) => {
    

    return (
        <div className=''>
            <div className=''>
                <div className="flex justify-between">
                    <Banner Unit={'VanillaOptions'}/>
                    <div className='invisible lg:visible'>
                        <PriceChart data={ethPrice}/>
                    </div>
                </div>
            </div>
            <div className='bg-gray-100 rounded-xl p-4 mt-1'>
                <div className="flex flex-col">
                    <span className=" text-medium text-xl">
                    Add initial liquidity to trade underlying
                    </span>
                    <span className=" text-black text-normal mt-1">
                    Please add the liquidity in
                    <span className="font-bold">
                    </span>
                    tokens
                    </span>
                </div>
            </div>
        </div>

    )
}

export default VanillaOptionForm;