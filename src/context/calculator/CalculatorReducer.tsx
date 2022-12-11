// import { StateContext } from '@/state'
// import { OptionForm, OptionFormInitialState } from './OptionFormContext'
import { CalculatorForm } from './CalculatorContext'

export enum CalculatorFormActionTypes {
  CHANGE_PAIR = 'CHANGE_PAIR',
  UPDATE_PERIOD = 'UPDATE_PERIOD',
  UPDATE_BASE_SETTINGS = 'UPDATE_BASE_SETTINGS',
}

export type FormActionType = {
  type: CalculatorFormActionTypes
  name: string
  value: any // TODO: change this (previously was 'string'), but take account that 'number' type may appear
}

export const CalculatorReducer = (
  state: CalculatorForm,
  action: FormActionType,
): CalculatorForm => {
  switch (action.type) {
    case CalculatorFormActionTypes.CHANGE_PAIR: {
      let [_token1, _token2]: string[] = action.value.split('-')
      return { ...state, token1: _token1, token2: _token2 }
    }
    case CalculatorFormActionTypes.UPDATE_BASE_SETTINGS: {
      return { ...state, [action.name]: action.value }
    }
    case CalculatorFormActionTypes.UPDATE_PERIOD: {
      return { ...state, period: Number(action.value) }
    }
    default: {
      return state
    }
  }
}
