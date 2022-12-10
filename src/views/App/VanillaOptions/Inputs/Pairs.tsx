import React from 'react'
import { memo, useEffect, useMemo, useState } from 'react'
import cx from 'classnames'

import { useOptionFormContext } from '@/context/form/OptionFormContext'
import EthLogo from 'public/images/tokens/eth.svg'
// import DropDown from '@/components/kit/Form/components/DropDown'
import { NewDropDown } from './NewDropDown'

import { OptionFormActionTypes } from '@/context/form/OptionFormReducer'

function Pairs({ className }) {
  const { formData, dispatch } = useOptionFormContext()
  const pairs = [formData.token1 + '-' + formData.token2, ...['DAI-WETH']] //'WETH-WBTC'

  const [balance, setBalance] = useState(0)

  const getBalance = async () => 520 + ' DAI'

  useEffect(() => {
    getBalance().then((res) => setBalance(parseInt(res)))
  }, [])

  return (
    <div
      className={cx(
        className,
        'col-span-9 relative rounded-md py-3 px-5 border-2 ',
      )}
    >
      <div className="pb-0 flex flex-col gap-2">
        <span className="font-semibold text-[13px] text-[#726DA6]">
          Select pair
        </span>
        <div className="flex gap-1 my-auto">
          <EthLogo className="h-7 w-7" />
          <div className="my-auto rounded-md"></div>
          <NewDropDown
            name=""
            array={pairs}
            ActionType={OptionFormActionTypes.CHANGE_PAIR}
            dispatch={dispatch}
          />
        </div>
        <span className="text-[12px] text-[#726DA6]">Balance: {balance}</span>
      </div>
    </div>
  )
}

export { Pairs }
