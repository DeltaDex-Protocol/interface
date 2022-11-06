/* eslint-disable react/prop-types */
import cx from 'classnames'
import { useState, useEffect } from 'react'
import styles from './IL.module.scss'

import AdvancedSettings from './AdvancedSettings'
import { useOptionFormContext } from '@/context/form/OptionFormContext'
import { OptionFormActionTypes } from '@/context/form/OptionFormReducer'
import MinimalLiquidity from 'src/views/App/ImpermanentLoss/MinimalLiquidity'
import SelectPairModal from './test'
import {
  // UniVersion,
  Pairs,
  ValueToProtect,
  Period,
  Leverage,
} from 'src/views/App/ImpermanentLoss/Inputs/index'

const InputStyle =
  'transition-colors bg-[#0A0F26]/60 hover:bg-[#0A0F26]/90 border-[1px] border-white/10 rounded-xl'

const Form = ({ className }) => {
  const [isAdvancedSettingsOpen, setAdvancedSettingsOpen] = useState(false)

  const { formData, dispatch } = useOptionFormContext()

  useEffect(() => console.log(formData))

  const { uniswapVersion } = formData
  const UniVersions = [uniswapVersion, ...['V3', 'V2']]

  return (
    <section className={cx(className, 'bg-[#fff]/5')}>
      {/* <SelectPairModal/> */}
      <header className=" mt-2 mb-4 px-2  md:gap-6 ">
        <div className="flex justify-between">
          <span className="font-semibold text-[17px] text-[#726DA6]">
            Replicate a vanilla option
          </span>
          {/* <DropDown
              name="uniswapVersion"
              ActionType={OptionFormActionTypes.UPDATE_BASE_SETTINGS}
              array={UniVersions}
            /> */}
          <div className="flex ">
            {isAdvancedSettingsOpen && (
              <button
                className="flex flex-col text-[13px] text-[#726DA6] font-semibold hover:text-[#fff] duration-300"
                onClick={() => setAdvancedSettingsOpen(!isAdvancedSettingsOpen)}
              >
                <span className="mx-auto mr-2">back</span>
                <span className="mx-auto"></span>
              </button>
            )}
            {!isAdvancedSettingsOpen && (
              <button
                className="flex flex-col -space-y-1 text-[12px] text-[#726DA6] font-semibold hover:text-[#fff] duration-300"
                onClick={() => setAdvancedSettingsOpen(!isAdvancedSettingsOpen)}
              >
                <span className="mx-auto">advanced</span>
                <span className="mx-auto">settings</span>
              </button>
            )}
          </div>
        </div>
      </header>
      <div className={styles.inputs}>
        <div className="grid grid-cols-5 gap-2 mb-4 px-1">
          {isAdvancedSettingsOpen && (
            <AdvancedSettings className={InputStyle} />
          )}
          {!isAdvancedSettingsOpen && (
            <>
              <Pairs className={InputStyle} />
              <ValueToProtect className={InputStyle} />
              <Period className={InputStyle} />
              <Leverage className={InputStyle} />
              <MinimalLiquidity className={InputStyle} />
            </>
          )}
        </div>
        <div className="flex justify-between px-2">
          <span className="font-semibold text-[#726DA6]">
            Historical average accuracy
          </span>
          <span className="font-semibold px-2">93%</span>
        </div>
        <button
          className="hover:shadow-xl hover:shadow-[#883FFF] hover:bg-[#883FFF] 
            bg-[#883FFF] my-7 py-4 rounded-xl mx-auto  duration-300  
            w-full px-10 font-semibold text-[18px]"
        >
          Hedge Impermanent Loss
        </button>
      </div>
    </section>
  )
}

export default Form
