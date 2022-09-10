const erc20ABI = require("./ERC20.json");
var ethers = require("ethers");

const DAI = "0xE6937ab8cc964D616DeD01225a208a732f0dBF47";
const WETH = "0xA8DFC7Df45a0Fd0701fafFEA739d31b2d2CCfBF2";

export const ApproveTokens = async (token) => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // console.log("amount", amount);
    let coreAddress = "0x30d99e3BED319849c98a96E953bf161958940612";
    let tokenAddress;
    let amount;
    // alert(1)

    if (token === "DAI") {
      tokenAddress = DAI;
      amount = "10000";
    } else if (token === "WETH") {
      tokenAddress = WETH;
      amount = "5";
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
      return {
        success: false,
        status: "😥 Something went wrong: " + error.message,
      };
    }
  }
};
