import { useEffect, useState } from 'react'
import cx from 'classnames'
import { getExpirations } from '@/api/optionsdata'

import DropDown from '@/components/kit/Form/components/DropDown'
import { useOptionFormContext } from '@/context/form/OptionFormContext'
import { OptionFormActionTypes } from '@/context/form/OptionFormReducer'

function Period({ className }) {
  //   const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
  // const { expiresIn } = useContext(FormContext).form
  const { formData, dispatch } = useOptionFormContext()

  const [periods, setPeriods] = useState<string[]>([])

  // const periods = [
  //   formData.expiresIn,
  //   ...['7 days', '14 days', '21 days', '28 days', '35 days', '42 days'],
  // ]

  useEffect(() => {
    getExpirations().then((data) =>
      setPeriods([
        formData.expiresIn,
        ...data,
      ]),
    )
  }, [])

  return (
    <div
      className={cx(
        className,
        'col-span-3 relative h-500 rounded-md py-3 px-5',
      )}
    >
      <div className=" flex flex-col gap-2">
        <span className="font-semibold text-[12px] text-[#726DA6]">
          Expires in
        </span>
        <span className="font-normal text-[12px] md:text-[19px] my-auto">
          <DropDown
            name="expiresIn"
            array={periods}
            ActionType={OptionFormActionTypes.UPDATE_BASE_SETTINGS}
            dispatch={dispatch}
          />
        </span>
      </div>
    </div>
  )
}

export { Period }
