import React from 'react'
import { memo, useEffect, useMemo, useState } from 'react'
import useCollapse from 'react-collapsed'
import { Icon } from '@/components/kit'
import cx from 'classnames'
import Chart from '../Chart'
import { putPayoffData, callPayoffData } from '@/utils/optionsPayoff'
import { CALL_REPLICATION, PUT_REPLICATION } from './titles'

import { ClosePosition } from '@/api/form'

function Position({ rowData }) {
  const [isExpanded, setExpanded] = useState(false)
  const { getToggleProps, getCollapseProps } = useCollapse({ isExpanded })
  const [OptionData, setOptionData] = useState<number[][]>([])

  const {
    type,
    pairAddress,
    currentBalances,
    currentPnL,
    performance,
    expand,
  } = rowData

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

  useEffect(() => {
    try {
      if (type === CALL_REPLICATION) {
        callPayoffData({
          currentPrice: expand.Strike,
          strike: expand.Strike,
          expiry: 1,
          riskFree: 0.0,
          volatility: expand['Implied volatility'],
          contractAmount: expand['Contracts amount'],
          optionCost: 0,
        }).then((res) => {
          setOptionData(res)
          // console.log(res)
        })
      } else {
        putPayoffData({
          currentPrice: expand.Strike,
          strike: expand.Strike,
          expiry: 1,
          riskFree: 0.0,
          volatility: expand['Implied volatility'],
          contractAmount: expand['Contracts amount'],
          optionCost: 0,
        }).then((res) => {
          setOptionData(res)
          // console.log(res)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <section
      aria-hidden="true"
      className={cx(
        'rounded-xl py-3 px-2 mb-2 md:p-4 transition-colors',
        'bg-[#1112150a] dark:bg-[#ffffff0a] hover:bg-[#11121514] dark:hover:bg-[#ffffff14] active:bg-[#11121529] dark:active:bg-[#ffffff29]',
      )}
    >
      <header className="relative flex " onClick={onClickCollapse}>
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
            <Chart data={OptionData} />
          </div>
          <div className="col-span-1 "></div>
          <div className="pt-8 flex flex-col col-span-4 gap-1 text-[8px] sm:text-[15px]">
            <div className="grid grid-cols-2 gap-1.5">
              {expand &&
                Object.keys(expand).map((el, index) => {
                  if (el === 'Advanced') {
                    return (
                      <div key={index}>
                        <div className="col-span-1 text-[#726DA6]">{el}</div>
                        <div
                          className="col-span-1 justify-self-end text-[#fff]"
                          onClick={() => {
                            alert(1)
                          }}
                        >
                          <Icon icon="dots" width={30} height={30} />
                        </div>
                      </div>
                    )
                  }
                  return (
                    <>
                      <div className="col-span-1 text-[#726DA6]">{el}</div>
                      <div className="col-span-1 text-right text-[#fff]">
                        {expand[el]}
                      </div>
                    </>
                  )
                })}
              <div className="col-span-1 mt-4">
                <button 
                className="bg-[#959595]/50 rounded-md px-3 py-1.5" 
                onClick={() => {

                  console.log(expand['ID']);
                  let id = expand['ID'];
                  ClosePosition(id).then((res) => {
                    console.log(res);
                  });
                }}
                >
                  <span className="text-[#000]">Close position</span>
                </button>
              </div>
              <div className="col-span-1 justify-self-end mt-4">
                <button className="bg-[#726DA6]/50 rounded-md px-3 py-1.5">
                  Change parameters
                </button>
              </div>
            </div>
          </div>
          {/* <div className="pt-8 flex flex-col col-span-2 gap-1 text-[15px]">
            {expand &&
              Object.keys(expand).map((el, index) => {
                return <div>{expand[el]}</div>
              })}
            <div className="my-10">
              <button className=" bg-[#fff] rounded-md w-full">123</button>
            </div>
          </div> */}
        </div>
      </main>
    </section>
  )
}

export default Position
