/* eslint-disable react/prop-types */
import cx from 'classnames'
// import type { FC, PropsWithChildren } from 'react'
import { useMemo, memo, useState, useEffect } from 'react'

import {
  Pairs,
  ValueToProtect,
  Period,
  Leverage,
} from 'src/views/App/ImpermanentLoss/Inputs/index'
import MinimalLiquidity from 'src/views/App/ImpermanentLoss/MinimalLiquidity'
// import Tutorial from 'src/views/App/ImpermanentLoss/ForTests'
import { createContext } from 'react'
import { curvedOptionInitialValues } from 'src/views/App/ImpermanentLoss/data/form'


export const FormContext = createContext({
  form: {},
  handleFormChange: () => {},
})

const Form = ({ className }) => {
  const [form, setForm] = useState(curvedOptionInitialValues)

  const handleFormChange = (name, value) => {
    // const { name, value } = event.target
    console.log(name, value)

    if (name == 'pair') {
      let [_token1, _token2] = value.split('-')
      console.log(_token1, _token2)
      setForm({
        ...form,
        token1: _token1,
        token2: _token2,
      })
    } else {
      setForm({
        ...form,
        [name]: value,
      })
    }
  }

  useEffect(() => console.log(form))

  return (
    <FormContext.Provider value={{ form, handleFormChange }}>
      <section className={cx(className, 'bg-[#141822]/80')}>
        <header className=" mt-2 mb-4 px-2  md:gap-6">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <span className="font-semibold text-[17px] text-[#726DA6]">
                Uniswap IL protection:{' '}
              </span>
              <span className="text-[18px]">V2</span>
            </div>
            <div className="flex flex-col -space-y-1 text-[12px] text-[#726DA6] font-semibold ">
              <span>advanced</span>
              <span>settings</span>
            </div>
          </div>
          {/* <Tutorial label="Email Address" type="email" /> */}
        </header>
        <div className="">
          <div className="grid grid-cols-5 gap-2 mb-4 px-1">
            <Pairs />
            <ValueToProtect />
            <Period />
            <Leverage />
            <MinimalLiquidity />
          </div>
          <div className="flex justify-between px-2">
            <span className="font-semibold text-[#726DA6]">
              Historical average accuracy
            </span>
            <span className="font-semibold px-2">93%</span>
          </div>
          <button
            className="hover:shadow-xl hover:shadow-[#883FFF] hover:bg-[#883FFF] 
            bg-[#883FFF] my-7 py-4 rounded-xl mx-auto  duration-300  
            w-full px-10 font-semibold text-[18px]"
          >
            Hedge Impermanent Loss
          </button>
        </div>
      </section>
    </FormContext.Provider>
  )
}

// Routes.displayName = 'Routes'

export default Form
