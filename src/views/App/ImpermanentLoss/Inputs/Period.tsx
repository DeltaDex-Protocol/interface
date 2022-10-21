import React from 'react'
import useCollapse from 'react-collapsed'
// import { memo, useEffect, useMemo, useState } from 'react'
// import { Icon } from '@/components/kit'
import cx from 'classnames'
import DropDown from 'src/views/App/ImpermanentLoss/DropDown'
import { useFormContext } from '@/context/form/formContext'
import { FormActionTypes } from '@/context/form/formReducer'

function Period({ className }) {
  //   const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
  // const { expiresIn } = useContext(FormContext).form
  const { expiresIn } = useFormContext().formData
  const periods = [
    expiresIn,
    ...['7 Days', '14 Days', '21 Days', '28 Days', '35 Days', '42 Days'],
  ]

  return (
    <div
      className={cx(
        className,
        'col-span-2 relative h-500 rounded-md py-3 px-5',
      )}
    >
      <div className=" flex flex-col gap-2">
        <span className="font-semibold text-[12px] text-[#726DA6]">
          Protected period
        </span>
        <DropDown
          name="expiresIn"
          array={periods}
          ActionType={FormActionTypes.UPDATE_BASE_SETTINGS}
        />

        {/* <div className="">
          <header className="flex justify-end">
            <button
              {...getToggleProps()}
              className="font-normal flex text-[18px] pl-2 pr-1 rounded-md my-auto hover:bg-[#ffffff14]/10"
            >
              <span>7 Days</span>
              <Icon
                className={cx('text-[#726DA6]', '')}
                icon="arrowDown"
                width={19}
                height={19}
              />
            </button>
          </header>

          <main {...getCollapseProps()}>
            <button className="font-normal text-[18px]  pl-1 pr-4 rounded-md my-auto  hover:bg-[#ffffff14]/10">
              14 days
            </button>
          </main>
        </div> */}
        {/* <span className="text-[12px] text-[#726DA6]">
                Balance: 542 USDC
              </span> */}
      </div>
    </div>
  )
}

export { Period }
