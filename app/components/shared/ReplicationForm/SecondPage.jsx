import React from 'react'
import { useState } from 'react'
import Slider from '../Slider'
import {
  VanillaTypes,
  OptionDirections,
  TokenOptions,
  AddressToToken,
  defineAddresses,
} from '../../../configs/mypositions.config'

const SecondPage = ({ formValues, handleFormChange, toSecondStep }) => {
  const [showAdvancedSettings, setAdvanced] = useState(false)

  const { addressToken1 } = formValues

  return (
    <div className="px-10 py-4 relative bg-white rounded-xl">
      <div className="flex justify-between">
        <div>
          <div className="flex flex-col">
            <span className="-ml-5 text-medium text-xl">
              Add initial liquidity to trade underlying
            </span>
            <span className="-ml-5 text-black text-normal mt-1">
              Please add the liquidity in
              <span className="font-bold">
                {/* {ShouldPayFirstToken(
                      VanillaType.label,
                      OptionDirection.value
                    )
                      ? ` ${AddressToToken[addressToken1]} `
                      : ` ${AddressToToken[addressToken2]} `} */}
              </span>
              tokens
            </span>
          </div>
          <div className="relative h-9 rounded-xl mt-4 -ml-5 mb-10">
            <input
              type={'number'}
              step="any"
              placeholder="0.00"
              className="outline-0 w-28 h-10 text-xl bg-gray-100 text-center absolute left-0 top-1 rounded-2xl"
              onChange={(value) => {
                // setToken1Balance(value.target.value || "0");
                // console.log(value.target.value);
              }}
            />
            {console.log()}
            <span className="absolute ml-32 text-xl top-3">{`${AddressToToken[addressToken1]}`}</span>
          </div>
          <span className="-ml-5 text-medium text-xl  relative ">
            Fees to be split between hedgers
          </span>
          <div className="mt-1 flex ">
            <div className="">
              <div className="relative h-9 rounded-xl mt-2 -ml-5 w-60">
                <input
                  type={'number'}
                  step="any"
                  placeholder="0.00"
                  className="outline-0 w-28 h-10 text-xl bg-gray-100 text-center absolute left-0 top-1 rounded-2xl"
                  onChange={(value) => {
                    setFees(
                      parseFloat(value.target.value) > 0
                        ? parseFloat(value.target.value)
                        : 0,
                    )
                    console.log(value.target.value)
                  }}
                />
                <span className="absolute ml-32 text-xl top-2">{`${AddressToToken[addressToken1]}`}</span>
              </div>
            </div>
            <div className="mt-3 text-xl">
              <span className="bg-gray-100 rounded-md py-1 px-3 text-gray-500">
                {/* {`${
                  Math.round(
                    (parseFloat(fees) /
                      parseInt(perDay) /
                      parseFloat(expiration)) *
                      1000,
                  ) / 1000
                } ${AddressToToken[addressToken1]} per hedge`} */}
              </span>
            </div>
          </div>
          <div className="mt-5">
            <span className="-ml-5 text-medium text-xl relative">
              Number of delta hedges per day
            </span>
            <div className="relative h-9 rounded-xl mt-2 -ml-5">
              <input
                type={'number'}
                step="1"
                min="1"
                max="48"
                placeholder="1"
                className="outline-0 w-28 h-10 text-xl bg-gray-100 text-center absolute left-0 top-1 rounded-2xl"
                onChange={(value) => {
                  //   setPerDay(
                  //     parseFloat(value.target.value) > 0
                  //       ? parseFloat(value.target.value)
                  //       : 0,
                  //   )
                  //   console.log(value.target.value)
                }}
              />
              <span className="absolute ml-32 text-xl top-3">{`times per day`}</span>
              <button
                className="mt-20 bg-indigo-400 ml w-50 rounded text-white text-center hover:bg-indigo-300"
                onClick={() => {
                  //   fillDefault()
                  //   setNext(!isNext)
                }}
              >
                {' '}
                Back
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {/* <ProfitChart
            params={{
              S: parseFloat(currentPrice),
              K: parseFloat(strike),
              T: DaysToYears(expiration),
              r: parseFloat(riskFree),
              sigma: 0.5,
            }}
            OptionDirection={OptionDirection}
            OptionType={VanillaType}
          /> */}
          <label
            for="default-toggle"
            className="mt-5 mr-32 inline-flex relative items-center cursor-pointer"
          >
            <input
              type="checkbox"
              value=""
              id="default-toggle"
              className="sr-only peer"
              onClick={() => {
                setAdvanced(!showAdvancedSettings)
              }}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-indigo-600"></div>
            <span className="ml-3 text-xl text-gray-900 ">
              Advanced settings
            </span>
          </label>

          <button
            className="mt-20 bg-indigo-400 ml-28  w-50 rounded text-white text-center hover:bg-indigo-300"
            // onClick={processForm}
            // onClick={() => alert("start replication")}
          >
            {' '}
            Start replication
          </button>
        </div>
      </div>
      <div className="flex justify-between mt-10 mb-10">
        {showAdvancedSettings ? (
          <div className="flex flex-col">
            <span className="-ml-5 w-80 text-xl">Choose the model</span>
            <Creatable
              className="-ml-5 mt-2 "
              options={AvailableModels}
              defaultValue={AvailableModels[0]}
              onChange={(value) => {
                if (value === null) return
                // setModel(value)
              }}
            />
            <div className="grid grid-cols-2 gap-12 mt-4">
              {/* {ModelsParams[chosenModel.value].map((el) => (
                <GenerateModelInput param={el[0]} onChangeToggle={el[1]} />
              ))} */}
            </div>
          </div>
        ) : (
          // first page

          <div></div>
        )}
      </div>
    </div>
  )
}

export default SecondPage
