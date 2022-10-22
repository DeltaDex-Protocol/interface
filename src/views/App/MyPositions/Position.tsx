import React from 'react'
import { memo, useEffect, useMemo, useState } from 'react'
import useCollapse from 'react-collapsed'
import { Icon } from '@/components/kit'
import cx from 'classnames'
import Chart from './Chart/Chart'

function Position({ data }) {
  const [isExpanded, setExpanded] = useState(false)
  const { getToggleProps, getCollapseProps } = useCollapse({ isExpanded })

  const {
    type,
    pairAddress,
    currentBalances,
    currentPnL,
    performance,
    expand,
  } = data

  const { onClick: onClickCollapse } = useMemo(
    () =>
      getToggleProps({
        onClick: (e) => {
          // Stop event bubbling
          e.preventDefault()
          e.stopPropagation()

          setExpanded((currentStatus) => !currentStatus)
        },
      }),
    [getToggleProps, setExpanded],
  )
  // @ts-expect-error ref undefined
  const { style: collapseStyles, onTransitionEnd, ref } = useMemo(
    () => getCollapseProps(),
    [getCollapseProps],
  )

  return (
    <section
      aria-hidden="true"
      onClick={onClickCollapse}
      className={cx(
        'rounded-xl py-3 px-2 mb-2 md:p-4 transition-colors',
        'bg-[#1112150a] dark:bg-[#ffffff0a] hover:bg-[#11121514] dark:hover:bg-[#ffffff14] active:bg-[#11121529] dark:active:bg-[#ffffff29]',
      )}
    >
      <header className="relative flex ">
        <div className="grid grid-cols-6 gap-6 py-3 w-full text-center">
          <div>{type}</div>
          <div>{pairAddress}</div>
          <div className="text-[14px]">{currentBalances.join(', ')}</div>
          <div className="text-[#77DC89]">{currentPnL}</div>
          <div>{performance}</div>
          <button
            type="button"
            className="mx-auto parent flex h-6 w-6 items-center rounded-md transition-colors hover:bg-[#11121514] active:bg-coal-160 dark:hover:bg-[#ffffff14] dark:active:bg-white-160"
            onClick={onClickCollapse}
            data-testid="button-show-route-details"
          >
            <div className="absolute -inset-y-3 -right-2 w-22 md:-inset-y-4 md:-right-4" />
            <div className="flex h-full w-full items-center justify-center">
              <Icon
                className={cx(
                  'text-[#111215cc] dark:text-[#ffffff66]',
                  isExpanded && 'rotate-90',
                )}
                icon="MyArrow"
                width={14}
                height={22}
              />
            </div>
          </button>
        </div>
      </header>
      <main {...{ style: collapseStyles, onTransitionEnd }} ref={ref}>
        <div className="grid grid-cols-9">
          <div className="col-span-4">
            <Chart />
          </div>
          <div className="col-span-1 "></div>
          <div className="pt-8 flex flex-col col-span-2 gap-1 text-[#726DA6] text-[15px]">
            {expand &&
              Object.keys(expand).map((el, index) => {
                return <div>{el}</div>
              })}
          </div>
          <div className="pt-8 flex flex-col col-span-2 gap-1 text-[15px]">
            {expand &&
              Object.keys(expand).map((el, index) => {
                return <div>{expand[el]}</div>
              })}
          </div>
        </div>
      </main>
    </section>
  )
}

export default Position
