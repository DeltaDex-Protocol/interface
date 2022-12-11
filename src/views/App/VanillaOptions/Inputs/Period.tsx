import { use, useEffect, useState } from 'react'
import cx from 'classnames'
import { getExpirations } from '@/api/optionsdata'

import { NewDropDown } from './NewDropDown'
// import DropDown from '@/components/kit/Form/components/DropDown'
import { useOptionFormContext } from '@/context/form/OptionFormContext'
import { OptionFormActionTypes } from '@/context/form/OptionFormReducer'
import { StringToDays } from '@/utils/formUtils'

function Period({ className }) {
  //   const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
  // const { expiresIn } = useContext(FormContext).form
  const { formData, dispatch } = useOptionFormContext()

  const [periods, setPeriods] = useState<string[]>([])

  // const [selectedPeriod, setSelectedPeriod] = useState<string>('')

  const setSelectedPeriod = (value) =>
    dispatch({
      type: OptionFormActionTypes.UPDATE_BASE_SETTINGS,
      name: 'expirationDate',
      value: value,
    })

  // const periods = [
  //   formData.expiresIn,
  //   ...['7 days', '14 days', '21 days', '28 days', '35 days', '42 days'],
  // ]

  useEffect(() => {
    // console.log(formData)
    getExpirations().then((data: []) => {
      // ;(async () => {})().then((data) =>

      // console.log(data)
      if (formData.expirationDate !== '') {
        setPeriods([
          formData.expirationDate,
          // data[0],
          ...data,
          // ...['7 days', '14 days', '21 days', '28 days', '35 days', '42 days'],
        ])
      } else {
        setPeriods([
          // formData.expirationDate,
          // data[0],
          ...data,
          // ...['7 days', '14 days', '21 days', '28 days', '35 days', '42 days'],
        ])
      }
      dispatch({
        type: OptionFormActionTypes.UPDATE_BASE_SETTINGS,
        name: 'expiresIn',
        value: StringToDays(formData.expirationDate) + ' days',
      })
    })

  }, [])

  useEffect(()=>{
    console.log(formData)
  }, [formData.expiresIn])

  // useEffect(() => {
  //   // console.log(formData)
  //   // ;(async () => {})().then((data) =>
  //   console.log(selectedPeriod, periods)
  //   setPeriods([
  //     // formData.expiresIn,
  //     selectedPeriod,
  //     // periods[0],
  //     ...periods,
  //     // ...['7 days', '14 days', '21 days', '28 days', '35 days', '42 days'],
  //   ])
  // }, [formData.expiresIn])

  return (
    <div
      className={cx(
        className,
        'col-span-3 relative h-500 rounded-md py-3 px-5',
      )}
    >
      <div className=" flex flex-col gap-2">
        <span className="font-semibold text-[12px] text-[#726DA6]">
          Expiration
        </span>
        <span className="font-normal text-[12px] md:text-[19px] my-auto">
          <NewDropDown
            name="expiresIn"
            array={periods}
            ActionType={OptionFormActionTypes.UPDATE_BASE_SETTINGS}
            dispatch={({ type, name, value }) => {
              setSelectedPeriod(value)
              setPeriods([
                // formData.expiresIn,
                // periods[0],
                value,
                ...periods.slice(1),
                // ...['7 days', '14 days', '21 days', '28 days', '35 days', '42 days'],
              ])
              dispatch({ type, name, value: StringToDays(value) + ' days' })
            }}
          />
        </span>
      </div>
    </div>
  )
}

export { Period }
