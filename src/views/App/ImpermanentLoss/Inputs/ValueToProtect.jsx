import React from 'react'
import { useContext } from 'react'
import { FormContext } from '../Form'

function ValueToProtect() {
  const { handleFormChange } = useContext(FormContext)
  return (
    <div className="col-span-3 relative h-500 rounded-md py-3 px-5 transition-colors bg-[#06070A]/50 hover:bg-[#06070A]/70">
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-[12px] text-[#726DA6]">
          Value to protect
        </span>
        <div className="md:flex gap-0">
          <input
            type="number"
            step="0.01"
            // defaultValue="100"
            placeholder="100"
            className="font-normal text-white   w-40 text-[18px]"
            onChange={(event) =>
              handleFormChange('valueToProtect', event.target.value)
            }
            style={{ backgroundColor: 'transparent', outline: 'none' }}
          />
          <span className="bg-[#fff]/5 rounded-md px-3 py-0.5 text-center">
            <span className="text-[#A680FF] font-semibold text-[12px] my-auto">
              USDC
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export { ValueToProtect }
