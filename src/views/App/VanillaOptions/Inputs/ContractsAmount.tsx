import React from 'react'
import { useOptionFormContext } from '@/context/form/OptionFormContext'
import { OptionFormActionTypes } from '@/context/form/OptionFormReducer'
import cx from 'classnames'

import { VANILLA_OPTIONS_TOOLTIPS } from '../../../../shared/tooltipsData'

import type { PropsWithChildren } from 'react'
import type { TTooltipProps } from '@/components/kit'
import dynamic from 'next/dynamic'

const Tooltip = dynamic<PropsWithChildren<TTooltipProps>>(
  () => import('@/components/kit/Tooltip/Tooltip').then((mod) => mod.Tooltip),
  {
    ssr: false,
  },
)

function ContractsAmount({ className }) {
  const { formData, dispatch } = useOptionFormContext()

  const contractsAmount = parseFloat(formData.contractsAmount)

  return (
    <div
      className={cx(
        className,
        'col-span-4 md:col-span-3 relative h-500 rounded-md py-3 px-5 ',
      )}
    >
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-xs md:text-[12px] text-[#726DA6] flex space-x-1 md:space-x-2">
          <span className="my-auto">Contracts amount</span>
          {
            // @ts-ignore
            <Tooltip content={VANILLA_OPTIONS_TOOLTIPS.CONTRACTS_AMOUNT} />
          }{' '}
        </span>
        <div className="md:flex gap-0 ">
          <input
            type="number"
            step="0.1"
            min={'0.1'}
            max={'10'}
            defaultValue={contractsAmount == 0 ? undefined : contractsAmount}
            placeholder="1"
            className="font-normal text-white w-40 text-[14px] md:text-[19px]"
            onChange={(event) =>
              dispatch({
                type: OptionFormActionTypes.UPDATE_BASE_SETTINGS,
                name: 'contractsAmount',
                value: event.target.value,
              })
            }
            style={{ backgroundColor: 'transparent', outline: 'none' }}
          />
          {/* <span className="bg-[#fff]/5 rounded-md px-3 py-0.5 text-center">
            <span className="text-[#A680FF] font-semibold text-[12px] my-auto">
              USDC
            </span>
          </span> */}
        </div>
      </div>
    </div>
  )
}

export { ContractsAmount }
