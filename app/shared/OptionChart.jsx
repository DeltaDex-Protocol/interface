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

import {BSvanillaCall, deltaBSvanillaCall} from '../utils/BSvanillaCall.js';
import {BSvanillaPut, deltaBSvanillaPut} from '../utils/BSvanillaPut.js';
import {BScurvedPut, deltaBScurvedPut} from '../utils/BScurvedPut.js';
import {BScurvedCall, deltaBScurvedCall} from '../utils/BScurvedCall.js';




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


const fillVanillaCall = (S, K, T, r, sigma, direction) => {
  const _data = [];

  const N = 100;
  const width = 2 * K;

  const dir = (direction == 'long' ? 1 : -1);


  const optionPrice = BSvanillaCall({S, K, T, r, sigma});
  const pivot = Math.round(K / width * N);


  for (let i = 0; i < pivot; i++) {
    var S = ((i / N) * width);
    _data.push({
      x: Math.round(S),
      y: -dir*optionPrice,
    })
  }

  for (let i = pivot; i < N; i++) {
    var S = ((i / N) * width);
    _data.push({
      x: Math.round(S),
      y: dir*((S - K) - optionPrice),
    })
  }

  return _data;

}


const fillVanillaPut = (S, K, T, r, sigma, direction) => {
  const _data = [];

  const dir = (direction == 'long' ? 1 : -1);

  const N = 100;
  const width = 2 * K;

  const optionPrice = BSvanillaCall({S, K, T, r, sigma});
  const pivot = Math.round(K / width * N);

  for (let i = 0; i < pivot; i++) {
    var S = ((i / N) * width);
    _data.push({
      x: Math.round(S),
      y: dir*(K - S - optionPrice),
    })
  }

  for (let i = pivot; i < N; i++) {
    var S = ((i / N) * width);
    _data.push({
      x: Math.round(S),
      y:  - dir * optionPrice,
    })
  }

  return _data;

}

const fillCurvedCall = (S, K, T, r, sigma, direction, TV0) => {
  const _data = [];

  const N = 100;
  const width = 3 * K;

  const dir = (direction == 'long' ? 1 : -1);

  const x0 = TV0 / 2;

  const optionPrice = BScurvedCall({x0, S, K, T, r, sigma});
  const pivot = Math.round(K / width * N);


  for (let i = 0; i < pivot; i++) {
    var S = ((i / N) * width);
    _data.push({
      x: Math.round(S),
      y: -dir*optionPrice,
    })
  }

  for (let i = pivot; i < N; i++) {
    var S = ((i / N) * width);
    _data.push({
      x: Math.round(S),
      y: dir*((TV0/Math.sqrt(K))*(Math.sqrt(S) - Math.sqrt(K)) - optionPrice),
    })
  }

  return _data;

}

const fillCurvedPut = (S, K, T, r, sigma, direction, TV0) => {
  const _data = [];

  const N = 50;
  const width = 3 * K;

  const dir = (direction == 'long' ? 1 : -1);

  const x0 = TV0 / 2;

  const optionPrice = BScurvedPut({x0, S, K, T, r, sigma});
  const pivot = Math.round(K / width * N);


  for (let i = 0; i < pivot; i++) {
    var S = ((i / N) * width);
    _data.push({
      x: Math.round(S),
      y: dir*(TV0-(TV0/Math.sqrt(K))*(Math.sqrt(S)) - optionPrice),
    })
  }

  for (let i = pivot; i < N; i++) {
    var S = ((i / N) * width);
    _data.push({
      x: Math.round(S),
      y: dir*(-optionPrice),
    })
  }

  return _data;

}



const title = 'The payoff of chosen option'

export default function ProfitChart(
  {params, OptionType, OptionDirection}
) {

  var {S, K, T, r, sigma} = params;

  var TV0 = parseInt(params.TV0) || 1000; 

  var x0 = TV0 / 2;



  var data = [];


  console.log(T)

  if (OptionType.value === "vanillaCall")
    data = fillVanillaCall(S, K, T, r, sigma, OptionDirection.value);
  else if (OptionType.value === "vanillaPut")
    data = fillVanillaPut(S, K, T, r, sigma, OptionDirection.value);
  else if (OptionType.value === "curvedCall")
    data = fillCurvedCall(S, K, T, r, sigma, OptionDirection.value, x0);
  else if (OptionType.value === "curvedPut")
      data = fillCurvedPut(S, K, T, r, sigma, OptionDirection.value, x0);



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
          // position: { x: center },
        },
        x: {
          grid: {
            display: false,
          },
          title: {
            display: true,
            text: 'Spot price at expiry, $',
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
  }, [OptionType, OptionDirection, data])

  return (
    <div className="border rounded-lg shadow-md mt-1 w-80 lg:w-96">
      <h5 className=" my-1 text-center font-sans text-base">{title}</h5>
      <hr className="my-2"/>
      <canvas id="profit-chart"/>

    </div>
  )
}

