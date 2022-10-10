/* eslint-disable react/prop-types */
import cx from 'classnames'
import type { FC, PropsWithChildren } from 'react'
import { useMemo, memo } from 'react'

import { Route, RouteSkeleton } from './Route'
import type { TRangingRoute, TRoutesProps } from './types'

import EthLogo from 'public/images/tokens/eth.svg'
import { Icon } from '@/components/kit'
import { useRoutes } from '@/hooks/useRoutes/useRoutes'
import styles from '../../Demo.module.scss'
import { CURRENCY_CRYPTO, formatValue } from '@/format-crypto/format'
import { fromDecimal } from './utils'
import {
  Pairs,
  ValueToProtect,
  Period,
  Leverage,
} from 'src/views/App/ImpermanentLoss/Inputs/index'
import MinimalLiquidity from 'src/views/App/ImpermanentLoss/MinimalLiquidity'
import Tutorial from 'src/views/App/ImpermanentLoss/ForTests'

const ROUTES_ACTIVE_BY_DEFAULT = 3

const Routes: FC<PropsWithChildren<TRoutesProps>> = memo(({ className }) => {
  const routes: TRangingRoute[] = useRoutes()

  const isSkeletonsVisible = routes.length < 5

  const countOfSkeletons = Math.max(11 - routes.length, 1)
  const skeletonArray = useMemo(() => new Array(countOfSkeletons).fill(null), [
    countOfSkeletons,
  ])

  const toAmount = routes.length
    ? formatValue(
        CURRENCY_CRYPTO,
        fromDecimal(
          routes[0].toTokenAmount,
          routes[0].calculatedSteps[routes[0].calculatedSteps.length - 1]
            .toToken.decimals,
        ),
      )
    : 1

  return (
    <section className={cx(className, 'bg-[#141822]/70')}>
      <header className=" mt-2 mb-4 px-2  md:gap-6">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <span className="font-semibold text-[17px] text-[#726DA6]">
              Uniswap IL protection:{' '}
            </span>
            <span className="text-[18px]">V2</span>
          </div>
          <div className="flex flex-col -space-y-1 text-[12px] text-[#726DA6] font-semibold ">
            <span>advanced</span>
            <span>settings</span>
          </div>
        </div>
        {/* <Tutorial/> */}
        {/* <div className="flex">
          <EthLogo className="mr-[10px] h-10 w-10" />
          <div className="flex flex-col">
            <p className="font-semibold text-[18px] tracking-tight">1</p>
            <span className="text-xs text-white/40">on Ethereum</span>
          </div>
        </div>
        <Icon icon="arrowRight" className="text-gray-500" width={24} height={24} />
        <div className="flex">
          <EthLogo className="mr-[10px] h-10 w-10" />
          <div className="flex flex-col">
            <p className="font-semibold text-[18px] tracking-tight">{toAmount}</p>
            <span className="text-xs text-white/40">on Arbitrum</span>
          </div>
        </div> */}
      </header>
      <div className={styles.content}>
        <div className="grid grid-cols-5 gap-2 mb-4 px-1">
          <Pairs />
          <ValueToProtect />
          <Period />
          <Leverage />
          <MinimalLiquidity />
        </div>
        <div className="flex justify-between px-2">
          <span className="font-semibold text-[#726DA6]">
            Historical average accuracy
          </span>
          <span className="font-semibold px-2">93%</span>
        </div>
        <button className="my-7 py-4 rounded-xl mx-auto hover:bg-[#883FFF] duration-300 bg-[#4B1A9C]  w-full px-10 font-semibold text-[18px]">
          Hedge Impermanent Loss
        </button>
        {/* {routes.map((route, routeIndex) => (
          <Route
            index={routeIndex + 1}
            key={route.routeId}
            route={route}
            expanded={routeIndex < ROUTES_ACTIVE_BY_DEFAULT}
            showGas={true}
          />
        ))} */}
        {/* {isSkeletonsVisible &&
          skeletonArray.map((_, index) => (
            <RouteSkeleton
              key={index}
              active={routes.length + index < ROUTES_ACTIVE_BY_DEFAULT}
            />
          ))} */}
      </div>
    </section>
  )
})

Routes.displayName = 'Routes'

export { Routes }
