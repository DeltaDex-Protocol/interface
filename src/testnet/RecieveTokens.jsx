import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { connectWallet, getCurrentWalletConnected } from "./connectWallet";
import { MintTokens } from './MintTokens.js';
import { ApproveTokens } from "./ApproveTokens";

import ReactLoading from 'react-loading';


const RecieveTokens = () => {
    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");

    const [isDaiMinted, setDaiMinted] = useState(false);
    const [isWethMinted, setWethMinted] = useState(false);

    const [isDaiApproved, setDaiApproved] = useState(false);
    const [isWethApproved, setWethApproved] = useState(false);

  
    useEffect(() => {
        getCurrentWalletConnected()
            .then((res) => {
                const { address, status } = res;
                setWallet(address);
                setStatus(status);
                console.log(address);

            });

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

    const navigate = useNavigate();
    const handleClick = () => {
        console.log("link");
        navigate("www.google.com");
    }


  return (
    <div className="bg-gradient-to-r from-slate-900 to-indigo-900 min-h-screen min-w-full">
        {/* <div className="max-w-6xl w-full ml-24 text-white py-10">
            <span className="text-2xl">
                DeltaDex
            </span>
        </div> */}
        <div className="max-w-6xl mx-auto">
            <div className="flex-col lg:flex-row lg:flex justify-between  py-24  ">
                <div class="flex flex-col  z-10 ">
                    <div class="flex flex-col text-center text-white my-auto w-96 mx-auto">
                        <h1 class="font-semibold text-4xl ">Receive DeltaDex testnet tokens</h1>
                        <p class="pr-3 text-xl ">
                            Connect you metamask wallet, mint DAI and WETH, approve the
                            DeltaDex contract.
                        </p>
                    </div>
                </div>

                <div className="my-auto flex flex-col space-y-8 mx-auto">
                    {/* <span className="text-white text-2xl">Get free DeltaDex DAI and WETH tokens</span> */}
                    <div className="flex space-x-32 mr-10 lg:ml-0 mt-10 mx-auto">
                        <span className="my-auto text-white text-3xl w-36">Step 1.</span>
                        {walletAddress == "" ? (
                                <button className=" rounded-xl w-52 py-2 px-3 text-normal text-white text-center font-semibold bg-violet-500 hover:bg-violet-800"
                                onClick={connectWallet}>
                                <span>Connect your wallet</span>
                            </button>
                            ) : (
                                <button className=" rounded-xl w-52 py-2 px-3 text-normal text-white text-center font-semibold bg-emerald-500">
                                    <span>Connected</span>
                            </button>
                            )}
                    </div>
                    <div className="flex space-x-32 mr-10 lg:ml-0 mx-auto">
                        <span className="my-auto text-white text-3xl w-36 ">Step 2.</span>
                        <div className="rounded-xl w-52 py-2 px-3 text-normal text-black text-center font-normal bg-white">
                        {walletAddress !== "" ? (
                            "Addr: " +
                            String(walletAddress).substring(0, 6) +
                            "..." +
                            String(walletAddress).substring(38)
                        ) : (
                            <span>Check your address</span>
                        )}
                        </div>
                    </div>
                    <div className="flex mr-10 lg:ml-0 mx-auto">
                        <div className="flex space-x-32">
                            <div className="flex flex-col w-36 ">
                                <span className=" text-white text-3xl w-36">Step 3.</span>
                                <span className="text-white text-normal font-base mt-4 w-36">
                                    Mint 9999 DAI <br/> and 5 WETH
                                </span>
                            </div>
                            <div className="flex flex-col space-y-6">
                                {isDaiMinted ? (
                                    <button className="rounded-xl py-2 px-3 w-52 text-normal text-white text-center font-semibold bg-emerald-500 hover:bg-emerald-500">
                                        <span className="">DAI minted</span>
                                    </button>
                                ) : (
                                    <div className="flex space-x-4 relative">
                                        {isDaiMinted === null ? <ReactLoading type={'spin'} color="#fff" width={20} className='absolute top-3 -left-4'/> : (<></>)}
                                            <button className="rounded-xl py-2 px-3 w-52 text-normal text-white text-center font-semibold bg-violet-500 hover:bg-violet-800"
                                                onClick={() => {
                                                    setDaiMinted(null);
                                                    MintTokens("DAI").then((res) => setDaiMinted(res.success));
                                                }}>
                                            <span className="">Mint 10,000 DAI</span>
                                        </button>
                                    </div>
                                )}
                                {isWethMinted ? (
                                    <button className="rounded-xl py-2 px-3 w-52 text-normal text-white text-center font-semibold bg-emerald-500 hover:bg-emerald-500">
                                        <span className="">WETH minted</span>
                                    </button>
                                ) : (
                                    <div className="flex space-x-4 relative">
                                    {isWethMinted === null ? <ReactLoading type={'spin'} color="#fff" width={20} className='absolute top-3 -left-4'/> : (<></>)}
                                        <button className="rounded-xl py-2 px-3 w-52 text-normal text-white text-center font-semibold bg-violet-500 hover:bg-violet-800"
                                            onClick={() => {
                                                setWethMinted(null);
                                                MintTokens("WETH").then((res) => setWethMinted(res.success));
                                            }}>
                                        <span className="">Mint 5 WETH</span>
                                    </button>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex mr-10 lg:ml-0 mx-auto">
                        <div className="flex space-x-32">
                            <div className="flex flex-col w-36">
                                <span className=" text-white text-3xl">Step 4.</span>
                                <span className="text-white text-normal font-base mt-4">
                                    Let DeltaDex core contract use your tokens
                                </span>
                            </div>
                            <div className="flex flex-col space-y-6">
                                {isDaiApproved ? (
                                        <button className="rounded-xl py-2 px-3 w-52 text-normal text-white text-center font-semibold bg-emerald-500 hover:bg-emerald-500">
                                            <span className="">DAI approved</span>
                                        </button>
                                    ) : (
                                        <div className="flex space-x-4 relative">
                                            {isDaiApproved === null ? <ReactLoading type={'spin'} color="#fff" width={20} className='absolute top-3 -left-4'/> : (<></>)}
                                            <button className="rounded-xl py-2 px-3 w-52 text-normal text-white text-center font-semibold bg-violet-500 hover:bg-violet-800"
                                                onClick={() => {
                                                    setDaiApproved(null);
                                                    ApproveTokens("DAI").then((res) => setDaiApproved(res.success));
                                                    }}>
                                                <span className="">Approve 10,000 DAI</span>
                                            </button>
                                        </div>
                                )}
                                {isWethApproved ? (
                                        <button className="rounded-xl py-2 px-3 w-52 text-normal text-white text-center font-semibold bg-emerald-500 hover:bg-emerald-500">
                                            <span className="">WETH approved</span>
                                        </button>
                                    ) : (
                                        <div className="flex space-x-4 relative">
                                            {isWethApproved === null ? <ReactLoading type={'spin'} color="#fff" width={20} className='absolute top-3 -left-4'/> : (<></>)}
                                            <button className="rounded-xl py-2 px-3 w-52 text-normal text-white text-center font-semibold bg-violet-500 hover:bg-violet-800"
                                                onClick={() => {
                                                    setWethApproved(null);
                                                    ApproveTokens("WETH").then((res) => setWethApproved(res.success));
                                                    }}>
                                                <span className="">Approve 5 WETH</span>
                                            </button>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-32 mr-10 lg:ml-0 mt-10 mx-auto">
                    <div className="flex flex-col w-36 ">
                                <span className=" text-white text-3xl w-36">Step 5.</span>
                                <span className="text-white text-normal font-base mt-4 w-36">
                                    Return to the DeltaDex interface
                                </span>
                            </div>
                        
                        <button className=" rounded-xl w-52 py-2 px-3 text-normal text-white text-center font-semibold bg-violet-500 hover:bg-violet-800"
                        
                        onClick={() =>
                            (window.location.href =
                              "/app/")
                          }>
                        <span>DeltaDex</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default RecieveTokens;
