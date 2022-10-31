import React from 'react'
import {
  LeverageTradingReducer,
  FormActionType,
} from './LeverageTradingReducer'

export interface Token {
  id: string
  name: string
  symbol: string
  volumeUSD: string
  logoURI: string
  decimals: string
}

export type LeverageTradingForm = {
  token1: string // Token
  token2: string // Token
  type: 'Long' | 'Short'
  amount: string
  leverage: string
}

export const LeverageTradingFormInitialState: LeverageTradingForm = {
  token1: 'WETH', // Token
  token2: 'USDC', // Token
  type: 'Long',
  amount: '0',
  leverage: 'x1',
}

interface FormContextProviderProps {
  children: React.ReactNode
}

const LeverageTradingContext = React.createContext<
  | {
      formData: LeverageTradingForm
      dispatch: (action: FormActionType) => void
    }
  | undefined
>(undefined)

export const LeverageTradingFormContextProvider = ({
  children,
}: FormContextProviderProps) => {
  const [formData, dispatch] = React.useReducer(
    LeverageTradingReducer,
    LeverageTradingFormInitialState,
  )
  const value = { formData, dispatch }

  return (
    <LeverageTradingContext.Provider value={value}>
      {children}
    </LeverageTradingContext.Provider>
  )
}

export const useLeverageTradingFormContext = () => {
  const context = React.useContext(LeverageTradingContext)
  if (context === undefined)
    throw new Error(
      'useLeverageTradingContext must be used within a LeverageTradingContextProvider',
    )
  return context
}
