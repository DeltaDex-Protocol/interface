// import {pinJSONToIPFS} from './pinata.js'

// require('dotenv').config();
// const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3(alchemyKey);

// const contractABI = require("../contract-abi.json")
// const contractAddress = "0xd1b04035bB8E12584070f3f42090877Cee52817a";

const contractABI = require("./OptionMaker.json");
const contractAddress = "0x512F7469BcC83089497506b5df64c6E246B39925";

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
    // // console.log('here')
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
  // // console.log(userAddress.address);

  const noOfPositions = await optionmaker.userIDlength(userAddress);
  // // console.log(noOfPositions);

  const rows = [];

  for (let i = 0; i < noOfPositions; i++) {
    const pairAddress = await optionmaker.Positions(userAddress, i.toString());

    // JDM positions

    var optionPosition1 = await optionmaker.JDM_Options(
      pairAddress,
      userAddress,
      i
    );
    const JDMrow = parseJDM(i, optionPosition1);

    // // console.log(JDMrow["token0"]);

    var isEmpty = checkIfEmptyPosition(JDMrow);
    if (isEmpty == true) {
      // // console.log("empty");
    } else {
      rows.push(JDMrow);
    }

    // BS positions

    var optionPosition2 = await optionmaker.BS_Options(
      pairAddress,
      userAddress,
      i
    );

    const BSrow = parseBS(i, optionPosition2);

    var isEmpty = checkIfEmptyPosition(BSrow);

    if (isEmpty == true) {
      // console.log("empty");
    } else {
      rows.push(BSrow);
    }

    // BSC positions
    var optionPosition3 = await optionmaker.BSC_Options(
      pairAddress,
      userAddress,
      i
    );
    const BSCrow = parseBSC(i, optionPosition3);

    // console.log(JDMrow["token0"]);

    var isEmpty = checkIfEmptyPosition(BSCrow);
    if (isEmpty == true) {
      // console.log("empty");
    } else {
      rows.push(BSCrow);
    }
  }
  // console.log(rows);

  return rows;
};

function checkIfEmptyPosition(position) {
  if (position["token0"] == "0x0000000000000000000000000000000000000000") {
    return true;
  } else {
    return false;
  }
}

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

function parseBS(i, optionPosition) {
  const BS = JSON.stringify(optionPosition);

  const BSparsed = JSON.parse(BS);

  var token0 = BSparsed[0];
  var token1 = BSparsed[1];

  var token0_balance = ethers.utils.formatUnits(
    ethers.BigNumber.from(BSparsed[2]),
    "ether"
  );

  var token1_balance = ethers.utils.formatUnits(
    ethers.BigNumber.from(BSparsed[3]),
    "ether"
  );

  var isCall = BSparsed[4];
  var isLong = BSparsed[5];

  var amount = ethers.utils.formatUnits(
    ethers.BigNumber.from(BSparsed[6]),
    "ether"
  );

  var expiry = ethers.BigNumber.from(BSparsed[7]).toString();

  var fees = ethers.utils.formatUnits(
    ethers.BigNumber.from(BSparsed[8]),
    "ether"
  );

  var perDay = ethers.BigNumber.from(BSparsed[9]).toString();

  var hedgeFee = ethers.utils.formatUnits(
    ethers.BigNumber.from(BSparsed[10]),
    "ether"
  );

  var lastHedge = ethers.BigNumber.from(BSparsed[11]).toString();

  var K = ethers.utils.formatUnits(
    ethers.BigNumber.from(BSparsed[12][0]),
    "ether"
  );

  var T = ethers.utils.formatUnits(
    ethers.BigNumber.from(BSparsed[12][1]),
    "ether"
  );

  var r = ethers.utils.formatUnits(
    ethers.BigNumber.from(BSparsed[12][2]),
    "ether"
  );

  var sigma = ethers.utils.formatUnits(
    ethers.BigNumber.from(BSparsed[12][3]),
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
    lam: "-",
    m: "-",
    v: "-",
  };

  return row;
}

function parseBSC(i, optionPosition) {
  const BSC = JSON.stringify(optionPosition);

  const BSCparsed = JSON.parse(BSC);

  var token0 = BSCparsed[0];
  var token1 = BSCparsed[1];

  var token0_balance = ethers.utils.formatUnits(
    ethers.BigNumber.from(BSCparsed[2]),
    "ether"
  );

  var token1_balance = ethers.utils.formatUnits(
    ethers.BigNumber.from(BSCparsed[3]),
    "ether"
  );

  var isCall = BSCparsed[4];
  var isLong = BSCparsed[5];

  var amount = ethers.utils.formatUnits(
    ethers.BigNumber.from(BSCparsed[6]),
    "ether"
  );

  var expiry = ethers.BigNumber.from(BSCparsed[7]).toString();

  var fees = ethers.utils.formatUnits(
    ethers.BigNumber.from(BSCparsed[8]),
    "ether"
  );

  var perDay = ethers.BigNumber.from(BSCparsed[9]).toString();

  var hedgeFee = ethers.utils.formatUnits(
    ethers.BigNumber.from(BSCparsed[10]),
    "ether"
  );

  var lastHedge = ethers.BigNumber.from(BSCparsed[11]).toString();

  var K = ethers.utils.formatUnits(
    ethers.BigNumber.from(BSCparsed[12][0]),
    "ether"
  );

  var T = ethers.utils.formatUnits(
    ethers.BigNumber.from(BSCparsed[12][1]),
    "ether"
  );

  var r = ethers.utils.formatUnits(
    ethers.BigNumber.from(BSCparsed[12][2]),
    "ether"
  );

  var sigma = ethers.utils.formatUnits(
    ethers.BigNumber.from(BSCparsed[12][3]),
    "ether"
  );

  var tv0 = ethers.utils.formatUnits(
    ethers.BigNumber.from(BSCparsed[12][4]),
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
    tv0: tv0,
    lam: "-",
    m: "-",
    v: "-",
  };

  return row;
}

// Get all positions

function checkIfEmptyPosition2(position) {
  if (position["tokenA"] == "0x0000000000000000000000000000000000000000") {
    return true;
  } else {
    return false;
  }
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export const getAllPositions = async (tokenPair) => {
  const signer = provider.getSigner();

  const optionmaker = new ethers.Contract(contractAddress, contractABI, signer);

  let users = await optionmaker.getUserAddressesInPair(tokenPair);

  let uniqueUsers = users.filter(onlyUnique);

  // alert(uniqueUsers)

  // // console.log(uniqueUsers);
  // let positions = [];
  for (const user of uniqueUsers) {
    // addresses of token pairs that user is a part of
    let tokenPairs = await optionmaker.getUserPositions(user);

    // // console.log("token pairs", tokenPairs);

    // number of positions in this tokenPair
    let noOfPositionsInPair = tokenPairs.filter((x) => x == tokenPair).length;

    // // console.log(noOfPositionsInPair);
    // let noOfPosiitons = optionmaker.userIDlength(user);

    let positions = [];

    for (let i = 0; i < noOfPositionsInPair; i++) {
      let JDM = await optionmaker.JDM_Options(tokenPair, user, i);

      var isEmpty = checkIfEmptyPosition2(JDM);
      if (isEmpty == true) {
        // pass
      } else {
        positions.push(JDM);
        // // console.log(BS);
      }

      let BS = await optionmaker.BS_Options(tokenPair, user, i);

      var isEmpty = checkIfEmptyPosition2(BS);
      if (isEmpty == true) {
        // pass
      } else {
        positions.push(BS);
      }

      let BSC = await optionmaker.BSC_Options(tokenPair, user, i);
      var isEmpty = checkIfEmptyPosition2(BSC);
      if (isEmpty == true) {
        // pass
      } else {
        positions.push(BSC);
      }
    }
    console.log(positions);
  }
};

export const getAllPairAddresses = async () => {
  const signer = provider.getSigner();

  const optionmaker = new ethers.Contract(contractAddress, contractABI, signer);

  let Pairs = await optionmaker.Pairs();

  return Pairs;
};
