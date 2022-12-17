import React from 'react'
import cx from 'classnames'

import { useOptionFormContext } from '@/context/form/OptionFormContext'
import { OptionFormActionTypes } from '@/context/form/OptionFormReducer'
import { getNumerrarie, getMinValueForReplication } from '@/utils/formUtils'

function MinimalLiquidity({ className }) {
  const { formData, dispatch } = useOptionFormContext()
  let value = Number(formData.providedLiquidity)

  const numerrarie = getNumerrarie(formData)
  const minimalValue = getMinValueForReplication(formData)

  
  return (
    <div
      className={cx(
        className,
        'col-span-9 md:col-span-6 relative rounded-md p-6 my-auto pl-5',
      )}
    >
      <div className={cx('flex justify-between ')}>
        <div className={cx('font-normal text-[12px] md:text-[14px] my-auto')}>
          Liquidity to provide
        </div>
        <div className="my-auto flex gap-0 md:gap-2">
          <input
            className={cx(
              'my-auto font-normal text-white w-12 text-[18px]',
              minimalValue <= value ? 'text-white' : 'text-[#CE6767]',
            )}
            placeholder={String(value)}
            defaultValue={value}
            style={{ backgroundColor: 'transparent', outline: 'none' }}
            type="number"
            onChange={(event) =>
              dispatch({
                type: OptionFormActionTypes.UPDATE_BASE_SETTINGS,
                name: 'providedLiquidity',
                value:
                  Number(event.target.value) > 0 ? event.target.value : '0',
              })
            }
          />
          <span
            className={cx(
              'text-[18px] my-auto ',
              minimalValue <= value ? 'text-white' : 'text-[#CE6767]',
            )}
          >
            {/* <span className="bg-[#fff]/5 rounded-md px-2  text-center"> */}
            {/* <span className=" text-[#A680FF] font-semibold text-[12px] my-auto"> */}
            {numerrarie}
            {/* </span> */}
            {/* </span> */}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MinimalLiquidity
