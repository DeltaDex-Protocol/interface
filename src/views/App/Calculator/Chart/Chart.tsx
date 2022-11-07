import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { useMediaQuery } from 'react-responsive'
import { useState, useEffect } from 'react'

import putPayoffData from '@/utils/optionsPayoff'
import LpProfileData from '@/utils/LpProfile'

import { useCalculatorFormContext } from '@/context/calculator/CalculatorContext'
import { round } from 'lodash-es'

const colors = ['#5470C6', '#91CC75', '#EE6666']

function Chart() {
  const { formData } = useCalculatorFormContext()

  const [OptionData, setOptionData] = useState<number[][]>([])
  const [LPdata, setLPdata] = useState<number[][]>([])
  const [LPplusOption, setLPplusOption] = useState<number[][]>([])
  // var pureDeposit: number[] = []
  // for (let i = 0; i < 1.2 * formData.currentPrice; i++)
  //   pureDeposit.push[formData.depositAmount]

  useEffect(() => {
    const fetchData = async () => {
      putPayoffData({
        currentPrice: formData.currentPrice,
        strike: formData.strike,
        expiry: formData.period,
        riskFree: 0.1,
        volatility: 0.7,
        contractAmount: formData.contractsAmount,
        optionCost: formData.optionCost,
      }).then((res) => {
        setOptionData(res)
      })

      LpProfileData({
        currentPrice: formData.currentPrice,
        lowerPrice: formData.minimalPrice,
        upperPrice: formData.maximalPrice,
        priceUSDX: formData.currentPrice,
        priceUSDY: 1,
        depositAmount: formData.depositAmount,
        fees: formData.dailyFees * formData.period,
      }).then((res) => {
        setLPdata(res)
      })
    }
    let LP_plus_Option = LPdata[1]?.map((el, key) => {
      return LPdata[1][key] + OptionData[1][key]
    })
    setLPplusOption([LPdata[0], LP_plus_Option])

    fetchData()
  }, [formData.currentPrice, formData.optionCost])
  

  useEffect(() => {
    let LP_plus_Option = LPdata[1]?.map((el, key) => {
      return LPdata[1][key] + OptionData[1][key]
    })
    setLPplusOption([LPdata[0], LP_plus_Option])
  }, [OptionData, LPdata, formData.dailyFees])

  const isLG = useMediaQuery({
    query: '(min-width: 1024px)',
  })
  const isXL = useMediaQuery({
    query: '(min-width: 1280px)',
  })

  let option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '0.001%']
      },
    },
    grid: {
      show: false,
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      // data: CHART_PRICES,
      name: 'Price',
      splitLine: {
        show: false,
      },
    },

    yAxis: [
      {
        name: 'Total value',
        type: 'value',
        boundaryGap: false,
        drawGridLinesEnabled: false,
        splitLine: {
          show: false,
        },
      },
    ],

    series: [
      {
        name: 'Uniswap V3 + earned fees',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgba(139, 92, 246, 1)',
        },
        data: LPdata[1],
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(44, 62, 80, 1)',
            },
            {
              offset: 1,
              color: 'rgba(44, 62, 80, 0)',
            },
          ]),
        },
      },
      {
        name: 'Put option payoff',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgba(119, 220, 137, 1)',
        },
        data: OptionData[1],
        // areaStyle: {
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //     {
        //       offset: 0,
        //       color: 'rgba(56, 76, 255, 0.9)',
        //     },
        //     {
        //       offset: 1,
        //       color: 'rgba(44, 62, 80, 0)',
        //     },
        //   ]),
        // },
      },

      {
        name: 'Uniswap v3 + put replication',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgba(230, 121, 117, 1)',
        },
        data: LPplusOption[1],
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(56, 76, 255, 0.9)',
            },
            {
              offset: 1,
              color: 'rgba(44, 62, 80, 0)',
            },
          ]),
        },
      },
      {
        name: 'pure deposit',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgba(217, 217, 217, 1)',
        },
        data: Array(round(1.2 * formData.currentPrice)).fill(
          formData.depositAmount,
        ),
        // areaStyle: {
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //     {
        //       offset: 0,
        //       color: 'rgba(56, 76, 255, 0.9)',
        //     },
        //     {
        //       offset: 1,
        //       color: 'rgba(44, 62, 80, 0)',
        //     },
        //   ]),
        // },
      },
    ],
  }

  return (
    <div className="mx-auto">
      <ReactEcharts
        option={option}
        style={{
          height: '650px',
          width: isXL ? '775px' : isLG ? '700px' : '100%',
        }}
      />
    </div>
  )
}

export default Chart
