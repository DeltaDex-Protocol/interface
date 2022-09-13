import React from 'react'
import Creatable from 'react-select/creatable'
import Slider from '../Slider'
import {
  VanillaTypes,
  OptionDirections,
  TokenOptions,
  AddressToToken,
  defineAddresses,
} from '../../../configs/mypositions.config'
import Button from '../Button'

const FirstPage = ({ formValues, handleFormChange, toSecondStep }) => {
  return (
    <div className="px-10 py-4 relative -mt-1 bg-white rounded-xl">
      <div className="flex justify-between mb-2 mt-0 space-x-10">
        <div className="flex flex-col space-y-4">
          <div className="-ml-5 space-y-2 z-40">
            <span className="">Choose option type</span>
            <Creatable
              options={VanillaTypes}
              name="VanillaType"
              defaultValue={formValues.VanillaType}
              onChange={(value, { name }) => handleFormChange(name, value)}
            />
          </div>
          <div className="-ml-5 mt-4 space-y-2 z-30">
            <span className="">Direction of the option</span>
            <Creatable
              options={OptionDirections}
              name="OptionDirection"
              defaultValue={formValues.OptionDirection}
              onChange={(value, { name }) => handleFormChange(name, value)}
            />
          </div>
        </div>
        <div className="flex flex-col mt-2 space-y-10">
          <Slider
            sliderType={'strike'}
            name="strike"
            onChange={(value, { name }) => handleFormChange(name, value)}
          />
          <Slider
            sliderType={'expiry'}
            name="expiry"
            onChange={(value, { name }) => handleFormChange(name, value)}
          />
        </div>
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
      </div>
      <div className="-ml-5 space-y-4">
        <span className="text-sm sm:text-base md:text-lg">
          Specify the token pair by choosing tokens
        </span>
        <div className="flex space-x-10">
          <Creatable
            className="z-20"
            name="addressToken1"
            options={TokenOptions}
            defaultValue={TokenOptions[0]}
            onChange={(value, { name }) => handleFormChange(name, value)}
          />
          <Creatable
            className="z-20"
            name="addressToken2"
            options={TokenOptions}
            defaultValue={TokenOptions[TokenOptions.length - 1]}
            onChange={(value, { name }) => handleFormChange(name, value)}
          />
        </div>
      </div>
      <div className="-ml-5 flex space-x-10  mt-4 ">
        <Slider
          name="OptionAmount"
          sliderType={'OptionAmount'}
          onChange={(value, { name }) => handleFormChange(name, value)}
        />
        <div className="mt-5">
          <Slider
            name="riskFree"
            sliderType={'riskFree'}
            onChange={(value, { name }) => handleFormChange(name, value)}
          />
        </div>
        {/* <button
          className=" mt-20 px-10  rounded text-white text-center bg-violet-500 hover:bg-violet-400"
          onClick={() => toSecondStep()}
        >
          Next
        </button> */}
      </div>
      <div className="mb-10">
        <div className="absolute right-10">
          <Button value={'Next step'} onClick={toSecondStep} />
        </div>
      </div>
    </div>
  )
}

export default FirstPage
