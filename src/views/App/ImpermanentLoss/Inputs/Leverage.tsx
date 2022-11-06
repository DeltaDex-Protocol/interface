import React from 'react'
import DropDown from '@/components/kit/Form/components/DropDown'
import cx from 'classnames'
import { useOptionFormContext } from '@/context/form/OptionFormContext'
import { OptionFormActionTypes } from '@/context/form/OptionFormReducer'

function Leverage({ className }) {
  const { formData, dispatch } = useOptionFormContext()
  const leverages = [formData.leverage, ...['x1', 'x2', 'x3', 'x4']]

  return (
    <div
      className={cx(
        className,
        'col-span-2 relative h-100 rounded-md py-3 px-5',
      )}
    >
      <div className=" flex flex-col gap-2">
        <span className="font-semibold text-[12px] text-[#726DA6]">
          Leverage
        </span>
        <div className="flex gap-4">
          <span className="font-normal text-[19px] my-auto">
            <DropDown
              name="leverage"
              ActionType={OptionFormActionTypes.UPDATE_BASE_SETTINGS}
              array={leverages}
              dispatch={dispatch}
            />
          </span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export { Leverage }