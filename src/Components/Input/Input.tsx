import RangeEl from './Range'
import DoubleRangeEl from './DoubleRange'
import { BaseSyntheticEvent } from 'react'

type InputProps = {
  label: string,
  placeholder?: any,
  type?: string,
  error?: string,
  description?: string,
  value?: any,
  readOnly?: boolean,
  autoFocus?: boolean,
  tabIndex?: number,
  onChange?: (e: BaseSyntheticEvent<object, any, any>) => void,
}

export default function Input(props: InputProps) {
  const {
    label,
    placeholder,
    type,
    error,
    description,
    ...rest
  } = props
  if (type === 'range') return <RangeEl {...props}/>
  if (type === 'double-range') return <DoubleRangeEl {...props}/>
  const id = `input-${label}`

  const LabelJsx = (
    <label
      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      htmlFor={id}
    >
      {label}
    </label>
  )

  const classesForInput = error
    ? "appearance-none block w-full bg-gray-100 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
    : "appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
  const withDisabled = props.readOnly
    ? classesForInput + " cursor-not-allowed"
    : classesForInput + " focus:bg-white focus:border-gray-500"

  const InputJsx = (
    <input
      className={withDisabled}
      id={id}
      type={type || 'text'}
      placeholder={placeholder || ''}
      {...rest}
    />
  )

  const ErrorJsx = (
    <p className="text-red-500 text-xs italic">
      {error}
    </p>
  )

  const DescriptionJsx = (
    <p className="text-gray-600 text-xs italic">
      {description}
    </p>
  )

  return (
    <>
      {label ? LabelJsx : ''}
      {InputJsx}
      {error ? ErrorJsx : ''}
      {description ? DescriptionJsx : ''}
    </>
  )
}

