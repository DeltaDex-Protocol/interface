const erc20ABI = require('@/data/ERC20.json')
var ethers = require('ethers')

import { DAI, WETH } from "./constants.testnet"

export const MintTokens = async (token) => {
  if (window.ethereum) {
    // console.log("amount", amount);
    let tokenAddress
    let amount
    // alert(1)

    if (token === 'DAI') {
      tokenAddress = DAI
      amount = '9999'
    } else if (token === 'WETH') {
      tokenAddress = WETH
      amount = '5'
    }

    amount = ethers.utils.parseUnits(amount)

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const signer = provider.getSigner()
    const Token = new ethers.Contract(tokenAddress, erc20ABI, signer)
    console.log(Token)

    try {
      const tx = await Token.mint(amount)
      // wait until the transaction is mined
      //   console.log('here')
      await tx.wait()
      console.log('cool')
      return {
        success: true,
        status:
          '✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/',
      }
    } catch (error) {
      console.log(error)
      return {
        success: false,
        status: '😥 Something went wrong: ' + error.message,
      }
    }
  }
}
