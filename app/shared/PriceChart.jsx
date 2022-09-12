import { useState, useEffect } from 'react';
import { memo } from 'react';

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


function PriceChart( { data } ) {
  const [hoverPrice, setHoverPrice] = useState("");


  data = data.map((el, index) => ({
    x: index,
    y: el.value,
  }));

  const chartData = {
    datasets: [{
      label: 'price',
      data,
      backgroundColor: '#e85b9480',
      borderColor: '#e85b94ff',
      showLine: true,
      pointHoverRadius: 0, // somewhen it was 10
    }],
  }

  const config = {
    type: 'scatter',
    data: chartData,
    options: {
      animation: {
        duration: 0,
      },
      // onHover: (el) => { setHoverPrice(data[el.x].y)},
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

    if (data[data.length-1] !== undefined)
      setHoverPrice(data[data.length-1].y)

    return () => {
      chart.destroy()
    }
  }, [data])

  return (
    <div className="relative bg-gray-100 rounded-xl mr-4 xl:mr-0">
        <h5 className="absolute -left-3 -bottom-100 font-sans text-sm ml-5">{hoverPrice + "$"}</h5>
        <canvas id="price-chart" className='h-24' />
    </div>
  )
}

export default (PriceChart);