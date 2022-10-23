/* eslint-disable react/prop-types */
import cx from 'classnames'
import { useState, useEffect } from 'react'
import styles from './IL.module.scss'

import AdvancedSettings from '../ImpermanentLoss/AdvancedSettings'
import { useFormContext } from '@/context/form/formContext'
import { FormActionTypes } from '@/context/form/formReducer'
import MinimalLiquidity from 'src/views/App/ImpermanentLoss/MinimalLiquidity'
import {
  Long,
  Short,
  Pairs,
  ValueToProtect,
  Period,
  Leverage,
} from 'src/views/App/LeverageTrading/Inputs/index'

const InputStyle =
  'transition-colors bg-[#0A0F26]/60 hover:bg-[#0A0F26]/90 border-[1px] border-white/10 rounded-xl'

const LeverageForm = ({ className }) => {
  const [isAdvancedSettingsOpen, setAdvancedSettingsOpen] = useState(false)

  const { formData } = useFormContext()

  useEffect(() => console.log(formData))

  return (
    <section className={cx(className, 'bg-[#fff]/5')}>
      <header className=" mt-2 mb-4 px-2  md:gap-6 ">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <span className="font-semibold text-[17px] text-[#726DA6]">
              Leverage Trade
            </span>
            <span className="text-[18px]"></span>
          </div>
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
              <Long className={InputStyle} />
              <Short className={InputStyle} />
              <Pairs className={InputStyle} />
              <ValueToProtect className={InputStyle} />
              <Leverage className={InputStyle} />
            </>
          )}
        </div>
        <div className="flex justify-between px-2">
          <span className="font-semibold text-[#726DA6]">
            Current Price:
          </span>
          <span className="font-semibold px-2">1413 USDC</span>
        </div>
        <div className="flex justify-between px-2">
          <span className="font-semibold text-[#726DA6]">
            Liquidation Price:
          </span>
          <span className="font-semibold px-2">1159 USDC</span>
        </div>
        <button
          className="hover:shadow-xl hover:shadow-[#883FFF] hover:bg-[#883FFF] 
            bg-[#883FFF] my-7 py-4 rounded-xl mx-auto  duration-300  
            w-full px-10 font-semibold text-[18px]"
        >
          Execute Trade
        </button>
      </div>
    </section>
  )
}

export default LeverageForm
