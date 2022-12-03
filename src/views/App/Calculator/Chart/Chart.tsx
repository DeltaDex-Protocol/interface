import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { useMediaQuery } from 'react-responsive'
import { useState, useEffect } from 'react'
import cx from 'classnames'

import { putPayoffData } from '@/utils/optionsPayoff'
import LpProfileData from '@/utils/LpProfile'

import { useCalculatorFormContext } from '@/context/calculator/CalculatorContext'
import { round } from 'lodash-es'

import {
  PUT_OPTION_PAYOFF,
  UniswapV3PlusFees,
  UniswapV3AndPutReplication,
  PureDeposit,
} from './titles'

function Chart() {
  const { formData } = useCalculatorFormContext()
  const [chartTooltip, setChartTooltip] = useState<Array<any>>([
    { name: '', value: 'null' },
  ])
  const text_colors = [
    'text-[#77dc89]',
    'text-[#8b5cf6]',
    'text-[#e67975]',
    'text-[#fff]',
  ]

  const [OptionData, setOptionData] = useState<number[][]>([])
  const [LPdata, setLPdata] = useState<number[][]>([])
  const [LPplusOption, setLPplusOption] = useState<number[][]>([])
  // var pureDeposit: number[] = []
  // for (let i = 0; i < 1.2 * formData.currentPrice; i++)
  //   pureDeposit.push[formData.depositAmount]

  // let chart_prices = CHART_PRICES.filter(function (el, index) {
  //   return index % 2
  // })
  // const cleanedObject = pickBy(chart_prices, (v) => v !== undefined)
  // console.log(chart_prices)
  // console.log(OptionData)

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
        // fees: formData.dailyFees * formData.period,
        fees: formData.userFeeForecast,
      }).then((res) => {
        setLPdata(res)
      })
    }
    let LP_plus_Option = LPdata?.map((el, key) => {
      return [LPdata[key][0], LPdata[key][1] + OptionData[key][1]]
    })
    setLPplusOption(LP_plus_Option)

    fetchData()
  }, [formData])

  useEffect(() => {
    let LP_plus_Option = LPdata?.map((el, key) => {
      return [LPdata[key][0], LPdata[key][1] + OptionData[key][1]]
    })
    setLPplusOption(LP_plus_Option)
  }, [OptionData, LPdata, formData])

  const isLG = useMediaQuery({
    query: '(min-width: 1024px)',
  })
  const isXL = useMediaQuery({
    query: '(min-width: 1280px)',
  })

  let option = {
    tooltip: {
      trigger: 'axis',
      // position: function (pt) {
      //   return [pt[0], '0.001%']
      // },
      formatter(e) {
        let res = e.map((el) => {
          return { name: [el.seriesName], value: round(el.data[1], 1) }
        })
        res.push({ price: e[0].data[0] | 0 })
        setChartTooltip(res)
      },
    },
    grid: {
      show: false,
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      // data: chart_prices,
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
        name: PUT_OPTION_PAYOFF,
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgba(119, 220, 137, 1)',
        },
        data: OptionData,
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
        name: UniswapV3PlusFees,
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgba(139, 92, 246, 1)',
        },
        data: LPdata,
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
        name: UniswapV3AndPutReplication,
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgba(230, 121, 117, 1)',
        },
        data: LPplusOption,
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
        name: PureDeposit,
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgba(217, 217, 217, 1)',
        },
        data: OptionData?.map((el, index) => {
          return [el[0], formData.depositAmount]
        }),
        // .filter((el, index) => index % 2),
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
    <div className="mx-auto mt-4">
      <div className="grid grid-cols-4 ">
        {chartTooltip.map((el, index) => {
          if (index === chartTooltip.length - 1) return
          return (
            <div
              className={cx('flex flex-col text-center', text_colors[index])}
              key={index}
            >
              <span className="text-sm">{chartTooltip[index].name}</span>
              <div>{chartTooltip[index].value}</div>
            </div>
          )
        })}
        <div className="text-center text-sm">
          {chartTooltip[chartTooltip.length - 1].price &&
            'Price: ' + chartTooltip[chartTooltip.length - 1].price}
        </div>
      </div>
      <ReactEcharts
        option={option}
        style={{
          height: '575px',
          width: isXL ? '775px' : isLG ? '700px' : '100%',
        }}
      />
    </div>
  )
}

export default Chart
