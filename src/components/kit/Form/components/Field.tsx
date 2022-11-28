import React from 'react'
import cx from 'classnames'

const Field = ({ title = '', children, className = '' }) => {
  return (
    <div
      className={cx(
        className,
        'relative rounded-md py-3 px-5 border-2 ',
        'transition-colors bg-[#0A0F26]/60 hover:bg-[#0A0F26]/90 border-[1px] border-white/10 rounded-xl',
      )}
    >
      <div className={cx('pb-0 flex gap-2 flex-col')}>
        <span className="font-semibold text-[13px] text-[#726DA6]">
          {title}
        </span>
        {children}
      </div>
    </div>
  )
}

export default Field
