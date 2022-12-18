import React, { useRef, useState } from 'react'
import { useDetectOutsideClick } from './useDetectOutsideClick'
import cx from 'classnames'

import { Icon } from '@/components/kit'

const NewDropDown = ({
  name,
  array,
  ActionType,
  dispatch,
  className = 'text-[15px]',
}) => {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const onClick = () => setIsActive(!isActive)

  return (
    <div className={cx(className, 'text-white')}>
      <div className="relative ">
        <button
          onClick={onClick}
          className="border-[1px] hover:bg-[#fff] hover:bg-opacity-10 rounded-xl bg-opacity-50 hover:bg-opacity-70 px-2 py-[0.2em] rounded-xl"
        >
          {/* <Icon className="" icon="threedots" width={19} height={19} /> */}
          <div className="flex space-x-2 ">
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
            className="text-white max-h-36 rounded-b-lg max-w-10 flex flex-col"
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
                      ' px-4 py-1 bg-[#0A0F26]/100 hover:bg-[#726DA6]',
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
