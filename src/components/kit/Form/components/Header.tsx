import React from 'react'
import cx from 'classnames'

const Header = ({ content, className = '' }) => {
  return (
    <header className={cx(className, 'mt-2 mb-4 px-2  md:gap-6 ')}>
      <div className="flex justify-between">
        {content.map((el, key) => (
          <span className="font-normal text-[17px] text-[#fff]" key={key}>
            {el}
          </span>
        ))}
      </div>
    </header>
  )
}

export default Header
