import React from 'react'
import { CalculatorReducer, FormActionType } from './CalculatorReducer'
import BSvanillaPut from '@/privateUtils/BSvanillaPut'

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
  currentPrice: number
  feeTier: '3000' | '1000' | '500'
  poolAddress: string
  depositAmount: number
  period: number
  optionType: 'Long put' | 'Long call' // 'Short put' | 'Short call'
  minimalPrice: number
  maximalPrice: number
  strike: number
  contractsAmount: number
}

export const CalculatorFormInitialState: CalculatorForm = {
  token1: 'WETH', // Token
  token2: 'USDC', // Token
  currentPrice: 0,
  feeTier: '3000',
  poolAddress: '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8',
  depositAmount: 1000,
  period: 7,
  optionType: 'Long put',
  minimalPrice: 1000,
  maximalPrice: 2000,
  strike: 1500,
  contractsAmount: 1.256,
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
