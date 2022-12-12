/* eslint-disable react/prop-types */
import cx from 'classnames'
import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
// import { DAI, WETH } from 'src/utils/constants'

import AdvancedSettings from './AdvansedSettings'
import { useOptionFormContext } from '@/context/form/OptionFormContext'
import MinimalLiquidity from '@/views/App/VanillaOptions/MinimalLiquidity'
import { ContractsAmount } from './Inputs/ContractsAmount'
import { Strike } from './Inputs/Strike'
import {
  CallReplication,
  PutReplication,
  getUserBalance,
  approveDAI,
  approveWETH,
} from '@/api/form'
import {
  Pairs,
  Period,
  Leverage,
} from '@/views/App/VanillaOptions/Inputs/index'
import {
  getNumerrarie,
  getMinValueForReplication,
  getExpiryDaysToYears,
  getHedgeCost,
  getOptionPrice,
} from '@/utils/formUtils'
import { EvaluateOption } from '@/api/optionsdata'

import { OptionFormActionTypes } from '@/context/form/OptionFormReducer'
import { round } from 'mathjs'

const InputStyle =
  'transition-colors bg-[#0A0F26]/60 hover:bg-[#0A0F26]/90 border-[1px] border-white/10 rounded-xl'

const OPTION_TYPES = { CALL: 'call', PUT: 'put' }

const Form = ({ className }) => {
  const [isAdvancedSettingsOpen, setAdvancedSettingsOpen] = useState(false)
  const { formData, dispatch } = useOptionFormContext()

  const numerrarie = getNumerrarie(formData)
  const minimalValue = getMinValueForReplication(formData)
  let test_minimalLiquidity = minimalValue + ' ' + numerrarie

  let hedgeCost = getHedgeCost(formData)
  let optionPrice = round(getOptionPrice(formData) + hedgeCost, 2)
  let breakEven = round(getOptionPrice(formData) + Number(formData.strike), 2)

  // @dev we should use these values instead of approving the total balance of the user
  let approveAmountCall_TokenA =
    Number(formData.providedLiquidity) + Number(hedgeCost)
  let approveAmountPut_TokenB = Number(formData.providedLiquidity)
  let approveAmountPut_TokenA = Number(hedgeCost)

  // let userBalanceTokenA = getUserBalance(DAI);
  // let userBalanceTokenB = getUserBalance(WETH);
  // EvaluateOption(1000, '30DEC22', 1).then((res) => console.log(res))

  useEffect(() => {
    let isCall = formData.advancedSettings.optionType === 'call' ? 1 : 0
    EvaluateOption(formData.strike, formData.expirationDate, isCall).then(
      (res) => {
        console.log(res, 'sdfsdf')
        dispatch({
          type: OptionFormActionTypes.UPDATE_MODEL,
          name: 'volatility',
          value: res.implied_volatility,
        })
        dispatch({
          type: OptionFormActionTypes.UPDATE_BASE_SETTINGS,
          name: 'underlyingPrice',
          value: res.underlying_price,
        })
        // console.log(formData)
      },
    )
  }, [
    formData.expiresIn,
    formData.strike,
    formData.advancedSettings.optionType,
  ])

  return (
    <section className={cx(className, 'bg-[#fff]/5')}>
      {/* <SelectPairModal/> */}
      <header className=" mt-2 mb-4 px-2  md:gap-6 ">
        <div className="flex justify-between space-x-4">
          <div className="flex gap-4">
            <span className="font-semibold text-sm md:text-[17px] text-[#726DA6]">
              Replicate a vanilla option
            </span>
            <span className="flex space-x-0">
              <button
                className={cx(
                  formData.advancedSettings.optionType === OPTION_TYPES.CALL
                    ? 'bg-[#8B5CF6] bg-opacity-30 hover:bg-opacity-40'
                    : 'bg-[#fff] bg-opacity-10 hover:bg-opacity-20',
                  'mt-0 px-4 py-1 my-auto rounded-l-md text-[12px]',
                )}
                onClick={() => {
                  dispatch({
                    type: OptionFormActionTypes.UPDATE_ADVANCED_SETTINGS,
                    name: 'optionType',
                    value: OPTION_TYPES.CALL,
                  })
                  dispatch({
                    type: OptionFormActionTypes.UPDATE_BASE_SETTINGS,
                    name: 'providedLiquidity',
                    value: '1500',
                  })
                }}
              >
                {OPTION_TYPES.CALL}
              </button>
              <button
                className={cx(
                  formData.advancedSettings.optionType === OPTION_TYPES.PUT
                    ? 'bg-[#8B5CF6] bg-opacity-30'
                    : 'bg-[#fff] bg-opacity-10 hover:bg-opacity-20',
                  'mt-0  px-4 py-1 my-auto rounded-r-md text-[12px]',
                )}
                onClick={() => {
                  dispatch({
                    type: OptionFormActionTypes.UPDATE_ADVANCED_SETTINGS,
                    name: 'optionType',
                    value: OPTION_TYPES.PUT,
                  })
                  dispatch({
                    type: OptionFormActionTypes.UPDATE_BASE_SETTINGS,
                    name: 'providedLiquidity',
                    value: '1',
                  })
                }}
              >
                {OPTION_TYPES.PUT}
              </button>
            </span>
          </div>
          {/* <DropDown
              name="uniswapVersion"
              ActionType={OptionFormActionTypes.UPDATE_BASE_SETTINGS}
              array={UniVersions}
            /> */}
          {/* <div className="flex "> */}
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
        {/* </div> */}
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
        <div className="flex justify-between px-2 py-1">
          <span className="font-normal text-[#726DA6]">
            Minimum Liquidity Required:
          </span>
          <span className="font-normal px-2">{test_minimalLiquidity}</span>
        </div>
        <div className="flex justify-between px-2 py-1">
          <span className="font-normal text-[#726DA6]">Break Even:</span>
          <span className="font-normal px-2">
            {/* {round(Number(formData.strike) +
              Number(formData.advancedSettings.optionPrice) +
              hedgeCost, 3)}{' '} */}
            {breakEven} DAI
          </span>
        </div>
        <div className="flex justify-between px-2 py-1">
          <span className="font-normal text-[#726DA6]">Option Price:</span>
          <span className="font-normal text-[#F3736F] px-2">
            {optionPrice} DAI
          </span>
        </div>
        <div className="flex justify-between px-2 py-1">
          <span className="font-normal text-[#726DA6]">Average Accuracy:</span>
          <span className="font-normal px-2">93%</span>
        </div>
        <button
          className="hover:shadow-xl hover:shadow-[#883FFF] hover:bg-[#883FFF] 
            bg-[#883FFF] my-7 py-4 rounded-xl mx-auto  duration-300  
            w-full px-10 font-semibold text-[18px]"
          onClick={() => {
            if (formData.advancedSettings.optionType === 'call') {
              console.log(formData)

              approveDAI()

              CallReplication({
                tokenA_balance: formData.providedLiquidity,
                amount: formData.contractsAmount,
                fee: hedgeCost.toString(),
                perDay: formData.advancedSettings.hedgesPerDay,
                strike: formData.strike,
                expiration: String(getExpiryDaysToYears(formData.expiresIn)),
                riskFree: formData.riskFree,
                sigma: String(formData.advancedSettings.modelParams.volatility),
              }).then((res) => console.log(res))
            } else if (formData.advancedSettings.optionType === 'put') {
              approveDAI()
              approveWETH()

              PutReplication({
                tokenB_balance: formData.providedLiquidity,
                amount: formData.contractsAmount,
                fee: formData.advancedSettings.feesToSplit,
                perDay: formData.advancedSettings.hedgesPerDay,
                strike: formData.strike,
                expiration: String(getExpiryDaysToYears(formData.expiresIn)),
                riskFree: formData.riskFree,
                sigma: String(formData.advancedSettings.modelParams.volatility),
              }).then((res) => console.log(res))
            }
          }}
        >
          Start Replication
        </button>
      </div>
    </section>
  )
}

export default Form
