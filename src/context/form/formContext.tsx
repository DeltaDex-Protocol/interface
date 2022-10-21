import React from 'react'
import { formReducer, FormActionType } from './formReducer'

export interface Token {
  id: string
  name: string
  symbol: string
  volumeUSD: string
  logoURI: string
  decimals: string
}

export type OptionType1 = 'curved' | 'vanilla'
export type OptionType2 = 'call' | 'put'

export enum ModelNames {
  BLACK_SCHOLES = 'Black-Scholes',
  JUMP_DIFFUSION = 'Jump Diffusion',
}

export type ModelParams =
  | { type: ModelNames.BLACK_SCHOLES; volatility: string }
  | {
      type: ModelNames.JUMP_DIFFUSION
      volatility: string
      jumpSizeMean: string
      jumpDeviation: string
      jumpIntensity: string
    }

export interface FormContextState {
  token1: string // Token
  token2: string // Token
  type: OptionType1
  valueToProtect: string
  expiresIn: string
  leverage: string
  providedLiquidity: string
  advancedSettings: {
    feesToSplit: string
    hedgesPerDay: string
    optionType: OptionType2
    modelParams: ModelParams
  }
}

export const initialState: FormContextState = {
  token1: 'WETH',
  token2: 'USDC',
  type: 'curved',
  valueToProtect: '0',
  expiresIn: '7 Days',
  leverage: 'x1',
  providedLiquidity: '560',
  advancedSettings: {
    feesToSplit: '0.5',
    hedgesPerDay: '4',
    optionType: 'put',
    modelParams: {
      type: ModelNames.BLACK_SCHOLES,
      volatility: '0.7',
    },
  },
}

interface FormContextProviderProps {
  children: React.ReactNode
}

const FormContext = React.createContext<
  { formData: FormContextState; dispatch: (action: FormActionType) => void } | undefined
>(undefined)

export const FormContextProvider = ({ children }: FormContextProviderProps) => {
  const [formData, dispatch] = React.useReducer(formReducer, initialState)
  const value = { formData, dispatch }

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export const useFormContext = () => {
  const context = React.useContext(FormContext)
  if (context === undefined)
    throw new Error('useFormContext must be used within a FormContextProvider')
  return context
}
