import React from 'react'
import { useState, useEffect, useReducer } from 'react'
import {
  VanillaTypes,
  OptionDirections,
  TokenOptions,
  AddressToToken,
  defineAddresses,
} from '../../../configs/mypositions.config'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage'

const initialValues = {
  addressToken1: TokenOptions[0],
  addressToken2: TokenOptions[1],
  token1Balance: '',
  token2Balance: '',
  fees: '',
  perDay: '',
  OptionAmount: '',
  strike: '',
  expiration: '',
  OptionDirection: OptionDirections[0],
  VanillaType: VanillaTypes[0],
  totalValueInvestedInLP: '',
  chosenModel: '',
  riskFree: '',
}

const ReplicationForm = () => {
  const [step, setStep] = useState(1)
  const [submit, setSubmit] = useState(false)

  const toSecondStep = () => setStep(2)
  const toFirstStep = () => setStep(1)

  const [formValues, setFormValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }),
    initialValues,
  )

  //   const handleFormChange = (event) => {
  //     const { name, value } = event.target
  //     console.log(event.target)
  //     setFormValues({ [name]: value })
  //   }

  const handleFormChange = (name, value) => {
    setFormValues({ [name]: value })
    console.log([name], value)
    console.log(formValues)
  }

  switch (step) {
    case 1:
      return (
        <FirstPage
          formValues={formValues}
          handleFormChange={handleFormChange}
          toSecondStep={toSecondStep}
        />
      )
    case 2:
      return (
        <SecondPage
          formValues={formValues}
          handleFormChange={handleFormChange}
          toFirstStep={toFirstStep}
        />
      )
  }
}

export default ReplicationForm
