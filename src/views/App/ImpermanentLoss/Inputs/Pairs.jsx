import React from 'react'
import useCollapse from 'react-collapsed'
import { memo, useEffect, useMemo, useState } from 'react'
import { useContext } from 'react'
import { FormContext } from '../Form'
import cx from 'classnames'

import EthLogo from 'public/images/tokens/eth.svg'
import DropDown from 'src/views/App/ImpermanentLoss/DropDown'

function Pairs({className}) {
  const { token1, token2 } = useContext(FormContext).form
  const pairs = [token1 + '-' + token2, ...['WETH-USDC']] //'WETH-WBTC'

  const [balance, setBalance] = useState(0)

  const getBalance = async () => 520 + ' USDC'

  useEffect(() => {
    getBalance().then((res) => setBalance(res))
  }, [])

  return (
    <div className={cx(className, "col-span-5 relative rounded-md py-3 px-5 ")}>
      <div className="pb-0 flex flex-col gap-2">
        <span className="font-semibold text-[13px] text-[#726DA6]">
          Select pair
        </span>
        <div className="flex gap-1 my-auto">
          <EthLogo className="h-7 w-7" />
          <div className="my-auto rounded-md"></div>
          <DropDown array={pairs} name="pair" />
        </div>
        <span className="text-[12px] text-[#726DA6]">Balance: {balance}</span>
      </div>
    </div>
  )
}

export { Pairs }
