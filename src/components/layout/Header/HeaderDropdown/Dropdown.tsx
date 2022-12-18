import React, { useRef, useState, useEffect } from 'react'
import { createRef } from 'react'
import { useDetectOutsideClick } from './useDetectOutsideClick'
import cx from 'classnames'
import gsap from 'gsap'

import { Icon } from '@/components/kit'

import type { Nav } from '@/components/layout/Header/Navbar'

const DOTS_LINKS: Nav[] = [
  {
    id: 1,
    title: 'Docs',
    path: 'https://deltadex-protocol.github.io/deltadex.github.io/',
  },
  { id: 2, title: 'Github', path: 'https://github.com/deltadex-protocol' },
  { id: 3, title: 'Medium', path: 'https://medium.com/@deltadexprotocol/' },
]

const HeaderDropDown = () => {
  // const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false) //useDetectOutsideClick(dropdownRef, false)
  const onClick = () => setIsOpen(!isOpen)

  const menuRef = createRef<HTMLDivElement>()
  const buttonRef = createRef<HTMLDivElement>()

  useEffect(() => {
    const clickHandler = (evt: MouseEvent) => {
      const path = evt.composedPath()
      if (
        !path.includes(buttonRef.current!) &&
        !path.includes(menuRef.current!)
      ) {
        gsap.from(menuRef.current!, { opacity: 1 })
        gsap.to(menuRef.current!, {
          opacity: 0,
          onComplete: () => {
            setIsOpen(false)
          },
        })
      }
    }
    if (isOpen) {
      gsap.from(menuRef.current!, { opacity: 0, duration: 0.1 })
      gsap.to(menuRef.current!, { opacity: 1, duration: 0.1 })
      window.addEventListener('click', clickHandler)
    } else {
      window.removeEventListener('click', clickHandler)
    }

    return () => window.removeEventListener('click', clickHandler)
  }, [isOpen])

  return (
    <div className="text-black text-lg" ref={buttonRef}>
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
          ref={menuRef}
          className={cx(
            isOpen ? 'visible' : 'invisible',
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
