import React from 'react'
import { useState, useEffect } from 'react'
import Chart from './Chart'
import { Skeleton } from '@/components/kit'
import Input from '@/components/kit/Form/components/Input'
import EthLogo from 'public/images/tokens/eth.svg'

import { Form } from '@/components/kit'
import Field from '@/components/kit/Form/components/Field'
import Header from '@/components/kit/Form/components/Header'
import DropDown from '@/components/kit/Form/components/DropDown'
import { NewDropDown } from '../VanillaOptions/Inputs/NewDropDown'

import { useCalculatorFormContext } from '@/context/calculator/CalculatorContext'
import { CalculatorFormActionTypes } from '@/context/calculator/CalculatorReducer'
import estimateFees24H from '@/utils/estimateFees'
import { getEthPrice } from '@/api/tokensPrices'
import { EvaluateOption, getExpirations } from '@/api/optionsdata'

import { round } from 'lodash-es'
import { StringToDays } from '@/utils/formUtils'

const FEES_FORM_TITLE = 'Uniswap v3'
const OPTION_FORM_TITLE = 'Vanilla option replication'

const Calculator = () => {
  const { formData, dispatch } = useCalculatorFormContext()

  const {
    token1,
    token2,
    period,
    poolAddress,
    depositAmount,
    minimalPrice,
    maximalPrice,
    feeTier,
    currentPrice,
    optionCost,
    dailyFees,
  } = formData

  const { optionType, strike, contractsAmount, riskFree, volatility } = formData
  // const periods = [
  //   formData.period + ' days',
  //   ...['7 days', '14 days', '21 days', '28 days', '35 days', '42 days'],
  // ]

  // const [DailyFees, setDailyFees] = useState<number>(0)

  const [periods, setPeriods] = useState<string[]>([])

  // const [selectedPeriod, setSelectedPeriod] = useState<string>('')

  const setSelectedPeriod = (value) =>
    dispatch({
      type: CalculatorFormActionTypes.UPDATE_BASE_SETTINGS,
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
    })
  }, [])

  useEffect(
    () => {
      getEthPrice().then((price) => {
        dispatch({
          type: CalculatorFormActionTypes.UPDATE_BASE_SETTINGS,
          name: 'currentPrice',
          value: price,
        })
        // console.log(price)
        estimateFees24H({
          pool: poolAddress,
          deposit: Number(depositAmount),
          token0_decimals: '6',
          token1_decimals: '18',
          priceRange: [Number(minimalPrice), Number(maximalPrice)],
          initialPrice: price,
          period: period,
          feeTier: feeTier,
        }).then((fees) => {
          dispatch({
            type: CalculatorFormActionTypes.UPDATE_BASE_SETTINGS,
            name: 'dailyFees',
            value: round(fees.collectedFees24H, 2),
          })
        })
      })

      fetch(
        `/app/api/get-option-costs?currentPrice=${currentPrice}
      &strike=${strike}&expiry=${period}&riskFree=${riskFree}
      &volatility=${volatility}&contractAmount=${contractsAmount}`,
      )
        .then((res) => res.json())
        .then((cost) =>
          dispatch({
            type: CalculatorFormActionTypes.UPDATE_BASE_SETTINGS,
            name: 'optionCost',
            value: round(cost, 2),
          }),
        )
    },
    // DO NOT CHANGE DEPENDENCY ARRAY TO JUST formData !!!
    [
      formData.optionCost,
      formData.currentPrice,
      formData.depositAmount,
      formData.contractsAmount,
      formData.strike,
      formData.minimalPrice,
      formData.maximalPrice,
      formData.expirationDate
    ],
  )

  useEffect(() => {
    const isCall = formData.optionType === 'call' ? 1 : 0
    if (formData.expirationDate !== '')
      EvaluateOption(formData.strike, formData.expirationDate, isCall).then(
        (res) => {
          dispatch({
            type: CalculatorFormActionTypes.UPDATE_BASE_SETTINGS,
            name: 'volatility',
            value: res.implied_volatility,
          })

        },
      )
  }, [formData.optionType, formData.expirationDate, period, formData.strike])

  return (
    <div className="">
      <div className="lg:grid lg:grid-cols-11">
        <div className="col-span-7">
          <div className="text-2xl">Position builder</div>
          <Chart />
        </div>
        {/* <div className="col-span-1" /> */}
        <div className="col-span-4 ">
          <div className="flex flex-col gap-5">
            <Form
              header={[
                FEES_FORM_TITLE,
                <div className="flex space-x-2">
                  <span className="my-auto text-[15px]">Expiration: </span>
                  <div className="bg-[#fff]/10 rounded-xl">
                    <NewDropDown
                      name="period"
                      array={periods}
                      ActionType={CalculatorFormActionTypes.UPDATE_PERIOD}
                      // dispatch={dispatch}
                      dispatch={({ type, name, value }) => {
                        console.log(periods)
                        setSelectedPeriod(value)
                        setPeriods([
                          // formData.expiresIn,
                          // periods[0],
                          value,
                          ...periods.slice(1),
                          // ...['7 days', '14 days', '21 days', '28 days', '35 days', '42 days'],
                        ])
                        dispatch({ type, name, value: StringToDays(value)})
                      }}
                    />
                  </div>
                </div>,
              ]}
              className="mx-auto"
            >
              <div className="grid grid-cols-10 gap-x-2 gap-y-2">
                <Field title="Select pair" className="col-span-6">
                  <div className="flex justify-between ">
                    <div className="flex gap-1">
                      <EthLogo className="h-7 w-7" />
                      <div className="my-auto rounded-md"></div>
                      <span className="my-auto">
                        {token2}-{token1}
                      </span>
                    </div>
                    <span className="my-auto bg-[#352766] px-2 py-1 rounded-lg">
                      {Number(feeTier) / 1000 / 10}%
                    </span>
                  </div>
                </Field>
                <Field title="Deposit amount" className="col-span-4">
                  <span className="my-auto py-1">
                    <Input
                      value={String(depositAmount)}
                      min={0}
                      max={10000}
                      eventHandler={(value) =>
                        dispatch({
                          type: CalculatorFormActionTypes.UPDATE_BASE_SETTINGS,
                          name: 'depositAmount',
                          value: Number(value),
                        })
                      }
                    />
                  </span>
                </Field>
                <Field title="Min price" className="col-span-5">
                  <div className="flex flex-col gap-0">
                    <span className="my-auto">
                      <Input
                        value={String(minimalPrice)}
                        min={0}
                        max={10000}
                        eventHandler={(value) =>
                          dispatch({
                            type:
                              CalculatorFormActionTypes.UPDATE_BASE_SETTINGS,
                            name: 'minimalPrice',
                            value: Number(value),
                          })
                        }
                      />
                    </span>
                    <span className="text-[12px] text-[#726DA6]">
                      {token2} per {token1}
                    </span>
                  </div>
                </Field>
                <Field title="Max price" className="col-span-5">
                  <div className="flex flex-col gap-0">
                    <span className="my-auto">
                      <Input
                        value={String(maximalPrice)}
                        min={0}
                        max={10000}
                        eventHandler={(value) =>
                          dispatch({
                            type:
                              CalculatorFormActionTypes.UPDATE_BASE_SETTINGS,
                            name: 'maximalPrice',
                            value: Number(value),
                          })
                        }
                      />
                    </span>
                    <span className="text-[12px] text-[#726DA6]">
                      {token2} per {token1}
                    </span>
                  </div>
                </Field>
                <div className="col-span-10">
                  <Header content={['Fees estimation']} className="mb-0" />
                </div>
                <Field className="col-span-10">
                  <span className="my-auto flex justify-between">
                    <span className="text-[14px] text-[#726DA6]">
                      Forecast of fees collected
                    </span>
                    <span>
                      <Input
                        value={
                          String(formData.userFeeForecast) === '0'
                            ? null
                            : String(formData.userFeeForecast)
                        }
                        placeholder={10}
                        // min={}
                        max={1000}
                        step={10}
                        width={10}
                        eventHandler={(value) => 
                          dispatch({
                            type:
                              CalculatorFormActionTypes.UPDATE_BASE_SETTINGS,
                            name: 'userFeeForecast',
                            value: Number(value),
                          })
                        }
                      />
                      <span>$</span>
                    </span>
                  </span>
                </Field>
                {/* <Field className="col-span-10 pt-0 pb-3">
                  <div className="my-auto flex justify-between"> */}
                {/* <span>Daily</span>
                    <span className="font-medium text-[#55AC68]">
                      {dailyFees !== 0 && <>{dailyFees}$</>}
                      {dailyFees == 0 && <Skeleton h={25} />}
                    </span> */}
                {/* </div> */}

                {/* <div className="my-auto flex justify-between">
                    <span>{period + ' Days'}</span>
                    <span className="font-medium text-[#55AC68]">
                      {dailyFees !== 0 && <>{round(dailyFees * period, 2)}$</>}
                      {dailyFees == 0 && <Skeleton h={25} />}{' '}
                    </span>
                  </div> */}
                {/* </Field> */}
                <div className="text-sm mx-3 col-span-10 my-auto flex justify-between">
                  <span className="text-[14px]">
                    {'Historical fees collected for last ' + period + ' days'}
                  </span>
                  <span className="font-medium text-[#55AC68]">
                    {dailyFees !== 0 && <>{round(dailyFees * period, 2)}$</>}
                    {dailyFees == 0 && <Skeleton h={25} />}{' '}
                  </span>
                </div>
              </div>
            </Form>
            <Form header={[OPTION_FORM_TITLE, optionType]}>
              <div className="grid grid-cols-10 gap-x-2 gap-y-2">
                <Field title="Strike price" className="col-span-5">
                  <span className="my-auto">
                    <Input
                      value={String(strike)}
                      min={0}
                      max={10000}
                      step={10}
                      eventHandler={(value) =>
                        dispatch({
                          type: CalculatorFormActionTypes.UPDATE_BASE_SETTINGS,
                          name: 'strike',
                          value: Number(value),
                        })
                      }
                    />
                  </span>
                </Field>
                <Field title="Number of contracts" className="col-span-5">
                  <span className="my-auto">
                    <Input
                      value={contractsAmount}
                      min={0}
                      max={100}
                      eventHandler={(value) =>
                        dispatch({
                          type: CalculatorFormActionTypes.UPDATE_BASE_SETTINGS,
                          name: 'contractsAmount',
                          value: Number(value),
                        })
                      }
                    />
                  </span>
                </Field>
                <div className="px-2 py-2 col-span-10 flex flex-col gap-1">
                  <div className="my-auto flex justify-between">
                    <span>Option price</span>
                    <span className="font-medium text-[#F3736F]">
                      {optionCost}$
                    </span>
                  </div>
                  <div className="my-auto flex justify-between">
                    <span>Implied volatility</span>
                    <span className="font-medium text-[#F3736F]">
                      {round(formData.volatility*100)}%
                    </span>
                  </div>
                  <div className="my-auto flex justify-between">
                    <span>
                      Overheads due to replication
                      <br /> (estimated)
                    </span>
                    <span className="font-medium text-[#F3736F]">{4.6}$</span>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
