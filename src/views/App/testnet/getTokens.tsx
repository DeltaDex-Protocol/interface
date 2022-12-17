import { useEffect, useState } from 'react'

// import { connectWallet, getCurrentWalletConnected } from "./connectWallet";

const ReceiveTokens = () => {
  const [walletAddress, setWallet] = useState('')
  const [status, setStatus] = useState('')

  // useEffect(() => {
  //     getCurrentWalletConnected()
  //         .then((res) => {
  //             const { address, status } = res;
  //             setWallet(address);
  //             setStatus(status);
  //             console.log(address);

  //         });

  //     addWalletListener();
  // }, []);

  // function addWalletListener() {
  //   if (window.ethereum) {
  //     window.ethereum.on("accountsChanged", (accounts) => {
  //       if (accounts.length > 0) {
  //         setWallet(accounts[0]);
  //         setStatus("👆🏽 Write a message in the text-field above.");
  //       } else {
  //         setWallet("");
  //         setStatus("🦊 Connect to Metamask using the top right button.");
  //       }
  //     });
  //   } else {
  //     setStatus(
  //       <p>
  //         {" "}
  //         🦊{" "}
  //         <a target="_blank" href={`https://metamask.io/download.html`}>
  //           You must install Metamask, a virtual Ethereum wallet, in your
  //           browser.
  //         </a>
  //       </p>
  //     );
  //   }
  // }

  //   const connectWalletPressed = async () => {
  //     const walletResponse = await connectWallet();
  //     setStatus(walletResponse.status);
  //     setWallet(walletResponse.address);
  //   };

  return (
    <div className="mt-16 lg:mt-24">
      <div className="lg:grid grid-cols-1 lg:grid-cols-2 mx-2 ">
        <div className="cols-span-1 my-auto mx-auto">
          <div className="flex flex-col space-y-10 text-white mx-auto text-center lg:text-left">
            <h1 className="font-semibold text-4xl my-0">
              Receive testnet <br /> tokens for free
            </h1>
            <span className="text-sm font-semibold text-[#726DA6] w-60 mx-auto lg:ml-0">
              Connect you metamask wallet, mint DAI and WETH, approve the
              DeltaDex contract.
            </span>
          </div>
        </div>

        <div className="cols-span-1 space-y-10 mx-auto">
          <span className="text-white text-xl ">
            {/* Get free DeltaDex DAI and WETH tokens */}
          </span>
          <div className="grid grid-cols-2 ">
            <span className="mx-auto cols-span-1 my-auto text-white text-3xl">
              Step 1.
            </span>
            <button
              className="mx-auto cols-span-1 rounded-xl w-44 text-normal text-white text-center font-semibold bg-violet-500 hover:bg-violet-800"
              // onClick={connectWallet}
            >
              {true ? <span>Connect your wallet</span> : <span>Connected</span>}
            </button>
          </div>
          <div className="grid grid-cols-2 ">
            <span className="mx-auto cols-span-1 my-auto text-white text-3xl">
              Step 2.
            </span>
            <div className="mx-auto cols-span-1 rounded-xl w-44 py-2 px-3 text-normal text-black text-center font-normal bg-white">
              {walletAddress !== '' ? (
                String(walletAddress).substring(0, 6) +
                '...' +
                String(walletAddress).substring(38)
              ) : (
                <span>Check your address</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 ">
            <div className="cols-span-1 flex flex-col my-auto">
              <span className="mx-auto text-white text-3xl">Step 3.</span>
              {/* <span className="text-white text-normal font-base">
                  Mint 10000 DAI <br /> and 5 WETH
                </span> */}
            </div>
            <div className="mx-auto cols-span-1 flex flex-col space-y-6">
              <button className="rounded-xl py-2 px-3 w-44 text-normal text-white text-center font-semibold bg-violet-500 hover:bg-violet-800">
                <span className="">Mint 10000 DAI</span>
              </button>
              <button className="rounded-xl py-2 px-3 w-44 text-normal text-white text-center font-semibold bg-violet-500 hover:bg-violet-800">
                <span className="">Mint 5 WETH</span>
              </button>
            </div>
          </div>
        </div>
        <div className="h-40 lg:h-2" />
        {/* <div class="w-full max-w-xs">
          <form class="bg-slate shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Username
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
              <p class="text-red-500 text-xs italic">
                Please choose a password.
              </p>
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
              <a
                class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div> */}
      </div>
    </div>
  )
}

export default ReceiveTokens
