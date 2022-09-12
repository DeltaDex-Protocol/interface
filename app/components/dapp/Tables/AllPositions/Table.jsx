import React, { useState, useEffect } from 'react'
import GenerateRow from './GenerateRow'
import { ALL_POSITIONS_SAMPLE } from '../../../../data/allpositions.data'

function Table() {
  const [rowData, setRowData] = useState(ALL_POSITIONS_SAMPLE)
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
    <div className="overflow-x-auto relative sm:rounded-lg shadow-lg mb-8">
      <table className="text-sm shadow-lg bg-white">
        <thead
          className={`text-xs text-white uppercase bg-indigo-400 text-center`}
        >
          <tr>
            <th scope="col" className="py-3 px-6">
              Position id
            </th>
            <th scope="col" className="py-3 px-6">
              Option pair
            </th>
            <th scope="col" className="py-3 px-6">
              Estimated tx cost for hedging
            </th>
            <th scope="col" className="py-3 px-6">
              Reward for hedging
            </th>

            <th scope="col" className="py-3 px-6">
              Time left until next hedging
            </th>
            <th />
          </tr>
        </thead>
        {rowData !== undefined && (
          <tbody>
            {rowData.map((el, index) => (
              <GenerateRow row={el} key={index}/>
            ))}
          </tbody>
        )}
        </table>
        {console.log(rowData)}
    </div>
    {rowData.length == 0 && (<ReactLoading type={'spin'} color="#fff" width={70} className="mx-auto my-10"/>)}

    </>
  );

}

export default Table
