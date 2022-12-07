import React, { useRef, useState } from 'react'
import { useDetectOutsideClick } from './useDetectOutsideClick'
import cx from 'classnames'

import { Icon } from '@/components/kit'

const NewDropDown = ({ name, array, ActionType, dispatch }) => {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const onClick = () => setIsActive(!isActive)

  return (
    <div className="text-white text-[15px]">
      <div className="relative ">
        <button
          onClick={onClick}
          className="border-[1px] border-white/10 rounded-xl bg-opacity-50 hover:bg-opacity-70 px-3 py-2 rounded-xl"
        >
          {/* <Icon className="" icon="threedots" width={19} height={19} /> */}
          <div className="flex space-x-2">
            {array[0]}
            <div className="my-auto">
              <Icon
                className={cx('text-[#726DA6]', '')}
                icon="arrowDown"
                width={19}
                height={19}
              />
            </div>
          </div>
        </button>
        <button
          className={cx('bg-[#726DA6] bg-opacity-50 hover:bg-opacity-70')}
        >
          <span className="text-white flex"></span>
        </button>
        <nav
          ref={dropdownRef}
          className={cx(
            isActive ? 'visible' : 'invisible',
            'absolute rounded-lg  z-10 ',
          )}
        >
          <ul
            className="text-white max-h-36 rounded-b-lg"
            style={{
              backgroundColor: 'rgba(0,0,0,.1)',
              overflow: 'scroll',
            }}
          >
            {array.map((el, index) => {
              if (index > 0)
                return (
                  <button
                    className={cx(
                      index == 1 ? 'rounded-t-lg' : '',
                      'w-full pl-4 pr-2  py-2 bg-[#0A0F26]/100 hover:bg-[#726DA6]',
                      index == array.length - 1 ? 'rounded-b-lg' : '',
                    )}
                    onClick={() =>
                      dispatch({
                        type: ActionType,
                        name: name,
                        value: el,
                      })
                    }
                  >
                    {/* <a target="_blank" href={''} className=""> */}
                    {el}
                    {/* </a> */}
                  </button>
                )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export { NewDropDown }
