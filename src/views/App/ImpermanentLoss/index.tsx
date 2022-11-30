/* eslint-disable react/prop-types */
import cx from 'classnames'
import { useState, useEffect } from 'react'
import styles from './IL.module.scss'

import AdvancedSettings from './AdvansedSettings'
import { useOptionFormContext } from '@/context/form/OptionFormContext'
import MinimalLiquidity from '@/views/App/ImpermanentLoss/MinimalLiquidity'
import { ContractsAmount } from './Inputs/ContractsAmount'
import { Strike } from './Inputs/Strike'
import { CallReplication, PutReplication } from '@/api/form'
import {
  Pairs,
  Period,
  Leverage,
} from 'src/views/App/ImpermanentLoss/Inputs/index'
import {
  getNumerrarie,
  getMinValueForReplication,
  getExpiryDaysToYears,
} from '@/utils/formUtils'
import { viewPositions } from '@/api/positions'

const InputStyle =
  'transition-colors bg-[#0A0F26]/60 hover:bg-[#0A0F26]/90 border-[1px] border-white/10 rounded-xl'

const Form = ({ className }) => {
  const [isAdvancedSettingsOpen, setAdvancedSettingsOpen] = useState(false)

  const { formData, dispatch } = useOptionFormContext()

  useEffect(() => console.log(formData))

  const numerrarie = getNumerrarie(formData)
  const minimalValue = getMinValueForReplication(formData)
  let test_minimalLiquidity = minimalValue + ' ' + numerrarie

  // useEffect(() => {
  //   viewPositions().then((res) => console.log(res))
  // })

  return (
    <section className={cx(className, 'bg-[#fff]/5')}>
      {/* <SelectPairModal/> */}
      <header className=" mt-2 mb-4 px-2  md:gap-6 ">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <span className="font-semibold text-[17px] text-[#726DA6]">
              Replicate a vanilla option
            </span>
            <span className="mt-0 bg-[#8B5CF6] bg-opacity-30 px-2 py-1 my-auto rounded-md text-[12px]">
              {formData.advancedSettings.optionType}
            </span>
          </div>
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
        <div className="grid grid-cols-9 gap-2 mb-4 px-1">
          {isAdvancedSettingsOpen && (
            <AdvancedSettings className={InputStyle} />
          )}
          {!isAdvancedSettingsOpen && (
            <>
              <Pairs className={InputStyle} />
              {/* <ValueToProtect className={InputStyle} /> */}
              <ContractsAmount className={InputStyle} />
              <Period className={InputStyle} />
              <Strike className={InputStyle} />

              <Leverage className={InputStyle} />
              <MinimalLiquidity className={InputStyle} />
            </>
          )}
        </div>
        <div className="flex justify-between px-2">
          <span className="font-normal text-[#726DA6]">
            Minimal liquidity to provide
          </span>
          <span className="font-normal px-2">{test_minimalLiquidity}</span>
        </div>
        <div className="flex justify-between px-2">
          <span className="font-normal text-[#726DA6]">
            Historical average accuracy
          </span>
          <span className="font-normal px-2">93%</span>
        </div>
        <button
          className="hover:shadow-xl hover:shadow-[#883FFF] hover:bg-[#883FFF] 
            bg-[#883FFF] my-7 py-4 rounded-xl mx-auto  duration-300  
            w-full px-10 font-semibold text-[18px]"
          onClick={() => {
            if (formData.advancedSettings.optionType === 'call') {
              CallReplication({
                tokenA_balance: formData.providedLiquidity,
                amount: formData.contractsAmount,
                fee: formData.advancedSettings.feesToSplit,
                perDay: formData.advancedSettings.hedgesPerDay,
                strike: formData.strike,
                expiration: String(getExpiryDaysToYears(formData.expiresIn)),
                riskFree: formData.riskFree,
                sigma: formData.advancedSettings.modelParams.volatility,
              }).then((res) => console.log(res))
            } else if (formData.advancedSettings.optionType === 'put') {
              PutReplication({
                tokenB_balance: formData.providedLiquidity,
                amount: formData.contractsAmount,
                fee: formData.advancedSettings.feesToSplit,
                perDay: formData.advancedSettings.hedgesPerDay,
                strike: formData.strike,
                expiration: String(getExpiryDaysToYears(formData.expiresIn)),
                riskFree: formData.riskFree,
                sigma: formData.advancedSettings.modelParams.volatility,
              }).then((res) => console.log(res))
            }
          }}
        >
          Hedge Impermanent Loss
        </button>
      </div>
    </section>
  )
}

export default Form
