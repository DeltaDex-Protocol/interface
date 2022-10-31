// import { StateContext } from '@/state'
// import { OptionForm, OptionFormInitialState } from './OptionFormContext'
import { LeverageTradingForm } from './LeverageTradingContext'

export enum LeverageFormActionTypes {
  CHANGE_PAIR = 'CHANGE_PAIR',
  UPDATE_BASE_SETTINGS = 'UPDATE_BASE_SETTINGS',
}

export type FormActionType = {
  type: LeverageFormActionTypes
  name: string
  value: string
}

export const LeverageTradingReducer = (
  state: LeverageTradingForm,
  action: FormActionType,
): LeverageTradingForm => {
  switch (action.type) {
    case LeverageFormActionTypes.CHANGE_PAIR: {
      let [_token1, _token2]: string[] = action.value.split('-')
      return { ...state, token1: _token1, token2: _token2 }
    }
    case LeverageFormActionTypes.UPDATE_BASE_SETTINGS: {
      return { ...state, [action.name]: action.value }
    }
    default: {
      return state
    }
  }
}
