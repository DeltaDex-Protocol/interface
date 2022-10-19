import React from 'react'
import { useContext } from 'react'
import { FormContext } from '../Form'
import cx from 'classnames'

function ValueToProtect({ className }) {
  const { form, handleFormChange } = useContext(FormContext)
  const valueToProtect = parseFloat(form.valueToProtect)

  return (
    <div
      className={cx(
        className,
        'col-span-3 relative h-500 rounded-md py-3 px-5 ',
      )}
    >
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-[12px] text-[#726DA6]">
          Value to protect
        </span>
        <div className="md:flex gap-0">
          <input
            type="number"
            step="0.01"
            defaultValue={valueToProtect === 0 ? null : valueToProtect}
            placeholder="100"
            // placeholder={valueToProtect === 0 ? 100 : valueToProtect}
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
