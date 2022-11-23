import React from 'react'
// import { useContext } from 'react'
// import { FormContext } from './Form'
import { useOptionFormContext } from '@/context/form/OptionFormContext'
import { OptionFormActionTypes } from '@/context/form/OptionFormReducer'
import cx from 'classnames'

import DropDown from '@/components/kit/Form/components/DropDown'

const settingsInfo = {
  feesToSplit: { desc: 'Fees to split (in usdcs per hedge)', type: 'input' },
  hedgesPerDay: { desc: 'Amount of delta-hedges per day', type: 'input' },
  optionType: { desc: 'Option type', type: 'dropdown' },
  modelParams: { desc: 'Model used for replication', type: 'dropdown' },
}
const SettingsArrays = {
  optionType: ['call', 'put'],
  modelParams: ['Black-Scholes'],
}

function Setting({ name, value, className }) {
  // console.log(value)
  const { dispatch } = useOptionFormContext()

  // if (name === 'modelParams') return <></>
  console.log(name, value)

  return (
    <div className={cx(className, 'col-span-9 relative rounded-md py-3 px-5 ')}>
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-[12px] text-[#726DA6]">
          {settingsInfo[name].desc}
        </span>
        <div className="md:flex gap-0">
          {/* {console.log(name)} */}
          {settingsInfo[name].type === 'input' && (
            <input
              // type="number"
              step="0.01"
              defaultValue={value}
              placeholder={value}
              className="font-normal text-white   w-40 text-[18px]"
              onChange={(event) =>
                dispatch({
                  type: OptionFormActionTypes.UPDATE_ADVANCED_SETTINGS,
                  name: name,
                  value: event.target.value,
                })
              }
              style={{ backgroundColor: 'transparent', outline: 'none' }}
            />
          )}
          {name === 'optionType' && (
            <DropDown
              ActionType={OptionFormActionTypes.UPDATE_ADVANCED_SETTINGS}
              name={name}
              array={[value, ...SettingsArrays[name]]}
              dispatch={dispatch}
            />
          )}
          {name === 'modelParams' && (
            <DropDown
              ActionType={OptionFormActionTypes.UPDATE_MODEL}
              name={'type'}
              array={[value.type, ...SettingsArrays[name]]}
              dispatch={dispatch}
            />
          )}

          {/* <span className="bg-[#fff]/5 rounded-md px-3 py-0.5 text-center">
            <span className="text-[#A680FF] font-semibold text-[12px] my-auto">
              USDC
            </span>
          </span> */}
        </div>
      </div>
    </div>
  )
}

function AdvancedSettings({ className }) {
  const { formData } = useOptionFormContext()

  //   const { feesToSplit, hedgesPerDay, optionType, model } = form.advancedSettings
  //   console.log(feesToSplit, hedgesPerDay, optionType, model)
  //   console.log([form.advancedSettings.feesToSplit])

  return (
    <>
      {Object.keys(formData.advancedSettings).map((el, index) => (
        <Setting
          name={el}
          value={formData.advancedSettings[el]}
          className={className}
        />
      ))}
    </>
  )
}

export default AdvancedSettings
