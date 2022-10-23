import React from 'react'
import { useFormContext } from '@/context/form/formContext'
import { FormActionTypes } from '@/context/form/formReducer'
import cx from 'classnames'

function ValueToProtect({ className }) {
  const { formData, dispatch } = useFormContext()

  const valueToProtect = parseFloat(formData.valueToProtect)

  return (
    <div
      className={cx(
        className,
        'col-span-3 relative h-500 rounded-md py-3 px-5 ',
      )}
    >
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-[12px] text-[#726DA6]">
          Amount
        </span>
        <div className="md:flex gap-0">
          <input
            type="number"
            step="0.01"
            defaultValue={valueToProtect == 0 ? undefined : valueToProtect}
            placeholder="100"
            className="font-normal text-white   w-40 text-[18px]"
            onChange={(event) =>
              dispatch({
                type: FormActionTypes.UPDATE_BASE_SETTINGS,
                name: 'valueToProtect',
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

export { ValueToProtect }
