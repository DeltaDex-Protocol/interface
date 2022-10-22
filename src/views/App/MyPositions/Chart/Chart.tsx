import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'

const sampleYaxis = (length) => {
  let data = []
  for (let i = 0; i < length; i++) {
    //@ts-ignore
    data.push(Math.round(5 * (1 + Math.sqrt(i))))
  }
  return data
}

function Chart() {
  let base = +new Date(1968, 9, 3)
  let oneDay = 24 * 3600 * 1000
  let date = []
  //   let data = [Math.random() * 300]
  let data = sampleYaxis(20000)
  console.log(data)
  for (let i = 1; i < 20000; i++) {
    var now = new Date((base += oneDay))
    // @ts-ignore
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
    // data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]))
  }
  let option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '1%']
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
      data: date,
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      boundaryGap: false,
      drawGridLinesEnabled: false,
      splitLine: {
        show: false,
      },
    },

    // dataZoom: [
    //   {
    //     type: 'inside',
    //     start: 0,
    //     end: 10,
    //   },
    //   {
    //     start: 0,
    //     end: 10,
    //   },
    // ],
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgba(166, 206, 227, 1)',
        },
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
        data: data,
      },
    ],
  }

  return <ReactEcharts option={option} className="" />
}

export default Chart
