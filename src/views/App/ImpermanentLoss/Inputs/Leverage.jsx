import React from 'react'
import DropDown from 'src/views/App/ImpermanentLoss/DropDown'
import { useContext } from 'react'
import { FormContext } from '../Form'

function Leverage() {
  const { leverage } = useContext(FormContext).form
  const leverages = [leverage, ...['x1', 'x2', 'x3', 'x4']]

  return (
    <div className="col-span-2 relative h-100 rounded-md py-3 px-5 transition-colors bg-[#06070A]/50 hover:bg-[#06070A]/70">
      <div className=" flex flex-col gap-2">
        <span className="font-semibold text-[12px] text-[#726DA6]">
          Leverage
        </span>
        <div className="flex gap-4">
          <span className="font-normal text-[19px] my-auto">
            <DropDown name="leverage" selected={leverage} array={leverages} />
          </span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export { Leverage }
