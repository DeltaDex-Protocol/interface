import { useState } from "react";

import {
    sendForm,
    getCurrentPositions,
    startReplication,
  } from "../../utils/interact";


import ProfitChart from "../Charts/NewChart";
import Slider from "../Charts/Slider";
import PriceChart from "../Charts/PriceChart";


const TokenOptions = [
    { label: "DAI", value: "0x6B175474E89094C44Da98b954EedeAC495271d0F" },
    { label: "USDC", value: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
    { label: "USDT", value: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
    { label: "WETH", value: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" },
];

const OptionDirections = [
    { label: "long", value: "long" },
    { label: "short", value: "short" },
]; 

const AvailableModels = [
    { label: "Black-Scholes", value: "black-scholes" },
    { label: "Jump Diffusion", value: "jump-diffusion" },
    { label: "SABR model (coming soon)", value: "sabr" },
    { label: "Heston model (coming soon)", value: "heston" },
  ];


const Rform = () => {
    const [submit, setSubmit] = useState(false);

    const [addressToken1, setAddressToken1] = useState("");
    const [addressToken2, setAddressToken2] = useState("");
    const [token1Balance, setToken1Balance] = useState("1");
    const [token2Balance, setToken2Balance] = useState("1");
    const [fees, setFees] = useState("");
    const [perDay, setPerDay] = useState("");
    const [OptionAmount, setOptionAmount] = useState(1);
    const [strike, setStrike] = useState(300);
    const [expiration, setExpiration] = useState(5);
    // const [OptionType, setOptionType] = useState(OptionTypes[0]);
    const [OptionDirection, setDirection] = useState(OptionDirections[0]);


    const [totalValueInvestedInLP, setTotalValueInvestedInLP] = useState(1000);

    const [showAdvancedSettings, setAdvanced] = useState(false);
  
    const [tagInputValue, setTagInputValue] = useState("");
    const [tagValue, setTagValue] = useState("");
  
    const [chosenModel, setModel] = useState(AvailableModels[0]);
  
    const [riskFree, setRiskFree] = useState("0");


    return (
        <div className="w-5xl">
        123
        </div>
    )
}

export default Rform;