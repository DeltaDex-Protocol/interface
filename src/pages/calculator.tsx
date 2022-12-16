import React from 'react'
import { Section } from '@/components/layout'
import Calculator from '@/views/App/Calculator'

import { CalculatorFormContextProvider } from '@/context/calculator/CalculatorContext'

const calculator = () => {
  return (
    <Section>
      <CalculatorFormContextProvider>
        {/* <div className="h-5"></div> */}
        <Calculator />
      </CalculatorFormContextProvider>
    </Section>
  )
}

export default calculator
