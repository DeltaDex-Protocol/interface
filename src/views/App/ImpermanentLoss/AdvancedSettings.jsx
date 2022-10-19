import React from 'react'
import { useContext } from 'react'
import { FormContext } from './Form'
import cx from 'classnames'

import DropDown from './DropDown'

const settingsInfo = {
  feesToSplit: { desc: 'Fees to split (in usdcs per hedge)', type: 'input' },
  hedgesPerDay: { desc: 'Amount of delta-hedges per day', type: 'input' },
  optionType: { desc: 'Option type', type: 'dropdown' },
  modelName: { desc: 'Model used for replication', type: 'dropdown' },
}
const SettingsArrays = {
  optionType: ['call', 'put'],
  modelName: ['Black-Scholes', 'Jump Diffusion'],
}

function Setting({ name, value, className, handleFormChange }) {
  // console.log(value)

  if (name === 'modelParams') return <></>

  return (
    <div className={cx(className, 'col-span-5 relative rounded-md py-3 px-5 ')}>
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-[12px] text-[#726DA6]">
          {settingsInfo[name].desc}
        </span>
        <div className="md:flex gap-0">
          {console.log(name)}
          {settingsInfo[name].type === 'input' && (
            <input
              // type="number"
              step="0.01"
              defaultValue={value}
              placeholder={value}
              className="font-normal text-white   w-40 text-[18px]"
              onChange={(event) =>
                handleFormChange(name, event.target.value, true)
              }
              style={{ backgroundColor: 'transparent', outline: 'none' }}
            />
          )}
          {settingsInfo[name].type === 'dropdown' && (
            <DropDown
              name={name}
              array={[value, ...SettingsArrays[name]]}
              isAdvancedSetting={true}
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
  const { form, handleFormChange } = useContext(FormContext)
  //   const { feesToSplit, hedgesPerDay, optionType, model } = form.advancedSettings
  //   console.log(feesToSplit, hedgesPerDay, optionType, model)
  //   console.log([form.advancedSettings.feesToSplit])

  return (
    <>
      {Object.keys(form.advancedSettings).map((el, index) => (
        <Setting
          name={el}
          value={form.advancedSettings[el]}
          className={className}
          handleFormChange={handleFormChange}
        />
      ))}
    </>
  )
}

export default AdvancedSettings
