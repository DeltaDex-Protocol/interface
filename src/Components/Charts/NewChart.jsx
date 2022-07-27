import { useEffect } from 'react'
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from 'chart.js'

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
)


const uniV2TotalValue = (TV0, S0, S) => {
  return TV0 * (Math.sqrt(S) - Math.sqrt(S0)) / Math.sqrt(S0)
}


const fillData = (optionType, params) => {

  const _data = []

  const { center, width, k, optionPrice } = params;
  const TV0 = 100
  const S0 = 1000

  const N = 50

  // __ part of chart
  for (let i = N-1; i >= 0; i--)
    _data.push({
      x: Math.round(center - i * width / N),
      y: +TV0,
    })

  // / part of chart
  for (let i = 0; i < N; i++)
    _data.push({
      x: Math.round(center + i * width / N),
      y: TV0 - uniV2TotalValue(TV0, S0, center + i * width / N ),
    })

  return _data;
}



const title = 'Expected Profit and Loss'

export default function ProfitChart(
  props
) {

  // center = strike, k = amount * 2, 
  const { center, width, k, optionPrice } = {center: 1000, width:4000, k:1, optionPrice:100};
  const data = fillData('curvedPut',{center: 1000, width:2000, k:1, optionPrice:100} )

  const N = 50
  // console.log(Math.round(center ))
  // __ part of chart
  // for (let i = 0; i < N; i++)
  //   data.push({
  //     x: Math.round(center - i * width / N),
  //     y: -optionPrice,
  //   })

  // // / part of chart
  // for (let i = 0; i < N; i++)
  //   data.push({
  //     x: Math.round(center + i * width / N),
  //     y: i * (width / N) * k - optionPrice,
  //   })
  console.log(data);


  const chartData = {
    datasets: [{
      label: 'profit',
      data,
      backgroundColor: '#e85b9480',
      borderColor: '#e85b94ff',
      showLine: true,
    }],
  }

  const config = {
    type: 'scatter',
    data: chartData,
    options: {
      animation: {
        duration: 0
      },
      interaction: {
        mode: 'x',
        intersect: false,
      },
      elements: {
        point: { radius: 0}
      },
      scales: {
        y: {
          grid: {
            display: false,
          },
          title: {
            display: true,
            text: 'profit, $',
          },
          position: { x: center },
        },
        x: {
          grid: {
            display: false,
          },
          title: {
            display: true,
            text: 'Exchange rate at expiry, $',
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  }
  useEffect(() => {
    const ctx = document
      .getElementById('profit-chart')
      .getContext('2d')

    const chart = new Chart(ctx, config)
    return () => {
      chart.destroy()
    }
  }, [center, k, width])

  return (
    <div className="max-w-md p-2 sm:p-8 border rounded shadow">
      <h5 className="font-sans text-base">{title}</h5>
      <hr className="my-2"/>
      <canvas id="profit-chart"/>

      <div className="mt-3 flex justify-between text-gray-500 font-sans">
        <span className="flex items-center gap-3">
          <div className="bg-green-400 w-3 h-3 rounded-full"/>
          <span className="text-sm"> Max Profit </span>
        </span>
        <span className="text-sm"> {Infinity} </span>
      </div>
      <div className="mt-1 flex justify-between text-gray-500 font-sans">
        <span className="flex items-center gap-3">
          <div className="bg-orange-400 w-3 h-3 rounded-full"/>
          <span className="text-sm"> Break Even </span>
        </span>
        <span className="text-sm"> {center} </span>
      </div>
      <div className="mt-1 flex justify-between text-gray-500 font-sans">
        <span className="flex items-center gap-3">
          <div className="bg-pink-400 w-3 h-3 rounded-full"/>
          <span className="text-sm"> Max Loss </span>
        </span>
        <span className="text-sm"> {optionPrice} </span>
      </div>
    </div>
  )
}

