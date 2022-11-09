import React from 'react'

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
  eventHandler,
}) => {
  return (
    <input
      type="number"
      step={0.1}
    //   defaultValue={value}
      value={value}
      placeholder={String(placeholder)}
      className="font-normal text-white  w-40 text-[18px]"
      onChange={(event) =>
        Validation(event.target.value, min, max)
          ? eventHandler(Number(event.target.value))
          : Number(value)
      }
      style={{
        backgroundColor: 'transparent',
        outline: 'none',
      }}
    />
  )
}

export default Input
