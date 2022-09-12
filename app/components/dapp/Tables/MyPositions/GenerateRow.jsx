import React from 'react'
import { useEffect, useState } from 'react'
import { defineAddresses } from '../../../../configs/mypositions.config'

const TABLE_COLLAPSE = [
  'hedge balance',
  'contract amount',
  'fees per hedge',
  'hedges per day',
  'model',
  'risk-free rate',
]

function RowCollapse({ row }) {
  return (
    <>
      <tr className="bg-gray-100 text-center">
        <th scope="col" className="py-3 px-6">
          <span className="font-normal">hedge balance</span>
          <br />
          <span className="font-normal">{row.fees}</span>
        </th>
        <th scope="col" className="py-3 px-6">
          <span className="font-normal">contract amount</span>
          <br />
          <span className="font-normal">
            {parseFloat(row.amount).toFixed(3)}
          </span>
        </th>
        <th scope="col" colspan="1" className="py-3 px-6 ">
          <span className="font-normal">fees per hedge</span>
          <br />
          <span className="font-normal">
            {parseFloat(row.hedgeFee).toFixed(3)}{' '}
          </span>
        </th>
        <th scope="col" className="py-3 px-6">
          <span className="font-normal">hedges per day</span>
          <br />
          <span className="font-normal">{row.perday} </span>
        </th>
        <th />
        <th />
        <th />
        <th />
        <th />
        <th />
      </tr>
      <tr className=" bg-gray-100 text-center">
        <th scope="col" className="py-3 px-6">
          <span className="font-normal">model</span>
          <br />
          <span className="font-normal">{'jump diffusion'} </span>
        </th>
        <th scope="col" className="py-3 px-6">
          <span className="font-normal">lambda</span>
          <br />
          <span className="font-normal">{parseFloat(row.lam).toFixed(3)}</span>
        </th>
        <th scope="col" className="py-3 px-6">
          <span className="font-normal">m</span>
          <br />
          <span className="font-normal">{parseFloat(row.m).toFixed(3)}</span>
        </th>
        <th scope="col" className="py-3 px-6">
          <span className="font-normal">risk-free rate</span>
          <br />
          <span className="font-normal">{parseFloat(row.r).toFixed(3)}</span>
        </th>
        <th scope="col" className="py-3 px-6">
          <span className="font-normal">sigma</span>
          <br />
          <span className="font-normal">
            {parseFloat(row.sigma).toFixed(3)}
          </span>
        </th>
        <th scope="col" className="py-3 px-6">
          <span className="font-normal">nu</span>
          <br />
          <span className="font-normal">{parseFloat(row.v).toFixed(3)}</span>
        </th>
        <th />
        <th />
        <th />
        <th />
      </tr>
    </>
  )
}

function GenerateRow({ row }) {
  const [isVisible, setVisibility] = useState(false)

  return (
    <>
      <tr
        className="hover:bg-indigo-100 text-center"
        onClick={() => setVisibility(!isVisible)}
        id={row.id}
      >
        <td scope="row" className="py-4 px-6">
          {row.id}
        </td>
        <td className="py-4 px-6 ">
          {defineAddresses[row.token0] + '-' + defineAddresses[row.token1]}
        </td>
        <td scope="row" className="py-4 px-6">
          <span className="font-normal">
            {parseFloat(row.token0_balance).toFixed(3)}
          </span>
        </td>
        <td scope="row" className="py-4 px-6">
          <span className="font-normal">
            {parseFloat(row.token1_balance).toFixed(3)}
          </span>
        </td>
        <td className="py-4 px-6">{row.isCall ? 'call' : 'put'}</td>
        <td className="py-4 px-6">{row.isLong ? 'long' : 'short'}</td>
        <td>{row.strike}</td>
        <td>
          {new Date(parseInt(row.expiry) * 1000)
            .toISOString()
            .slice(0, 10)
            .replace('T', ' ')}
        </td>
        <td>
          {new Date(parseInt(row.lastHedge) * 1000).toISOString().slice(0, 10)}
        </td>
        <td className="py-4 px-6 ">
          <button
            className="text-white rounded-lg bg-violet-500 hover:bg-indigo-400 py-2 px-4"
            onClick={() => setVisibility(!isVisible)}
          >
            Show
          </button>
        </td>
      </tr>
      {isVisible && <RowCollapse row={row} />}
    </>
  )
}

export default GenerateRow
