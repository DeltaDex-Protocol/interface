import React from 'react'
import { useState, useEffect } from 'react'
import {
  KEYS_POSITIONS_SAMPLE,
  MY_POSITIONS_SAMPLE,
} from '../../../../data/mypositions.data'
import GenerateRow from './GenerateRow'
import ReactLoading from 'react-loading'

const TABLE = [
  'Last hedge',
  'Expiry',
  'Strike',
  'Direction',
  'Option type',
  'Token 2 balance',
  'Token 1 balance',
  'Position id',
  'Option pair',
  'Details',
]

// const _TABLE = {
//   lastHedge: 'Last hedge',
//   expiry: 'Expiry',
//   strike: 'Strike',
//   isLong: 'Direction',
//   isCall: 'Option type',
//   token1_balance: 'Token 2 balance',
//   token0_balance: 'Token 1 balance',
//   id: 'Position id',
//   // 'Option pair',
//   // 'Details',
// }

function Table() {
  const [rowData, setRowData] = useState(MY_POSITIONS_SAMPLE)
  const [isLoading, setLoading] = useState(true)

  const checkLoading = (data) => {
    if (data === undefined || data === null) return true
    if (data.length === 0) return true
    return false
  }

  useEffect(() => {
    setLoading(() => checkLoading(rowData))
  })

  return (
    <>
      <div className="rounded-xl overflow-x-auto">
        <table className="text-sm shadow-lg max-w-xl bg-white rounded-xl ">
          <thead className="text-xs text-white uppercase bg-indigo-400 text-center">
            <tr className="rounded">
              {TABLE.map((el, index) => (
                <th scope="col" className="px-4 py-4" key={index}>
                  {el}
                </th>
              ))}
            </tr>
          </thead>
          {!isLoading && (
            <tbody>
              {rowData.map((el, index) => (
                <GenerateRow row={el} key={index} />
              ))}
            </tbody>
          )}
        </table>
      </div>
      {isLoading && (
        <ReactLoading
          type={'spin'}
          color="#fff"
          width={70}
          className="mx-auto my-10"
        />
      )}
    </>
  )
}

export default Table
