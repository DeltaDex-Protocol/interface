import React from 'react'
import DropDown from 'src/views/App/ImpermanentLoss/DropDown'
import { useContext } from 'react'
import { FormContext } from '../Form'
import cx from 'classnames'
import { useFormContext } from '@/context/form/formContext'
import { FormActionTypes } from '@/context/form/formReducer'

function Leverage({ className }) {
  // const { leverage } = useContext(FormContext).form
  const { leverage } = useFormContext().formData
  const leverages = [leverage, ...['x1', 'x2', 'x3', 'x4']]

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
              ActionType={FormActionTypes.UPDATE_BASE_SETTINGS}
              array={leverages}
            />
          </span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export { Leverage }
