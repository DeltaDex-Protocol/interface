import React from 'react'
import cx from 'classnames'

const Validation = (value, min, max) => {
  value = Number(value)
  if (value >= min && value <= max) return true
  return false
}

const Input = ({
  value,
  min = 0,
  placeholder = 100,
  max = 10000,
  step = 0.1,
  eventHandler,
  width = 40,
}) => {
  return (
    <input
      type="number"
      step={step}
      //   defaultValue={value}
      value={value}
      // min={0}
      max={max}
      placeholder={String(placeholder)}
      className={cx('font-normal text-white text-[18px]', `w-${width}`)}
      onChange={(event) => {
        console.log(event.target.value, min, max)
        Validation(event.target.value, min, max)
          ? eventHandler(Number(event.target.value))
          : Number(value)
      }}
      style={{
        backgroundColor: 'transparent',
        outline: 'none',
      }}
    />
  )
}

export default Input
