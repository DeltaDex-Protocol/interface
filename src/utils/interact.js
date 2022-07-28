// import {pinJSONToIPFS} from './pinata.js'

// require('dotenv').config();
// const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3(alchemyKey);

// const contractABI = require("../contract-abi.json")
// const contractAddress = "0xd1b04035bB8E12584070f3f42090877Cee52817a";

const contractABI = require("./OptionMaker.json");
const contractAddress = "0xd9fEc8238711935D6c8d79Bef2B9546ef23FC046";

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
  if (addressToken0 == "") {
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

// @dev get react grid rows
export const getUserPositions = async () => {
  const signer = provider.getSigner();

  const optionmaker = new ethers.Contract(contractAddress, contractABI, signer);

  const userAddress = await signer.getAddress();
  console.log(userAddress.address);

  const noOfPositions = await optionmaker.userIDlength(userAddress);
  console.log(noOfPositions);

  let i = 0;

  const pairAddress = await optionmaker.Positions(userAddress, i.toString());
  console.log(pairAddress);

  const rows = [];

  var optionPosition = await optionmaker.JDM_Options(
    pairAddress,
    userAddress,
    3
  );

  console.log(optionPosition);

  for (let i = 0; i < noOfPositions; i++) {
    const pairAddress = await optionmaker.Positions(userAddress, i.toString());
    var optionPosition = await optionmaker.JDM_Options(
      pairAddress,
      userAddress,
      i
    );
    const row = parseJDM(i, optionPosition);
    // console.log(row);

    rows.push(row);
  }
  console.log(rows);

  return rows;
};

// @dev depreciated
function parseJDM(i, optionPosition) {
  const JDM = JSON.stringify(optionPosition);

  const JDMparsed = JSON.parse(JDM);

  var token0 = JDMparsed[0];
  var token1 = JDMparsed[1];

  var token0_balance = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[2]),
    "ether"
  );

  var token1_balance = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[3]),
    "ether"
  );

  var isCall = JDMparsed[4];
  var isLong = JDMparsed[5];

  var amount = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[6]),
    "ether"
  );

  var expiry = ethers.BigNumber.from(JDMparsed[7]).toString();

  var fees = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[8]),
    "ether"
  );

  var perDay = ethers.BigNumber.from(JDMparsed[9]).toString();

  var hedgeFee = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[10]),
    "ether"
  );

  var lastHedge = ethers.BigNumber.from(JDMparsed[11]).toString();

  var K = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[12][0]),
    "ether"
  );

  var T = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[12][1]),
    "ether"
  );

  var r = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[12][2]),
    "ether"
  );

  var sigma = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[12][3]),
    "ether"
  );

  var m = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[12][4]),
    "ether"
  );

  var v = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[12][5]),
    "ether"
  );

  var lam = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[12][6]),
    "ether"
  );

  const row = {
    id: i + 1,
    token0: token0,
    token1: token1,
    token0_balance: token0_balance,
    token1_balance: token1_balance,

    isCall: isCall,
    isLong: isLong,

    amount: amount,
    expiry: expiry,
    fees: fees,
    perday: perDay,
    hedgeFee: hedgeFee,
    lastHedge: lastHedge,
    strike: K,
    T: T,
    r: r,
    sigma: sigma,
    lam: lam,
    m: m,
    v: v,
  };

  return row;
}

//@ dev depreciated

export const getUserPositionsTable = async () => {
  const signer = provider.getSigner();
  const optionmaker = new ethers.Contract(contractAddress, contractABI, signer);

  const pairAddress = await optionmaker.allPairs(0);
  console.log(pairAddress);

  const userAddress = await signer.getAddress();
  console.log(userAddress);

  // this is trashy code bc it assumes the last position of user is in pairAddress...
  const positionID = (await optionmaker.userIDlength(userAddress)) - 1;

  console.log(positionID);

  var JDM_CALL = await optionmaker.JDM_Calls(pairAddress, userAddress, 3);

  const JDM = JSON.stringify(JDM_CALL);

  const JDMparsed = JSON.parse(JDM);

  var token0 = JDMparsed[0];
  var token1 = JDMparsed[1];

  var token0_balance = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[2]),
    "ether"
  );

  var token1_balance = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[3]),
    "ether"
  );

  var amount = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[4]),
    "ether"
  );

  var expiry = ethers.BigNumber.from(JDMparsed[5]).toString();

  var fees = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[6]),
    "ether"
  );

  var perDay = ethers.BigNumber.from(JDMparsed[7]).toString();

  var hedgeFee = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[8]),
    "ether"
  );

  var lastHedge = ethers.BigNumber.from(JDMparsed[9]).toString();

  var K = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[10][0]),
    "ether"
  );

  var T = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[10][1]),
    "ether"
  );

  var r = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[10][2]),
    "ether"
  );

  var sigma = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[10][3]),
    "ether"
  );

  var m = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[10][4]),
    "ether"
  );

  var v = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[10][5]),
    "ether"
  );

  var lam = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[10][6]),
    "ether"
  );

  var position = [
    token0,
    token1,
    token0_balance,
    token1_balance,
    amount,
    expiry,
    fees,
    perDay,
    hedgeFee,
    lastHedge,
    K,
    T,
    r,
    sigma,
    m,
    v,
    lam,
  ];

  /*
  const rows = [
    {
      id: 0,
      token0: token0,
      token1: token1,
      token0_balance: token0_balance,
      token1_balance: token1_balance,
      amount: amount,
      expiry: expiry,
      fees: fees,
      hedges: perDay,
      hedgeFee: hedgeFee,
      strike: K,
      T: T,
      r: r,
      sigma: sigma,
      lam: lam,
      m: m,
      v: v,
    },
  ];
  */

  // console.log(position);
};
