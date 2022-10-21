import React from 'react'
import cx from 'classnames'

import { useFormContext } from '@/context/form/formContext'
import { FormActionTypes } from '@/context/form/formReducer'

function MinimalLiquidity({ className }) {
  const { formData, dispatch } = useFormContext()
  const value = parseInt(formData['providedLiquidity'])

  // TODO: must change this
  let minimalValue = 560 / parseInt(formData.leverage.slice(1))

  const TEXT =
    minimalValue === value
      ? 'Minimal amount of \n liquidity to provide\n for  running hedging:'
      : minimalValue < value
      ? 'Liquidity'
      : `Liquidity must be\n more than ${minimalValue}`

  return (
    <div className={cx(className, 'col-span-3 relative rounded-md p-3 ')}>
      <div
        className={cx(
          'flex justify-between ',
          TEXT === 'Liquidity' ? 'mt-4 ' : '',
        )}
      >
        <div
          className={cx(
            'font-semibold text-[7px] md:text-[11px] my-auto',
            minimalValue <= value ? 'text-[#A680FF]' : 'text-[#CE6767]',
          )}
        >
          {TEXT}
        </div>
        <div className="my-auto flex gap-0 md:gap-4">
          <input
            className="my-auto font-normal text-white w-12 text-[18px]"
            placeholder={String(value)}
            defaultValue={value}
            style={{ backgroundColor: 'transparent', outline: 'none' }}
            type="number"
            onChange={(event) =>
              dispatch({
                type: FormActionTypes.UPDATE_BASE_SETTINGS,
                name: 'providedLiquidity',
                value:
                  parseInt(event.target.value) > 0 ? event.target.value : '0',
              })
            }
          />
          <span className="bg-[#fff]/5 rounded-md px-2  text-center">
            <span className=" text-[#A680FF] font-semibold text-[12px] my-auto">
              USDC
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default MinimalLiquidity
