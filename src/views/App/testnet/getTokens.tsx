import { useEffect, useState, useContext } from 'react'
import ReactLoading from 'react-loading'
import { WalletContext } from '@viaprotocol/web3-wallets'
import { ApproveTokens } from '@/api/testnet/approve-tokens'
import { MintTokens } from '@/api/testnet/mint-tokens'

import { DEFAULT_CHAIN_ID } from '@/data/global-constants'

const GetTokens = () => {
  const [status, setStatus] = useState('')

  const [isDaiMinted, setDaiMinted] = useState(false)
  const [isWethMinted, setWethMinted] = useState(false)

  const [isDaiApproved, setDaiApproved] = useState(false)
  const [isWethApproved, setWethApproved] = useState(false)

  const { connect, isConnected, address } = useContext(WalletContext)

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
      <div className="lg:grid grid-cols-1 lg:grid-cols-2 mx-2">
        <div className="cols-span-1 my-auto mx-auto">
          <div className="flex flex-col space-y-4 text-white mx-auto text-center lg:text-left">
            <h1 className="font-semibold text-4xl lg:text-5xl my-0">
              Receive testnet <br /> tokens for free
            </h1>
            <span className="lg:text-lg font-semibold text-[#726DA6] w-60 lg:w-80 mx-auto lg:ml-0">
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
            <div className="cols-span-1 w-36 mx-auto flex flex-col">
              <span className=" my-auto text-white text-3xl">Step 1.</span>
              <span className="font-semibold text-[#726DA6] mt-4">
                Connect you wallet
              </span>
            </div>
            <div className="my-auto cols-span-1">
              {!isConnected ? (
                <button
                  onClick={() =>
                    connect({ name: 'MetaMask', chainId: DEFAULT_CHAIN_ID })
                  }
                  className="mx-auto rounded-xl w-44 py-2 text-normal text-white text-center font-semibold bg-violet-500 hover:bg-violet-800"
                >
                  <span>Connect your wallet</span>
                </button>
              ) : (
                <button className="mx-auto rounded-xl w-44 py-2 text-normal text-white text-center font-semibold bg-emerald-500">
                  <span>Connected</span>
                </button>
              )}
            </div>
          </div>
          {/* <div className="grid grid-cols-2 ">
            <span className="mx-auto cols-span-1 my-auto text-white text-3xl">
              Step 2.
            </span>
            <div className="mx-auto cols-span-1 rounded-xl w-44 py-2 px-3 text-normal text-black text-center font-normal bg-white">
              {isConnected ? (
                shortenAddress(address)
              ) : (
                <span>Check your address</span>
              )}
            </div>
          </div> */}

          <div className="grid grid-cols-2 mx-auto">
            <div className="col-span-1 flex flex-col w-36 mx-auto">
              <span className="text-white text-3xl my-auto">Step 2.</span>
              <span className="font-semibold text-[#726DA6] mt-4">
                Mint 10000 DAI <br /> and 5 WETH
              </span>
            </div>
            <div className="col-span-1 mx-auto flex flex-col space-y-6">
              {isDaiMinted ? (
                <button className="rounded-xl py-2 w-44 text-normal text-white text-center font-semibold bg-emerald-500 hover:bg-emerald-500">
                  <span className="">DAI minted</span>
                </button>
              ) : (
                <div className="flex space-x-4 relative">
                  {isDaiMinted === null ? (
                    // @ts-ignore
                    <ReactLoading
                      type={'spin'}
                      color="#fff"
                      width={20}
                      className="absolute top-3 -left-4"
                    />
                  ) : (
                    <></>
                  )}
                  <button
                    className="rounded-xl py-2 w-44 text-normal text-white text-center font-semibold bg-violet-500 hover:bg-violet-800"
                    onClick={() => {
                      setDaiMinted(null)
                      MintTokens('DAI').then((res) => setDaiMinted(res.success))
                    }}
                  >
                    <span className="">Mint 10,000 DAI</span>
                  </button>
                </div>
              )}
              {isWethMinted ? (
                <button className="rounded-xl py-2 w-44 text-normal text-white text-center font-semibold bg-emerald-500 hover:bg-emerald-500">
                  <span className="">WETH minted</span>
                </button>
              ) : (
                <div className="flex space-x-4 relative">
                  {isWethMinted === null ? (
                    // @ts-ignore
                    <ReactLoading
                      type={'spin'}
                      color="#fff"
                      width={20}
                      className="absolute top-3 -left-4"
                    />
                  ) : (
                    <></>
                  )}
                  <button
                    className="rounded-xl py-2 w-44 text-normal text-white text-center font-semibold bg-violet-500 hover:bg-violet-800"
                    onClick={() => {
                      setWethMinted(null)
                      MintTokens('WETH').then((res) =>
                        setWethMinted(res.success),
                      )
                    }}
                  >
                    <span className="">Mint 5 WETH</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mx-auto grid grid-cols-2 ">
            <div className="cols-span-1 flex flex-col mx-auto w-36">
              <span className="text-white text-3xl my-auto">Step 3.</span>
              <span className="font-semibold text-[#726DA6] mt-4">
                Let DeltaDex core contract use your tokens
              </span>
            </div>
            <div className="cols-span-1 flex flex-col space-y-6 ">
              {isDaiApproved ? (
                <button className="mx-auto rounded-xl py-2  w-44 text-normal text-white text-center font-semibold bg-emerald-500 hover:bg-emerald-500">
                  <span className="">DAI approved</span>
                </button>
              ) : (
                <div className="flex space-x-4 relative">
                  {isDaiApproved === null ? (
                    // @ts-ignore
                    <ReactLoading
                      type={'spin'}
                      color="#fff"
                      width={20}
                      className="absolute top-3 -left-4"
                    />
                  ) : (
                    <></>
                  )}
                  <button
                    className="mx-auto rounded-xl py-2 w-44 text-normal text-white text-center font-semibold bg-violet-500 hover:bg-violet-800"
                    onClick={() => {
                      setDaiApproved(null)
                      ApproveTokens('DAI').then((res) =>
                        setDaiApproved(res.success),
                      )
                    }}
                  >
                    <span className="">Approve 10,000 DAI</span>
                  </button>
                </div>
              )}
              {isWethApproved ? (
                <button className="mx-auto rounded-xl py-2 w-44 text-normal text-white text-center font-semibold bg-emerald-500 hover:bg-emerald-500">
                  <span className="">WETH approved</span>
                </button>
              ) : (
                <div className="flex space-x-4 relative">
                  {isWethApproved === null ? (
                    // @ts-ignore
                    <ReactLoading
                      type={'spin'}
                      color="#fff"
                      width={20}
                      className="absolute top-3 -left-4"
                    />
                  ) : (
                    <></>
                  )}
                  <button
                    className="mx-auto rounded-xl py-2 w-44 text-normal text-white text-center font-semibold bg-violet-500 hover:bg-violet-800"
                    onClick={() => {
                      setWethApproved(null)
                      ApproveTokens('WETH').then((res) =>
                        setWethApproved(res.success),
                      )
                    }}
                  >
                    <span className="">Approve 5 WETH</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="cols-span-1 flex flex-col mx-auto">
              <span className="text-white text-3xl ">Step 4.</span>
              <span className="font-semibold text-[#726DA6] mt-4 w-36">
                Return to the DeltaDex interface
              </span>
            </div>

            <div className="cols-span-1 my-auto mx-auto">
              <button
                className="mx-auto rounded-xl w-44 py-2 text-normal text-white text-center font-semibold bg-violet-500 hover:bg-violet-800"
                onClick={() => (window.location.href = '/app/vanilla-options')}
              >
                <span>Return to DeltaDex</span>
              </button>
            </div>
          </div>
        </div>

        <div className="h-20" />
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

export default GetTokens
