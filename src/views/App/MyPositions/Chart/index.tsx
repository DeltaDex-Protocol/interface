import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { number } from 'mathjs'
import {
  CHART_PRICES,
  INITIAL_TV,
  TVs,
  TVs_LP_FEES_AND_OPTION_COST,
  TVs_NO_LP_FEES,
  TVs_LP_FEES,
} from './constants'

const sampleYaxis = (length) => {
  let data = []
  for (let i = 0; i < length; i++) {
    //@ts-ignore
    data.push(Math.round(50 * (1 + Math.sqrt(i))))
  }
  return data
}

const colors = ['#5470C6', '#91CC75', '#EE6666']

function Chart({data }) {
  // let base = +new Date(1968, 9, 3)
  // let oneDay = 24 * 3600 * 1000
  // let date = []
  // //   let data = [Math.random() * 300]
  // let data = sampleYaxis(2000)
  // console.log(data)
  // for (let i = 0; i < 2000; i += 1) {
  //   // var now = new Date((base += oneDay))
  //   // @ts-ignore
  //   date.push(i)
  //   // data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]))
  // }
  let option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '0.001%']
      },
    },
    grid: {
      show: false, // you can either change hear to disable all grids
    },

    // title: {
    //   left: 'center',
    //   text: 'Large Area Chart',
    // },
    // toolbox: {
    //   feature: {
    //     dataZoom: {
    //       yAxisIndex: 'none',
    //     },
    //     restore: {},
    //     saveAsImage: {},
    //   },
    // },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      // data: CHART_PRICES,
      name: 'Price',
      splitLine: {
        show: false,
      },
    },

    // xAxis: [
    //   {
    //     type: 'category',
    //     axisTick: {
    //       alignWithLabel: true,
    //     },
    //     // prettier-ignore
    //     data: date
    //   },
    // ],
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
        name: 'Initial TV (pure USDC)',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgba(139, 92, 246, 1)',
        },
        data: data,
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
      // {
      //   name: 'Uniswap V3 TV profile',
      //   type: 'line',
      //   symbol: 'none',
      //   sampling: 'lttb',
      //   itemStyle: {
      //     color: 'rgba(119, 220, 137, 1)',
      //   },
      //   data: TVs,
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

      // {
      //   name: 'Uniswap v3 + put replication',
      //   type: 'line',
      //   symbol: 'none',
      //   sampling: 'lttb',
      //   itemStyle: {
      //     color: 'rgba(230, 121, 117, 1)',
      //   },
      //   data: TVs_LP_FEES,
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

  return <ReactEcharts option={option} className="" />
}

export default Chart
