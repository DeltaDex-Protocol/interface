// import {pinJSONToIPFS} from './pinata.js'

// require('dotenv').config();
// const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3(alchemyKey);

// const contractABI = require("../contract-abi.json")
// const contractAddress = "0xd1b04035bB8E12584070f3f42090877Cee52817a";

const contractABI = require("./OptionMaker.json");
const contractAddress = "0x1343248Cbd4e291C6979e70a138f4c774e902561";

var ethers = require("ethers");
const provider = new ethers.providers.Web3Provider(window.ethereum);

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const mintNFT = async (
  addressToken0,
  addressToken1,
  token0Balance,
  fees,
  perDay,
  strike,
  expiration,
  riskFree,
  volatility,
  meanReversion,
  jumpDeviation,
  jumpIntensity
) => {
  if (addressToken0.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    };
  }

  token0Balance = ethers.utils.parseUnits(token0Balance);
  fees = ethers.utils.parseUnits(fees);
  perDay = ethers.utils.parseUnits(perDay);
  strike = ethers.utils.parseUnits(strike);
  expiration = ethers.utils.parseUnits(expiration);
  riskFree = ethers.utils.parseUnits(riskFree);
  volatility = ethers.utils.parseUnits(volatility);
  meanReversion = ethers.utils.parseUnits(meanReversion);
  jumpDeviation = ethers.utils.parseUnits(jumpDeviation);
  jumpIntensity = ethers.utils.parseUnits(jumpIntensity);

  // JDM input
  const JDM_Call_Input = [
    addressToken0,
    addressToken1,
    token0Balance,
    0,
    0,
    0,
    fees,
    perDay,
    0,
    0,
    [
      strike,
      expiration,
      riskFree,
      volatility,
      meanReversion,
      jumpDeviation,
      jumpIntensity,
    ],
  ];

  const signer = provider.getSigner();
  const optionmaker = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    const tx = await optionmaker.JDM_CALL_START_REPLICATION(JDM_Call_Input);
    // wait until the transaction is mined
    // console.log('here')
    await tx.wait();

    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/",
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

// test

export const getUserPositions = async () => {
  const signer = provider.getSigner();
  const optionmaker = new ethers.Contract(contractAddress, contractABI, signer);

  const pairAddress = await optionmaker.allPairs(0);
  console.log(pairAddress);

  const userAddress = await signer.getAddress();
  console.log(userAddress);

  var option = await optionmaker.JDM_Calls(pairAddress, userAddress, 0);

  // wait until the transaction is mined
  // console.log('here')
  // await option.wait();

  console.log(option);
};
