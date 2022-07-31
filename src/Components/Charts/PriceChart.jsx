import { useState, useEffect } from 'react';

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



export default function PriceChart( { data } ) {

  const title = 'ETH price';

  const [hoverPrice, setHoverPrice] = useState(1000);

  data = data.map((el, index) => ({
    x: index,
    y: el.value,
  }));

  // console.log(data);

  // data = data.slice(40, data.length);

  const chartData = {
    datasets: [{
      label: 'price',
      data,
      backgroundColor: '#e85b9480',
      borderColor: '#e85b94ff',
      showLine: true,
      pointHoverRadius: 10,
    }],
  }

  const config = {
    type: 'scatter',
    data: chartData,
    options: {
      animation: {
        duration: 0,
      },
      onHover: (el) => { setHoverPrice(data[el.x].y)},
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
            drawBorder: false,
            display: false,
          },
          title: {
            display: false,
            text: 'price, $',
          },
          ticks: {
            display: false,
          }
          // position: { x: center },
        },
        x: {
          // type: 'time',

          grid: {
            drawBorder: false,
            display: false,
          },
          title: {
            display: false,
            text: '',
          },
          ticks: {
            display: false,
          }
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    },
  }




  useEffect(() => {
    const ctx = document
      .getElementById('price-chart')
      .getContext('2d')

    const chart = new Chart(ctx, config)
    return () => {
      chart.destroy()
    }
  }, [data])

  return (
    <div className="mt-5 w-3/4 p-2 sm:p-8 border rounded-lg shadow-md">
      <h5 className="font-sans text-sm">{title + ": "+ hoverPrice + "$"}</h5>
      {/*<hr className="my-2"/>*/}
      <canvas id="price-chart"/>

      {/*<div className="mt-3 flex justify-between text-gray-500 font-sans">
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
        <span className="text-sm"> {'dsf'} </span>
      </div>
      <div className="mt-1 flex justify-between text-gray-500 font-sans">
        <span className="flex items-center gap-3">
          <div className="bg-pink-400 w-3 h-3 rounded-full"/>
          <span className="text-sm"> Max Loss </span>
        </span>
        <span className="text-sm"> {'sdfdfs'} </span>
      </div>*/}
    </div>
  )
}