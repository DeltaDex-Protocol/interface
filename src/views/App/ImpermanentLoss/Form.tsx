/* eslint-disable react/prop-types */
import cx from 'classnames'
// import type { FC, PropsWithChildren } from 'react'
import { useMemo, memo, useState, useEffect } from 'react'

import {
  Pairs,
  ValueToProtect,
  Period,
  Leverage,
} from 'src/views/App/ImpermanentLoss/Inputs/index'
import MinimalLiquidity from 'src/views/App/ImpermanentLoss/MinimalLiquidity'
// import Tutorial from 'src/views/App/ImpermanentLoss/ForTests'
import { createContext } from 'react'
import styles from './IL.module.scss'
import AdvancedSettings from './AdvancedSettings'
import { useFormContext } from '@/context/form/formContext'
import { FormActionTypes } from '@/context/form/formReducer'
import { use } from 'echarts'

export const FormContext = createContext({
  form: {},
  handleFormChange: () => {},
})

const InputStyle =
  'transition-colors bg-[#0A0F26]/60 hover:bg-[#0A0F26]/90 border-[1px] border-white/10 rounded-xl'

const Form = ({ className }) => {
  const [isPopupOpen, setPopup] = useState(false)
  const changePopupVisibility = (isPopupOpen) => setPopup(!isPopupOpen)

  const { formData, dispatch } = useFormContext()

  useEffect(() => console.log(formData))

  return (
    <section className={cx(className, 'bg-[#fff]/5')}>
      <header className=" mt-2 mb-4 px-2  md:gap-6 ">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <span className="font-semibold text-[17px] text-[#726DA6]">
              Uniswap IL protection:
            </span>
            <span className="text-[18px]">V2</span>
          </div>
          <div className="flex ">
            {isPopupOpen && (
              <button
                className="flex flex-col text-[13px] text-[#726DA6] font-semibold hover:text-[#fff] duration-300"
                onClick={() => changePopupVisibility(isPopupOpen)}
              >
                <span className="mx-auto mr-2">back</span>
                <span className="mx-auto"></span>
              </button>
            )}
            {!isPopupOpen && (
              <button
                className="flex flex-col -space-y-1 text-[12px] text-[#726DA6] font-semibold hover:text-[#fff] duration-300"
                onClick={() => changePopupVisibility(isPopupOpen)}
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
          {isPopupOpen && <AdvancedSettings className={InputStyle} />}
          {!isPopupOpen && (
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
