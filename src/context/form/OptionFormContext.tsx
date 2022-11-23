import React from 'react'
import { OptionFormReducer, FormActionType } from './OptionFormReducer'

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

export type OptionForm = {
  token1: string // Token
  token2: string // Token
  type: OptionType1
  valueToProtect: string
  strike: string
  expiresIn: string
  leverage: string
  contractsAmount: string
  providedLiquidity: string
  uniswapVersion: string
  advancedSettings: {
    feesToSplit: string
    hedgesPerDay: string
    optionType: OptionType2
    modelParams: ModelParams
  }
}

export const OptionFormInitialState: OptionForm = {
  token1: 'WETH',
  token2: 'USDC',
  type: 'vanilla',
  valueToProtect: '0',
  strike: '1500',
  expiresIn: '7 days',
  leverage: 'x1',
  contractsAmount: '1',
  providedLiquidity: '560',
  uniswapVersion: 'V2',
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

const OptionFormContext = React.createContext<
  | { formData: OptionForm; dispatch: (action: FormActionType) => void }
  | undefined
>(undefined)

export const OptionFormContextProvider = ({
  children,
}: FormContextProviderProps) => {
  const [formData, dispatch] = React.useReducer(
    OptionFormReducer,
    OptionFormInitialState,
  )
  const value = { formData, dispatch }

  return (
    <OptionFormContext.Provider value={value}>
      {children}
    </OptionFormContext.Provider>
  )
}

export const useOptionFormContext = () => {
  const context = React.useContext(OptionFormContext)
  if (context === undefined)
    throw new Error(
      'useOptionFormContext must be used within a OptionFormContextProvider',
    )
  return context
}
