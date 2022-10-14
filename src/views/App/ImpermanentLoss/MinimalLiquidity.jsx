import React from 'react'
import cx from 'classnames'

import { FormContext } from './Form'
import { useContext } from 'react'

function MinimalLiquidity({ className }) {
  // console.log(form.leverage)
  const { form, handleFormChange } = useContext(FormContext)
  const value = form['providedLiquidity']
  // handleFormChange('providedLiquidity', value)
  // TODO: useMemo(() =>   handleFormChange('providedLiquidity', value))

  return (
    <div className={cx(className, 'col-span-3 relative rounded-md p-3')}>
      <div className=" flex justify-between my-auto">
        <div className="font-semibold text-[7px] md:text-[12px] text-[#A680FF] my-auto">
          Minimal amount of <br />
          liquidity to provide <br />
          for running hedging:
        </div>
        <div className="my-auto flex gap-0 md:gap-4">
          <input
            className="font-normal text-white w-12 text-[18px]"
            placeholder={value}
            defaultValue={value}
            style={{ backgroundColor: 'transparent', outline: 'none' }}
            type="number"
            onChange={(event) =>
              handleFormChange('providedLiquidity', event.target.value)
            }
          />
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
