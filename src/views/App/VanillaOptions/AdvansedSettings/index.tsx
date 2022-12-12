import React, { useState } from 'react'
import { useOptionFormContext } from '@/context/form/OptionFormContext'
import { Setting } from './setting'
import { settingsInfo } from './settingsInfos'
import { OptionFormActionTypes } from '@/context/form/OptionFormReducer'
import { boolean } from 'mathjs'

const Toggle = ({ onClick }) => {
  return (
    <div className="flex space-x-4 my-2 ">
      <div className="ml-1 w-32 font-normal text-[12px] text-[#fff]/50">
        Set Custom Implied Volatility
      </div>
      <label
        // for="default-toggle"
        className="my-auto mr-32 inline-flex relative items-center cursor-pointer"
      >
        {/* <div>123</div> */}

        <input
          type="checkbox"
          value=""
          id="default-toggle"
          className="sr-only peer"
          onClick={onClick}
        />
        {/* <div className="flex space-x-4"> */}

        <div className="w-11 h-6 bg-gray-200 border border-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-indigo-600 bg-[#0A0F26]/100"></div>
        {/* <span className="ml-3 text-xl text-gray-900 ">Advanced settings</span> */}
        {/* </div> */}
      </label>
    </div>
  )
}

function AdvancedSettings({ className }) {
  const { formData, dispatch } = useOptionFormContext()
  // const [isIVallowedToChange, setIVAllowed] = useState<boolean>(false)
  const isIVallowedToChange = formData.IVallowedToChange

  const setIV = () => {
    console.log(isIVallowedToChange)
    dispatch({
      type: OptionFormActionTypes.UPDATE_BASE_SETTINGS,
      name: 'IVallowedToChange',
      value: isIVallowedToChange === '0' ? '1' : '0',
    })
  }

  return (
    <>
      {Object.keys(settingsInfo).map((el, index) => {
        // console.log(el)
        if (settingsInfo[el].advanced) {
          return (
            <div className="col-span-9">
              <Setting
                name={el}
                value={formData.advancedSettings.modelParams[el]}
                className={className}
                allowedToChange={boolean(Number(isIVallowedToChange))}
              />
              <Toggle onClick={setIV} />
            </div>
          )
        } else {
          return (
            <Setting
              name={el}
              value={formData.advancedSettings[el]}
              className={className}
            />
          )
        }
      })}
    </>
  )
}

export default AdvancedSettings
