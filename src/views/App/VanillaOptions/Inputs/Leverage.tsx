import React from 'react'
import cx from 'classnames'

import { NewDropDown } from './NewDropDown'

import { useOptionFormContext } from '@/context/form/OptionFormContext'
import { OptionFormActionTypes } from '@/context/form/OptionFormReducer'

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

function Leverage({ className }) {
  const { formData, dispatch } = useOptionFormContext()
  const leverages = [formData.leverage, ...['x1']]

  return (
    <div
      className={cx(
        className,
        'col-span-3 relative h-100 rounded-md py-3 px-5',
      )}
    >
      <div className=" flex flex-col gap-2">
        <span className="font-semibold text-[12px] text-[#726DA6] flex space-x-1 md:space-x-2">
          <span className="my-auto">Leverage</span>
          {
            // @ts-ignore
            <Tooltip content={VANILLA_OPTIONS_TOOLTIPS.LEVERAGE} />
          }{' '}
        </span>
        <div className="flex gap-4">
          <span className="font-normal text-[14px] md:text-[19px] my-auto">
            <NewDropDown
              name="leverage"
              ActionType={OptionFormActionTypes.UPDATE_BASE_SETTINGS}
              array={leverages}
              dispatch={dispatch}
            />
          </span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export { Leverage }
