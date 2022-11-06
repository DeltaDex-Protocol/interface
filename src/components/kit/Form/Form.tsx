import React from 'react'
import styles from './Form.module.scss'
import cx from 'classnames'
import Header from './components/Header'

const Form = ({ header, children, className = '' }) => {
  return (
    <div className={cx(className, styles.form, 'bg-[#fff]/5')}>
      <Header content={header} />
      {children}
    </div>
  )
}

export { Form }
