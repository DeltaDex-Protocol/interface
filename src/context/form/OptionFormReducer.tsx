// import { StateContext } from '@/state'
import { OptionForm } from './OptionFormContext'

export enum OptionFormActionTypes {
  CHANGE_PAIR = 'CHANGE_PAIR',
  UPDATE_BASE_SETTINGS = 'UPDATE_BASE_SETTINGS',
  UPDATE_MODEL = 'UPDATE_MODEL',
  UPDATE_ADVANCED_SETTINGS = 'UPDATE_ADVANCED_SETTINGS',
}

export type FormActionType = {
  type: OptionFormActionTypes
  name: string
  value: string
}

export const OptionFormReducer = (
  state: OptionForm,
  action: FormActionType,
): OptionForm => {
  switch (action.type) {
    case OptionFormActionTypes.CHANGE_PAIR: {
      let [_token1, _token2]: string[] = action.value.split('-')
      return { ...state, token1: _token1, token2: _token2 }
    }
    case OptionFormActionTypes.UPDATE_BASE_SETTINGS: {
      return { ...state, [action.name]: action.value }
    }
    case OptionFormActionTypes.UPDATE_ADVANCED_SETTINGS: {
      return {
        ...state,
        advancedSettings: {
          ...state.advancedSettings,
          [action.name]: action.value,
        },
      }
    }
    case OptionFormActionTypes.UPDATE_MODEL: {
      return {
        ...state,
        advancedSettings: {
          ...state.advancedSettings,
          modelParams: {
            ...state.advancedSettings.modelParams,
            [action.name]: action.value,
          },
        },
      }
    }
    default: {
      return state
    }
  }
}
