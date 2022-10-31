import React from 'react'
import useCollapse from 'react-collapsed'
import { memo, useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import { useLeverageTradingFormContext } from '@/context/form/LeverageTradingContext'
import { LeverageFormActionTypes } from '@/context/form/LeverageTradingReducer'

function Long({ className }) {
  const { formData, dispatch } = useLeverageTradingFormContext()
  const { type } = formData

  return (
    <div
      className={cx(
        className,
        'col-span-2 h-500 rounded-md py-3 px-5',
        type === 'Long' ? 'bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/20' : '',
      )}
      onClick={() =>
        dispatch({
          type: LeverageFormActionTypes.UPDATE_BASE_SETTINGS,
          name: 'type',
          value: 'Long',
        })
      }
    >
      <div className="md:flex gap-0"></div>
      Long
    </div>
  )
}

export { Long }
