import cx from 'classnames'
import DropDown from '@/components/kit/Form/components/DropDown'
import { useOptionFormContext } from '@/context/form/OptionFormContext'
import { OptionFormActionTypes } from '@/context/form/OptionFormReducer'
import { settingsInfo } from './settingsInfos'



export function Setting({ name, value, className, allowedToChange = true }) {
  const { dispatch } = useOptionFormContext()

  return (
    <div
      className={cx(
        className,
        'col-span-9 relative rounded-md py-5 px-5 ',
        allowedToChange ? '' : 'cursor-not-allowed opacity-70',
      )}
    >
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-[12px] text-[#726DA6]">
          {settingsInfo[name].desc}
        </span>
        <div className="md:flex gap-0">
          {/* {console.log(name)} */}

          {name === 'volatility' && (
            <>
              <input
                // type="number"
                step="0.01"
                defaultValue={value}
                placeholder={value}
                className={cx(
                  allowedToChange ? '' : 'cursor-not-allowed',
                  'font-normal text-white w-40 text-[18px] ',
                )}
                value={value}
                onChange={(event) => {
                  if (allowedToChange === true) {
                    console.log(allowedToChange)
                    return dispatch({
                      type: OptionFormActionTypes.UPDATE_MODEL,
                      name: name,
                      value: event.target.value,
                    })
                  }
                }}
                style={{ backgroundColor: 'transparent', outline: 'none' }}
              />
            </>
          )}
          {name !== 'volatility' && settingsInfo[name].type === 'input' && (
            <input
              // type="number"
              step="0.01"
              defaultValue={value}
              placeholder={value}
              value={value}
              className="font-normal text-white   w-40 text-[18px]"
              onChange={(event) =>
                dispatch({
                  type: OptionFormActionTypes.UPDATE_ADVANCED_SETTINGS,
                  name: name,
                  value: event.target.value,
                })
              }
              style={{ backgroundColor: 'transparent', outline: 'none' }}
            />
          )}
          {/* {name === 'optionType' && (
            <DropDown
              ActionType={OptionFormActionTypes.UPDATE_ADVANCED_SETTINGS}
              name={name}
              array={[value, ...SettingsArrays[name]]}
              dispatch={dispatch}
            />
          )} */}
          {/* {name === 'modelParams' && (
            <DropDown
              ActionType={OptionFormActionTypes.UPDATE_MODEL}
              name={'type'}
              array={[value.type, ...SettingsArrays[name]]}
              dispatch={dispatch}
            />
          )} */}

          {/* <span className="bg-[#fff]/5 rounded-md px-3 py-0.5 text-center">
              <span className="text-[#A680FF] font-semibold text-[12px] my-auto">
                USDC
              </span>
            </span> */}
        </div>
      </div>
    </div>
  )
}

{
  /* <button
type="button"
className="px-8 py-3 text-white bg-blue-600 rounded cursor-not-allowed focus:outline-none disabled:opacity-75"
disabled
>
Button 25
</button> */
}
