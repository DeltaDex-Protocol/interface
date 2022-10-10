import React from 'react'

import { FormContext } from './Form'
import { useContext } from 'react'

function MinimalLiquidity() {
  // console.log(form.leverage)
  const { leverage } = useContext(FormContext).form
  const value = parseInt(560 / parseInt(leverage.slice(1)))

  return (
    <div className="col-span-3 relative rounded-md p-3 transition-colors bg-[#06070A]/50 hover:bg-[#06070A]/70">
      <div className=" flex justify-between my-auto">
        <div className="font-semibold text-[7px] md:text-[12px] text-[#A680FF] my-auto">
          Minimal amount of <br />
          liquidity to provide <br />
          for running hedging:
        </div>
        <div className="my-auto flex gap-4">
          <span className="font-normal text-[18px]">{value}</span>
          <span className="bg-[#fff]/5 rounded-md px-2  text-center">
            <span className="my-auto text-[#A680FF] font-semibold text-[12px] my-auto">
              USDC
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default MinimalLiquidity
