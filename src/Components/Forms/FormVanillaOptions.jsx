import { useState } from "react";

import {
    sendForm,
    getCurrentPositions,
    startReplication,
  } from "../../utils/interact";


import ProfitChart from "../Charts/NewChart";
import Slider from "../Charts/Slider";
// import PriceChart from "../Charts/PriceChart";

import Creatable, { useCreatable } from "react-select/creatable";

// import CreatableSelect from 'react-select/creatable';


const TokenOptions = [
    { label: "DAI", value: "0x6B175474E89094C44Da98b954EedeAC495271d0F" },
    { label: "USDC", value: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
    { label: "USDT", value: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
    { label: "WETH", value: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" },
];

// const addrToToken = TokenOptions.map((el) => {})

const AddressToToken = {
    "0x6B175474E89094C44Da98b954EedeAC495271d0F": "DAI",
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": "USDC",
    "0xdAC17F958D2ee523a2206206994597C13D831ec7": "USDT",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2": "WETH",
}


const OptionDirections = [
    { label: "long", value: "long" },
    { label: "short", value: "short" },
]; 

const VanillaTypes = [
    {label: "call", value: "vanillaCall"},
    {label: "put", value: "vanillaPut"}
]

const AvailableModels = [
    { label: "Black-Scholes", value: "black-scholes" },
    { label: "Jump Diffusion", value: "jump-diffusion" },
    { label: "SABR model (coming soon)", value: "sabr" },
    { label: "Heston model (coming soon)", value: "heston" },
  ];


const Rform = () => {
    const [submit, setSubmit] = useState(false);

    const [addressToken1, setAddressToken1] = useState(TokenOptions[0].value);
    const [addressToken2, setAddressToken2] = useState(TokenOptions[TokenOptions.length-1].value);
    const [token1Balance, setToken1Balance] = useState("1");
    const [token2Balance, setToken2Balance] = useState("1");
    const [fees, setFees] = useState("");
    const [perDay, setPerDay] = useState("");
    const [OptionAmount, setOptionAmount] = useState(1);
    const [strike, setStrike] = useState(300);
    const [expiration, setExpiration] = useState(5);
    // const [OptionType, setOptionType] = useState(OptionTypes[0]);
    const [OptionDirection, setDirection] = useState(OptionDirections[0]);

    const [VanillaType, setVanillaType] = useState(VanillaTypes[0]);



    const [totalValueInvestedInLP, setTotalValueInvestedInLP] = useState(1000);

    const [showAdvancedSettings, setAdvanced] = useState(false);
  
    const [tagInputValue, setTagInputValue] = useState("");
    const [tagValue, setTagValue] = useState("");
  
    const [chosenModel, setModel] = useState(AvailableModels[0]);
  
    const [riskFree, setRiskFree] = useState("0");

    const [isNext, setNext] = useState(false);

    
    


    return (
        <>
        {console.log(AddressToToken[addressToken1])}
        {isNext ? (
        <div className="px-10 py-4 relative">
            <div className="flex justify-between">
                <div>
                <div className="flex flex-col">
                    <span className="-ml-5 text-medium text-xl">Add initial liquidity to trade underlying</span>
                    <span className="-ml-5 text-black text-normal mt-1">Please add the liquidity in <span className="font-bold">{AddressToToken[addressToken1]}</span> tokens</span>
                </div>
                <div className="relative h-9 rounded-xl mt-4 -ml-5">
                    <input type={'number'} step='any' placeholder='0.00' className="outline-0 w-28 h-10 text-xl bg-gray-100 text-center absolute left-0 top-1 rounded-2xl"
                            onChange={(value) => {setToken1Balance(value.target.value); console.log(value.target.value)}}/>
                    <span className="absolute ml-32 text-xl top-3">{`${AddressToToken[addressToken1]}`}</span>
                </div>
                    <div className="flex mt-4 w-8/12 space-x-20 justify-between -ml-5">
                        <Slider style='mt-2 w-40' sliderType={'feesToHedgers'} onChangeToggle={setFees}/>
                        <Slider style="mt-2 w-40" sliderType={'deltaHedgesPerDay'} onChangeToggle={setPerDay}/>
                    </div>
                </div>
                <div className="flex flex-col">
                    <ProfitChart params={{S:1000,K:1000,T:0.5,r:0.1,sigma:0.5}} OptionDirection={OptionDirection} OptionType={VanillaType}/>
                    <label for="default-toggle" className="mt-5 mr-32 inline-flex relative items-center cursor-pointer">
                        <input
                        type="checkbox"
                        value=""
                        id="default-toggle"
                        className="sr-only peer"
                        onClick={() => {
                            setAdvanced(!showAdvancedSettings);
                        }}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-xl text-gray-900 ">
                            Advanced settings
                        </span>
                    </label>
                </div>
            </div>
            <div className="flex justify-between -mt-10 mb-10">
                {showAdvancedSettings ? 
                (<div className="flex flex-col"><span className="-ml-5 w-80 text-xl">Choose the model</span>
                    <Creatable
                        className="-ml-5 mt-2"
                        options={AvailableModels}
                        defaultValue={AvailableModels[0]}
                        onChange={(value) => {
                        if (value === null) return
                            setModel(value)}}
                    />
                    <div className="-ml-5 mt-3 flex flex-col">
                        <input type="number" step="any" className="border h-10" placeholder="123"/>
                        <input type="number" step="any" className="border h-10 mt-3" placeholder="123"/>

                    </div>
                </div>
                )
                : (<div></div>)}
                
            </div>
        </div>
            ) : (
            <div className="px-10 py-4 relative">
                <div className="flex justify-between mb-2 mt-0 space-x-10">
                    <div className="flex flex-col">
                        <div className="">
                            <span className="-ml-5 left-0 ">Choose option type</span>
                            <Creatable
                                className="-ml-5 mt-2"
                                options={VanillaTypes}
                                defaultValue={VanillaTypes[0]}
                                onChange={(value) => {
                                    if (value === null) return
                                    setVanillaType(value)}}
                            />
                        </div>
                        <div className="mt-5">
                            <span className="-ml-5 left-0">Direction of the option</span>
                            <Creatable
                                className="-ml-5 mt-2"
                                options={OptionDirections}
                                defaultValue={OptionDirections[0]}
                                onChange={(value) => {
                                    if (value === null) return
                                    setDirection(value)}}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <Slider style='mt-2' sliderType={'strike'} onChangeToggle={setStrike}/>
                        <Slider style="mt-20" sliderType={'expiry'} onChangeToggle={setStrike}/>
                    </div>
                    <ProfitChart params={{S:1000,K:1000,T:0.5,r:0.1,sigma:0.5}} OptionDirection={OptionDirection} OptionType={VanillaType}/>
                </div>

                <span className="absolute -ml-5 text-medium text-xl">Specify the token pair by choosing tokens</span>

                <div className="flex justify-between w-5/12 space-x-10">
                    <Creatable
                        className="-ml-5 mt-14 w-40 z-10"
                        options={TokenOptions}
                        defaultValue={TokenOptions[0]}
                        onChange={(value) => {
                            if (value === null) return
                            setAddressToken1(value)}}
                        />
                    <Creatable
                        className="mt-14 w-40 z-10 "
                        options={TokenOptions}
                        defaultValue={TokenOptions[TokenOptions.length-1]}
                        onChange={(value) => {
                            if (value === null) return
                            setAddressToken2(value)}}
                        />
                </div>
                <div className="flex w-8/12 justify-between mb-10 space-x-16">
                        <Slider style="mt-10 -ml-5 w-40" sliderType={'OptionAmount'} onChangeToggle={setOptionAmount}/>
                        <Slider style="mt-16   w-40" sliderType={'riskFree'} onChangeToggle={setRiskFree}/>
                        <button className=" mt-20 bg-indigo-400 px-10  rounded text-white text-center hover:bg-indigo-300"
                                onClick={()=> setNext(!isNext)}> Next</button>
                </div>
                {/* <span className="-ml-5 text-medium text-xl">Specify the token pair by choosing tokens</span> */}
                <div>
                </div>
            </div>)}
    </>
    )
}

export default Rform;