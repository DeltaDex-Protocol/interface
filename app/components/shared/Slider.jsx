import { useState } from 'react'
import ReactSlider from 'react-slider'
import { sliderInfos } from '../../configs/slider.config'

export default function Slider({ sliderType, onChange, name }) {
  const [value, setValue] = useState(sliderInfos[sliderType].min)
  const title = sliderInfos[sliderType].title
  const sym = sliderInfos[sliderType].symbol
  const min = sliderInfos[sliderType].min
  const max = sliderInfos[sliderType].max
  const step = sliderInfos[sliderType].step

  return (
    <div className=''>
      <div className='w-20 md:w-40 text-sm md:text-base'>
      <span className=''>{title + ': ' + value + sym}</span>
      </div>
      <ReactSlider
        step={step}
        min={min}
        max={max}
        className={`h-3 mpr-2 bg-gray-200 mt-2 rounded-md cursor-grab w-20 md:w-40`}
        thumbClassName=" w-5 h-5 cursor-grab bg-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 -top-2px"
        value={value}
        name={name}
        onChange={(value) => {
          setValue(value)
          onChange(value, {name})
        }}
      />
    </div>
  )
}
