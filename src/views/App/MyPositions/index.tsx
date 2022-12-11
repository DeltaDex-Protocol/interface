import React, { useEffect, useState } from 'react'
import styles from './MyPositions.module.scss'
import cx from 'classnames'
// import { Routes } from '@/views/IndexPage/Demo/components/Routes'
import Position from './Position'
import UserPositions from '@/api/userPositions'

import { PositionsInfoType } from '@/api/positions.types'
import { UserPositionsType } from '@/api/userPositions'

import Info from 'public/images/icons/info.svg'
import type { PropsWithChildren } from 'react'
import type { TTooltipProps } from '@/components/kit'
import dynamic from 'next/dynamic'

const TITLES: Array<string> = [
  'Type',
  'Pair address',
  'Current balances',
  'Current PnL',
  'Performance',
  'Details',
]

function MyPositions() {
  const [data, setData] = useState<UserPositionsType[]>()

  useEffect(() => {
    const fetchData = async () => {
      // const res = await getPositionsInfo(0)
      const res = await UserPositions()
      console.log(res)
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
          {TITLES.map((el, index) => (
            <div className="text-center text-[#726DA6]" key={index}>
              {el}
            </div>
          ))}
        </div>
        {data?.map((el, index) => (
          <Position rowData={el.data} id={el.id} key={index} />
        ))}
      </div>
    </div>
  )
}

export default MyPositions
