import { StateContext } from '@/state'
import { FormContextState, initialState } from './formContext'

export enum FormActionTypes {
  CHANGE_PAIR = 'CHANGE_PAIR',
  UPDATE_BASE_SETTINGS = 'UPDATE_BASE_SETTINGS',
  UPDATE_MODEL = 'UPDATE_MODEL',
  UPDATE_ADVANCED_SETTINGS = 'UPDATE_ADVANCED_SETTINGS',
  //   [K in keyof FormContextState] = K
}
// export type FormActionTypes = keyof FormContextState

// enum FormActionTypes {
//     [test]
// }

// type test = {
//     [K in keyof FormContextState]: K
// }

// export type FormAction = {
//   action: FormActionType
//   payload: FormContextState
// }

export type FormActionType = {
  type: FormActionTypes
  name: string
  value: string
}

export const formReducer = (
  state: FormContextState,
  action: FormActionType,
): FormContextState => {
  switch (action.type) {
    case FormActionTypes.CHANGE_PAIR: {
      let [_token1, _token2]: string[] = action.value.split('-')
      return { ...state, token1: _token1, token2: _token2 }
    }
    case FormActionTypes.UPDATE_BASE_SETTINGS: {
      return { ...state, [action.name]: action.value }
    }
    case FormActionTypes.UPDATE_ADVANCED_SETTINGS: {
      return {
        ...state,
        advancedSettings: {
          ...state.advancedSettings,
          [action.name]: action.value,
        },
      }
    }
    case FormActionTypes.UPDATE_MODEL: {
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
