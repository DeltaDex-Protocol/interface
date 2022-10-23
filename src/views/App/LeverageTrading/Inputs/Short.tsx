import React from 'react'
import useCollapse from 'react-collapsed'
import { memo, useEffect, useMemo, useState } from 'react'
import cx from 'classnames'

import { useFormContext } from '@/context/form/formContext'
import EthLogo from 'public/images/tokens/eth.svg'
import DropDown from 'src/views/App/ImpermanentLoss/DropDown'
import { FormActionTypes } from '@/context/form/formReducer'

function Short({ className }) {
  const { token1, token2 } = useFormContext().formData
  const pairs = [token1 + '-' + token2, ...['WETH-USDC']] //'WETH-WBTC'

  const [balance, setBalance] = useState(0)

  const getBalance = async () => 520 + ' USDC'

  useEffect(() => {
    getBalance().then((res) => setBalance(parseInt(res)))
  }, [])

  return (
    <div
      className={cx(
        className,
        'col-span-2 relative h-500 rounded-md py-3 px-5  ',
      )}
    >
      <div className="md:flex gap-0"></div>
        Short
    </div>
  )
}

export { Short }
