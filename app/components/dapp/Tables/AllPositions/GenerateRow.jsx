import React, { useState, useEffect } from 'react'
import { defineAddresses } from '../../../../configs/mypositions.config'

const GenerateRow = ({ row }) => {
  const [isVisible, setVisibility] = useState(false)
  // console.log(defineAddresses.)

  // const costForHedging = parseFloat(Math.random() * 1.5).toFixed(3);
  const [_costForHedge, _setCostForHedge] = useState(1)

  var current = Date.now()
  // console.log((current - parseInt(row.lastHedge) * 1000) / 1000);

  const perDay = parseInt(row.perday)

  const hedgeFee = parseInt(row.hedgeFee)

  const counter = parseInt(
    (24 * 3600) / perDay - (current - parseInt(row.lastHedge) * 1000) / 1000,
  )

  const [seconds, setSeconds] = useState(counter)
  const [_seconds, _setSeconds] = useState(counter)

  useEffect(() => {
    const interval = setInterval(() => {
      _setCostForHedge(parseFloat(Math.random() * 1.5).toFixed(3))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const secondsToDhms = (seconds) => {
    var d = Math.floor(seconds / (3600 * 24))
    var h = Math.floor((seconds % (3600 * 24)) / 3600)
    var m = Math.floor((seconds % 3600) / 60)
    var s = Math.floor(seconds % 60)

    var dDisplay = d > 0 ? d + (d == 1 ? ' d ' : ' d ') : ''
    var hDisplay = h > 0 ? h + (h == 1 ? ' h ' : ' h ') : ''
    var mDisplay = m > 0 ? m + (m == 1 ? ' m ' : ' m ') : ''
    var sDisplay = s > 0 ? s + (s == 1 ? ' s' : ' s') : ''
    return dDisplay + hDisplay + mDisplay + sDisplay
  }

  return (
    <>
      <tr
        className="hover:bg-indigo-100 text-center"
        id={row.id}
        onClick={() => setVisibility(!isVisible)}
      >
        <th scope="row" className="py-4 px-6  whitespace-nowrap justify-center">
          {row.id}
        </th>
        <td className="py-4 px-6">
          {defineAddresses[row.token0] + '-' + defineAddresses[row.token1]}
        </td>
        <th scope="row" className="py-4 px-6  whitespace-nowrap justify-center">
          {_costForHedge + ' $'}
        </th>
        <th scope="row" className="py-4 px-6  whitespace-nowrap justify-center">
          {parseFloat(row.hedgeFee).toFixed(3) + ' DAI'}
        </th>

        <td>{seconds > 0 ? secondsToDhms(seconds) : '0 s'}</td>
        <td className="py-4 px-3">
          {seconds > 0 ? (
            <button
              disabled
              className="font-medium text-white rounded-lg bg-indigo-500 disabled:bg-gray-300"
              onClick={() => setVisibility(!isVisible)}
            >
              Hedge
            </button>
          ) : (
            <button
              className="font-medium text-white rounded-lg bg-violet-500 px-2 py-2 disabled:bg-gray-300 hover:bg-indigo-400"
              onClick={() => setVisibility(!isVisible)}
            >
              Hedge
            </button>
          )}
        </td>
      </tr>
    </>
  )
}

export default GenerateRow
