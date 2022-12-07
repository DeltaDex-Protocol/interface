import React, { useRef, useState } from 'react'
import { useDetectOutsideClick } from './useDetectOutsideClick'
import cx from 'classnames'

import { Icon } from '@/components/kit'

import type { Nav } from '@/components/layout/Header/Navbar'

const DOTS_LINKS: Nav[] = [
  { id: 1, title: 'Docs', path: 'https://deltadex-protocol.github.io/deltadex.github.io/' },
  { id: 2, title: 'Github', path: 'https://github.com/deltadex-protocol' },
  { id: 3, title: 'Medium', path: 'https://medium.com/@deltadexprotocol/' },
]

const HeaderDropDown = () => {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const onClick = () => setIsActive(!isActive)

  return (
    <div className="text-black text-lg">
      <div className="relative">
        <button
          onClick={onClick}
          className="bg-[#726DA6] bg-opacity-50 hover:bg-opacity-70 px-3 py-2 rounded-xl"
        >
          <Icon className="" icon="threedots" width={19} height={19} />
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
            'absolute rounded-lg top-10 right-0 ',
          )}
        >
          <ul className="text-white">
            {DOTS_LINKS.map((el, index) => {
              return (
                <button
                  className={cx(
                    index == 0 ? 'rounded-t-lg' : '',
                    'p-2 w-full bg-[#726DA6] hover:bg-opacity-70',
                    index == DOTS_LINKS.length - 1 ? 'rounded-b-lg' : '',
                  )}
                  onClick={() => window.open(el.path)}
                >
                  {/* <a target="_blank" href={el.path} className=""> */}
                  {el.title}
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

export { HeaderDropDown }
