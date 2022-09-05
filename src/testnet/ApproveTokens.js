const erc20ABI = require("./ERC20.json");
var ethers = require("ethers");

const provider = new ethers.providers.Web3Provider(window.ethereum);

const DAI = "0x2DC042385a6b1eFAeec4816118E704028A733BED";
const WETH = '0xA8132b63AdE6ff0eAFE2b6a8E7E252A2418eCCec';


export const ApproveTokens = async (token) => {
  
    // console.log("amount", amount);
    let coreAddress = "0xe21dA5f66317980f74E20Faec80b1c96D1Ca64FE";
    let tokenAddress;
    let amount;
    // alert(1)

    if (token === "DAI") {
      tokenAddress = DAI;
      amount = '10000';
    } else if (token === "WETH") {
      tokenAddress = WETH;
      amount = '5';
    }

    amount = ethers.utils.parseUnits(amount);

    const signer = provider.getSigner();
    const Token = new ethers.Contract(tokenAddress, erc20ABI, signer);
    console.log(Token);

    try {
      const tx = await Token.approve(coreAddress, amount);
      // wait until the transaction is mined
      // // console.log('here')
      await tx.wait();
  
      return {
        success: true,
        status:
          "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/",
      };
    } catch (error) {
      return ({
        success: false,
        status: "😥 Something went wrong: " + error.message,
      });
    }
  };