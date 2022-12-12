import React, { useEffect, useState } from 'react'
import styles from './MyPositions.module.scss'
import cx from 'classnames'
// import { Routes } from '@/views/IndexPage/Demo/components/Routes'
import Position from './Position'
import UserPositions from '@/api/userPositions'

import { PositionsInfoType } from '@/api/positions.types'
import { UserPositionsType } from '@/api/userPositions'

import { Skeleton } from '@/components/kit'
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
  const [data, setData] = useState<UserPositionsType[] | undefined>([])

  useEffect(() => {
    const fetchData = async () => {
      // const res = await getPositionsInfo(0)
      const res = await UserPositions()
      console.log(res)
      setData(res)
    }
    fetchData().catch((err) => {
      setData(undefined)
      console.log(err)
    })
  }, [])

  return (
    <div>
      <div className="pb-6 text-2xl">My positions</div>
      <div className={cx(styles.table, 'mx-auto ')}>
        <div className="h-50"></div>
        <div className="grid grid-cols-6 gap-6 pb-4">
          {TITLES.map((el, index) => (
            <div
              className="text-center text-[#726DA6] text-xs md:text-base"
              key={index}
            >
              {el}
            </div>
          ))}
          {data?.length === 0 && (
            <>
              <Skeleton className="col-span-6 " w={'100%'} h="70px" />
              <Skeleton className="col-span-6 " w={'100%'} h="70px" />
              <Skeleton className="col-span-6 " w={'100%'} h="70px" />
            </>
          )}
        </div>
        {data?.map((el, index) => (
          <Position rowData={el.data} id={el.id} key={index} />
        ))}
      </div>
      {data === undefined && (
        <div className="text-center text-xl text-[#726DA6] font-normal my-20 ">
          No positions found
        </div>
      )}
    </div>
  )
}

export default MyPositions
