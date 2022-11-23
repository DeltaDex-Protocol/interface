import React from 'react'
import useCollapse from 'react-collapsed'
// import { memo, useEffect, useMemo, useState } from 'react'
// import { Icon } from '@/components/kit'
import cx from 'classnames'
import DropDown from '@/components/kit/Form/components/DropDown'
import { useOptionFormContext } from '@/context/form/OptionFormContext'
import { OptionFormActionTypes } from '@/context/form/OptionFormReducer'

function Period({ className }) {
  //   const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
  // const { expiresIn } = useContext(FormContext).form
  const { formData, dispatch } = useOptionFormContext()
  const periods = [
    formData.expiresIn,
    ...['7 days', '14 days', '21 days', '28 days', '35 days', '42 days'],
  ]

  return (
    <div
      className={cx(
        className,
        'col-span-3 relative h-500 rounded-md py-3 px-5',
      )}
    >
      <div className=" flex flex-col gap-2">
        <span className="font-semibold text-[12px] text-[#726DA6]">
          Expires in
        </span>
        <span className="font-normal text-[12px] md:text-[19px] my-auto">
        <DropDown
          name="expiresIn"
          array={periods}
          ActionType={OptionFormActionTypes.UPDATE_BASE_SETTINGS}
          dispatch={dispatch}
        />
        </span>

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
