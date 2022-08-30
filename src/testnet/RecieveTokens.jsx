import { useEffect, useState } from "react";

import { connectWallet, getCurrentWalletConnected } from "./connectWallet";

const RecieveTokens = () => {
    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");
  
    useEffect(async () => {
      const { address, status } = await getCurrentWalletConnected();
  
      setWallet(address);
      setStatus(status);
  
      addWalletListener();
    }, []);
  
    function addWalletListener() {
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", (accounts) => {
          if (accounts.length > 0) {
            setWallet(accounts[0]);
            setStatus("👆🏽 Write a message in the text-field above.");
          } else {
            setWallet("");
            setStatus("🦊 Connect to Metamask using the top right button.");
          }
        });
      } else {
        setStatus(
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        );
      }
    }
  
    const connectWalletPressed = async () => {
      const walletResponse = await connectWallet();
      setStatus(walletResponse.status);
      setWallet(walletResponse.address);
    };


    return (
        <div className="bg-gradient-to-r from-slate-900 to-indigo-900 h-screen ">
            {/* <div className="max-w-6xl">
                <span>
                DeltaDex
                </span>
            </div> */}
            <div className="max-w-6xl max-h-screen mx-auto flex justify-between">
                <div class="flex-col flex  max-w-md ml-10 lg:ml-0 z-10">
                    <div class=" flex flex-col  text-white my-52">
                        <h1 class=" font-semibold text-4xl ">Receive testnet <br/> tokens for free</h1>
                        <p class="pr-3 text-sm max-w-sm">Lorem ipsum is placeholder text commonly used in the graphic, print,
                            and publishing industries for previewing layouts and visual mockups</p>
                    </div>
                </div>

                <div className="mx-auto mt-40">
                    <span className="text-white text-xl">Get free DeltaDex DAI and WETH tokens</span>
                    <div className="flex space-x-32 mr-10 lg:ml-0 mt-10">
                        <span className="my-auto text-white text-3xl w-max">Step 1.</span>
                        <div className="rounded-xl py-2 px-3 text-lg text-white text-center font-semibold bg-violet-500"
                            onClick={connectWallet}>
                            {walletAddress !== "Not connected" ? (
                                <span>Not connected</span>
                            ) : (
                                <span>Connected</span>
                            )}
                        </div>
                    </div>
                    <div className="flex space-x-32 mr-10 lg:ml-0 mt-10">
                        <span className="my-auto text-white text-3xl w-max">Step 2.</span>
                        <div className="rounded-xl py-2 px-3 text-lg text-black text-center font-normal bg-white">
                        {walletAddress !== "Not connected" ? (
                            String(walletAddress).substring(0, 6) +
                            "..." +
                            String(walletAddress).substring(38)
                        ) : (
                            <span>Connect Wallet</span>
                        )}
                        </div>
                    </div>
                    <span>

                    </span>
                    <div className="flex space-x-32 mr-10 lg:ml-0 mt-10">
                        <span className="my-auto text-white text-3xl w-max">Step 3.</span>
                        <div className="rounded-xl py-2 px-3 text-lg text-white text-center font-semibold bg-violet-500">
                            <span className="">Check your address</span>
                        </div>
                    </div>
                </div>

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
  );
};

export default RecieveTokens;
