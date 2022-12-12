import React, { useEffect, useState } from 'react'
import styles from './MyPositions.module.scss'
import cx from 'classnames'
// import { Routes } from '@/views/IndexPage/Demo/components/Routes'
import Position from './Position'
import UserPositions from '@/api/userPositions'

import { PositionsInfoType } from '@/api/positions.types'
import { UserPositionsType } from '@/api/userPositions'

import { Skeleton } from '@/components/kit'

import {
  MY_POSITIONS_TOOLTIPS,
  VANILLA_OPTIONS_TOOLTIPS,
} from '../../../shared/tooltipsData'
import type { PropsWithChildren } from 'react'
import type { TTooltipProps } from '@/components/kit'
import dynamic from 'next/dynamic'

import { SAMPLE_MY_POSITIONS } from '@/data/sample-data'

const Tooltip = dynamic<PropsWithChildren<TTooltipProps>>(
  () => import('@/components/kit/Tooltip/Tooltip').then((mod) => mod.Tooltip),
  {
    ssr: false,
  },
)

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
  const [isTestData, setTestData] = useState<boolean>(false)

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

  useEffect(() => {
    setData(isTestData ? SAMPLE_MY_POSITIONS : undefined)
  }, [isTestData])

  return (
    <div>
      <div className="pb-6 text-2xl flex justify-between">
        <span>My positions </span>
        <button
          className={cx(
            isTestData ? 'bg-[#726DA6]/40' : 'hover:bg-[#726DA6]/40',
            'rounded-xl  px-3 py-1 text-xl',
          )}
          onClick={() => setTestData(!isTestData)}
        >
          {isTestData ? 'Sample data' : 'Not sample data'}
        </button>
      </div>
      <div className={cx(styles.table, 'mx-auto ')}>
        <div className="h-50"></div>
        <div className="grid grid-cols-6 gap-6 pb-4">
          {TITLES.map((el, index) => (
            <div
              className="text-center text-[#726DA6] text-xs md:text-base flex space-x-2 mx-auto"
              key={index}
            >
              <span className="">{el}</span>
              {/* <span> */}
              {MY_POSITIONS_TOOLTIPS[el] && (
                // @ts-ignore
                <Tooltip content={MY_POSITIONS_TOOLTIPS[el]} />
              )}
              {/* </span> */}
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
