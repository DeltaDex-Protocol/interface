import React from 'react'
import cx from 'classnames'

import { useOptionFormContext } from '@/context/form/OptionFormContext'
import { OptionFormActionTypes } from '@/context/form/OptionFormReducer'

function MinimalLiquidity({ className }) {
  const { formData, dispatch } = useOptionFormContext()
  const value = parseInt(formData['providedLiquidity'])

  // TODO: must change this
  let minimalValue = 560 / parseInt(formData.leverage.slice(1))

  // const TEXT =
  //   minimalValue === value
  //     ? 'Minimal amount of \n liquidity to provide\n for  running hedging:'
  //     : minimalValue < value
  //     ? 'Liquidity'
  //     : `Liquidity must be\n more than ${minimalValue}`

  return (
    <div className={cx(className, 'col-span-6 relative rounded-md p-6 my-auto pl-5')}>
      <div
        className={cx(
          'flex justify-between ',
          // TEXT === 'Liquidity' ? 'mt-4 ' : '',
        )}
      >
        <div
          className={cx(
            'font-normal text-[12px] md:text-[14px] my-auto',
            // minimalValue <= value ? 'text-[#A680FF]' : 'text-[#CE6767]',
          )}
        >
          Liquidity to provide
        </div>
        <div className="my-auto flex gap-0 md:gap-4">
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
