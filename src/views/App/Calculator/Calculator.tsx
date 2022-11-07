import React from 'react'
import { useState, useEffect } from 'react'
import Chart from './Chart'
import { Skeleton } from '@/components/kit'
// import { Tile } from '@/components/kit'
// import { Tooltip } from '@/components/kit/Tooltip/Tooltip'
import EthLogo from 'public/images/tokens/eth.svg'

import { Form } from '@/components/kit'
import Field from '@/components/kit/Form/components/Field'
import Header from '@/components/kit/Form/components/Header'

import { useCalculatorFormContext } from '@/context/calculator/CalculatorContext'
import { CalculatorFormActionTypes } from '@/context/calculator/CalculatorReducer'

import { getTokenAmountsFromDepositAmounts } from '@/utils/liquidityMath'
import { get_tokens_amounts } from '@/utils/upd-uniswap-math'

const FEES_FORM_TITLE = 'Uniswap v3'
const OPTION_FORM_TITLE = 'Vanilla option replication'

import estimateFees24H from '@/utils/estimateFees'
import { getEthPrice } from '@/api/tokensPrices'
import { round } from 'lodash-es'

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
  } = formData

  const { optionType, strike, contractsAmount } = formData

  const [DailyFees, setDailyFees] = useState<number>(0)

  useEffect(() => {
    getEthPrice().then((price) => {
      dispatch({
        type: CalculatorFormActionTypes.UPDATE_BASE_SETTINGS,
        name: 'currentPrice',
        value: price,
      })
      console.log(price)
      estimateFees24H({
        pool: poolAddress,
        deposit: Number(depositAmount),
        token0_decimals: '6',
        token1_decimals: '18',
        priceRange: [Number(minimalPrice), Number(maximalPrice)],
        initialPrice: price,
        period: period,
        feeTier: feeTier,
      }).then((res) => setDailyFees(round(res.collectedFees24H, 2)))
    })
  }, [])

  //   console.log({
  //     pool: poolAddress,
  //     deposit: Number(depositAmount),
  //     token0_decimals: '6',
  //     token1_decimals: '18',
  //     priceRange: [Number(minimalPrice), Number(maximalPrice)],
  //     initialPrice: 1312,
  //     period: Number(period.split(' ')[0]), // in days
  //     feeTier: feeTier,
  //   })

  return (
    <div className="">
      <div className="lg:grid lg:grid-cols-8">
        <div className="col-span-4 md:mt-[10%]  ">
          <div className="pb-0 text-2xl">Calculator</div>
          <Chart />
        </div>
        <div className="col-span-1" />
        <div className="col-span-3 ">
          <div className="flex flex-col gap-5">
            <Form
              header={[FEES_FORM_TITLE, period + ' Days']}
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
                  <span className="my-auto py-1">{depositAmount}</span>
                </Field>
                <Field title="Min price" className="col-span-5">
                  <div className="flex flex-col gap-0">
                    <span className="my-auto">{minimalPrice}</span>
                    <span className="text-[12px] text-[#726DA6]">
                      {token2} per {token1}
                    </span>
                  </div>
                </Field>
                <Field title="Max price" className="col-span-5">
                  <div className="flex flex-col gap-0">
                    <span className="my-auto">{maximalPrice}</span>
                    <span className="text-[12px] text-[#726DA6]">
                      {token2} per {token1}
                    </span>
                  </div>
                </Field>
                <div className="col-span-10">
                  <Header content={['Estimated fees']} className="mb-0" />
                </div>
                <Field className="col-span-10 pt-1 pb-2">
                  <div className="my-auto flex justify-between">
                    <span>Daily</span>

                    <span className="font-medium text-[#55AC68]">
                      {DailyFees !== 0 && <>{DailyFees}$</>}
                      {DailyFees == 0 && <Skeleton h={25} />}
                    </span>
                  </div>
                  <div className="my-auto flex justify-between">
                    <span>{period + ' Days'}</span>
                    <span className="font-medium text-[#55AC68]">
                      {DailyFees !== 0 && <>{round(DailyFees * period, 2)}$</>}
                      {DailyFees == 0 && <Skeleton h={25} />}{' '}
                    </span>
                  </div>
                </Field>
              </div>
            </Form>
            <Form header={[OPTION_FORM_TITLE, optionType]}>
              <div className="grid grid-cols-10 gap-x-2 gap-y-2">
                <Field title="Strike price" className="col-span-5">
                  <span className="my-auto">{strike}</span>
                </Field>
                <Field title="Number of contracts" className="col-span-5">
                  <span className="my-auto">{contractsAmount}</span>
                </Field>
                <div className="px-2 py-2 col-span-10 flex flex-col gap-1">
                  <div className="my-auto flex justify-between">
                    <span>IV of selected option</span>
                    <span className="font-medium ">72%</span>
                  </div>
                  <div className="my-auto flex justify-between">
                    <span>Estimated cost of replication</span>
                    <span className="font-medium text-[#F3736F]">$56.12</span>
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
