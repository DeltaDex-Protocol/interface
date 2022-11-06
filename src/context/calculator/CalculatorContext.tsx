import React from 'react'
import { CalculatorReducer, FormActionType } from './CalculatorReducer'

export interface Token {
  id: string
  name: string
  symbol: string
  volumeUSD: string
  logoURI: string
  decimals: string
}

export type CalculatorForm = {
  token1: string // Token
  token2: string // Token
  pool: string // e.g '0.05'
  deposit_amount: string
  period: string
  optionType: 'Long put' | 'Long call' // 'Short put' | 'Short call'
  minimal_price: string
  maximal_price: string
  strike: string
  contracts_amount: string
}

export const CalculatorFormInitialState: CalculatorForm = {
  token1: 'WETH', // Token
  token2: 'USDC', // Token
  pool: '0.3',
  deposit_amount: '0',
  period: '30 Days',
  optionType: 'Long put',
  minimal_price: '1000',
  maximal_price: '2000',
  strike: '1500',
  contracts_amount: '1',
}

interface FormContextProviderProps {
  children: React.ReactNode
}

const CalculatorContext = React.createContext<
  | {
      formData: CalculatorForm
      dispatch: (action: FormActionType) => void
    }
  | undefined
>(undefined)

export const CalculatorFormContextProvider = ({
  children,
}: FormContextProviderProps) => {
  const [formData, dispatch] = React.useReducer(
    CalculatorReducer,
    CalculatorFormInitialState,
  )
  const value = { formData, dispatch }

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  )
}

export const useCalculatorFormContext = () => {
  const context = React.useContext(CalculatorContext)
  if (context === undefined)
    throw new Error(
      'useCalculatorFormContext must be used within a CalculatorFormContextProvider',
    )
  return context
}
