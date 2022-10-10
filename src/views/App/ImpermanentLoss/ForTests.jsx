import React from 'react'
import useCollapse from 'react-collapsed'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { useState } from 'react'

const contentStyle = { background: '#000' }
const overlayStyle = { background: 'rgba(0,0,0,0.5)' }
const outLine = { outline: 'none', border: '0px' }

const POSITION_TYPES = ['bottom center']

function App() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
  })
  return <FormInput props={form} />
}

function FormInput(props) {
  const { label, type = 'text', name } = props

  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div className="FormInput flex flex-col">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="bg-black"
      />
    </div>
  )
}

export default FormInput
