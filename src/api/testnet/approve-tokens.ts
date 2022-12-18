const erc20ABI = require('@/data/ERC20.json')
var ethers = require('ethers')

import { DAI, WETH, CORE_ADDRESS } from './constants.testnet'

export const ApproveTokens = async (token) => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // console.log("amount", amount);
    let coreAddress = CORE_ADDRESS
    let tokenAddress
    let amount
    // alert(1)

    if (token === 'DAI') {
      tokenAddress = DAI
      amount = '10000'
    } else if (token === 'WETH') {
      tokenAddress = WETH
      amount = '5'
    }

    amount = ethers.utils.parseUnits(amount)

    const signer = provider.getSigner()
    const Token = new ethers.Contract(tokenAddress, erc20ABI, signer)
    console.log(Token)

    try {
      const tx = await Token.approve(coreAddress, amount)
      // wait until the transaction is mined
      // // console.log('here')
      await tx.wait()

      return {
        success: true,
        status:
          '✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/',
      }
    } catch (error) {
      return {
        success: false,
        status: '😥 Something went wrong: ' + error.message,
      }
    }
  }
}
