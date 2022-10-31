import React from 'react'
import { useLeverageTradingFormContext } from '@/context/form/LeverageTradingContext'
import { LeverageFormActionTypes } from '@/context/form/LeverageTradingReducer'

import cx from 'classnames'

function Amount({ className }) {
  const { formData, dispatch } = useLeverageTradingFormContext()

  const valueToProtect = parseFloat(formData.amount)

  return (
    <div
      className={cx(
        className,
        'col-span-3 relative h-500 rounded-md py-3 px-5 ',
      )}
    >
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-[12px] text-[#726DA6]">Amount</span>
        <div className="md:flex gap-0">
          <input
            type="number"
            step="0.01"
            defaultValue={valueToProtect == 0 ? undefined : valueToProtect}
            placeholder="100"
            className="font-normal text-white   w-40 text-[18px]"
            onChange={(event) =>
              dispatch({
                type: LeverageFormActionTypes.UPDATE_BASE_SETTINGS,
                name: 'amount',
                value: event.target.value,
              })
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

export { Amount }
