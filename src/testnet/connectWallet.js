const erc20ABI = require("./ERC20.json");
const erc20Address = "0x2dc042385a6b1efaeec4816118e704028a733bed";

var ethers = require("ethers");
const provider = new ethers.providers.Web3Provider(window.ethereum);

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "🦊 Successfully connected",
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

export const MintTokens = async (erc20Address, amount) => {
  amount = ethers.utils.parseUnits(amount);

  console.log("amount", amount);

  const signer = provider.getSigner();
  const erc20 = new ethers.Contract(erc20Address, erc20ABI, signer);

  try {
    const tx = await erc20.mint(amount);
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
};


export const ApproveTokens = async (erc20Address, amount) => {
  amount = ethers.utils.parseUnits(amount);

  console.log("amount", amount);

  const signer = provider.getSigner();
  const erc20 = new ethers.Contract(erc20Address, erc20ABI, signer);

  try {
    const tx = await erc20.approve(signer.address);
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
};
