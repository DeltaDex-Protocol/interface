import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { useMediaQuery } from 'react-responsive'
import { useState, useEffect } from 'react'
import { useRef } from 'react'

import putPayoffData from '@/utils/optionsPayoff'
import LpProfileData from '@/utils/LpProfile'

import { useCalculatorFormContext } from '@/context/calculator/CalculatorContext'

const colors = ['#5470C6', '#91CC75', '#EE6666']

function Chart() {
  const { formData } = useCalculatorFormContext()
  const eChartsRef = useRef(null as any)

  const [OptionData, setOptionData] = useState<number[][]>([[0]])
  const [LPdata, setLPdata] = useState<number[][]>([[0]])

  useEffect(() => {
    const fetchData = () => {
      putPayoffData({
        currentPrice: formData.currentPrice,
        strike: formData.strike,
        expiry: formData.period,
        riskFree: 0.1,
        volatility: 0.7,
        contractAmount: formData.contractsAmount,
      }).then((res) => {
        setOptionData(res)
        console.log(res)
      })

      LpProfileData({
        currentPrice: formData.currentPrice,
        lowerPrice: formData.minimalPrice,
        upperPrice: formData.maximalPrice,
        priceUSDX: formData.currentPrice,
        priceUSDY: 1,
        depositAmount: formData.depositAmount,
      }).then((res) => {
        // setLPdata(res)
        console.log(res)
      })

      console.log(formData)
    }
    fetchData()
  }, [])

  // let OptionData = putPayoffData({
  //   currentPrice: formData.currentPrice,
  //   strike: formData.strike,
  //   expiry: formData.period,
  //   riskFree: 0.1,
  //   volatility: 0.7,
  //   contractAmount: formData.contractsAmount,
  // })

  // let LPdata = LpProfileData({
  //   currentPrice: formData.currentPrice,
  //   lowerPrice: formData.minimalPrice,
  //   upperPrice: formData.maximalPrice,
  //   priceUSDX: formData.currentPrice,
  //   priceUSDY: 1,
  //   depositAmount: formData.depositAmount,
  // })

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
        name: 'Uniswap V3 TV profile',
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

      // {
      //   name: 'Uniswap v3 + put replication',
      //   type: 'line',
      //   symbol: 'none',
      //   sampling: 'lttb',
      //   itemStyle: {
      //     color: 'rgba(230, 121, 117, 1)',
      //   },
      //   data: TVs_NO_LP_FEES,
      //   areaStyle: {
      //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //       {
      //         offset: 0,
      //         color: 'rgba(56, 76, 255, 0.9)',
      //       },
      //       {
      //         offset: 1,
      //         color: 'rgba(44, 62, 80, 0)',
      //       },
      //     ]),
      //   },
      // },
    ],
  }

  return (
    <div className="mx-auto">
      <ReactEcharts
        ref={eChartsRef}
        option={option}
        style={{
          height: '450px',
          width: isXL ? '750px' : isLG ? '700px' : '100%',
        }}
      />
    </div>
  )
}

export default Chart
