import styles from './Range.module.css'
import { BaseSyntheticEvent } from 'react'



export default function Range({
  label,
  placeholder,
  type,
  error,
  description,
  ...rest
}) {
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
    ? `${styles.input}`
    : `${styles.input}`

  const InputJsx = (
    <input
      className={classesForInput}
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
    <div className="bg-gray-100 p-1 rounded-lg border border-gray-100 focus-within:border-gray-500">
      {label ? LabelJsx : ''}
      {InputJsx}
      {error ? ErrorJsx : ''}
      {description ? DescriptionJsx : ''}
    </div>
  )
}

