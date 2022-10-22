import React, { useEffect, useState } from 'react'
import styles from './MyPositions.module.scss'
import cx from 'classnames'
// import { Routes } from '@/views/IndexPage/Demo/components/Routes'
import Position from './Position'
import { getPositionsInfo } from '@/api/positions'
import { PositionsInfoType } from '@/api/positions'

const TITLES: Array<string> = [
  'Type',
  'Pair address',
  'Current balances',
  'Current PnL',
  'Performance',
  'Details',
]

function MyPositions() {
  const [data, setData] = useState<PositionsInfoType[]>()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPositionsInfo(0)
      setData(res)
    }
    fetchData()
  }, [])

  return (
    <div>
      <div className="pb-6 text-2xl">My positions</div>
      <div className={cx(styles.table, 'mx-auto ')}>
        <div className="h-50"></div>
        <div className="grid grid-cols-6 gap-6 pb-4">
          {TITLES.map((el) => (
            <div className="text-center text-[#726DA6]">{el}</div>
          ))}
        </div>
        {data?.map((el, index) => (
          <Position rowData={el} key={index} />
        ))}
      </div>
    </div>
  )
}

export default MyPositions
