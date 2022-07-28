import { useState } from "react";

// import other component
import FormInput from "../../Forms/FormInput/FormInput";
import Titles from "../../Titles/Titles";

// import other pkg
import { Form, Row, Col, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { object, string, date } from "yup";
import PropTypes from "prop-types";

// import utils
import { getStorage } from "../../../utils/storage";
import { mintNFT, getCurrentPositions } from "../../../utils/interact";

import Creatable, { useCreatable } from "react-select/creatable";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
// import Chart from "../../Charts/Chart.jsx";
import ProfitChart from "../../Charts/NewChart.jsx";
import Slider from "../../Charts/Slider.jsx";

import PriceChart from "../../Charts/PriceChart.jsx";



const TokenOptions = [
  { label: "DAI", value: "0x6B175474E89094C44Da98b954EedeAC495271d0F" },
  { label: "USDC", value: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
  { label: "USDT", value: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
  { label: "WETH", value: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" },
];

const OptionTypes = [
  {label: "Vanilla call", value: "vanillaCall"},
  {label: "Vanilla put", value: "vanillaPut"},
  {label: "Curved call", value: "curvedCall"},
  {label: "Curved put", value: "curvedPut"}
];

const OptionDirections = [
  {label: "long", value: "long"},
  {label: "short", value: "short"}
];


const ReplicationForm = ({ data }) => {

  const [submit, setSubmit] = useState(false);

  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [addressToken0, setaddressToken0] = useState("");
  const [addressToken1, setaddressToken1] = useState("");
  const [token0Balance, setToken0Balance] = useState("");
  const [fees, setFees] = useState("");
  const [perDay, setPerDay] = useState("");

  const [strike, setStrike] = useState(300);
  const [expiration, setExpiration] = useState(5);
  const [riskFree, setRiskFree] = useState("");
  const [volatility, setVolatility] = useState("");
  const [meanReversion, setMeanReversion] = useState("");
  const [jumpDeviation, setJumpDeviation] = useState("");
  const [jumpIntensity, setJumpIntensity] = useState("");

  const [OptionType, setOptionType] = useState(OptionTypes[0]);
  const [OptionDirection, setDirection] = useState(OptionDirections[0]);
  const [totalValue, setTotalValue] = useState(1000);



  const sendForm = async () => {
    console.log([
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
      jumpIntensity,
    ]);
    const { success, status } = await mintNFT(
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
    );
  };

  const [tagInputValue, setTagInputValue] = useState("");
  const [tagValue, setTagValue] = useState("");



  const handleKeyDown = (event) => {
    if (!tagInputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setTagValue([...tagValue, createOption(tagInputValue)]);
        setTagInputValue("");

        event.preventDefault();
        break;

      default:
        break;
    }
  };

  const createOption = (label) => ({
    label,
    value: label,
  });

  const handleInputChange = (value) => {
    setTagInputValue(value);
  };

  return (
    <>


      <Titles className=""
        title="Replicate Your option"
        text="Choose the parameters of the option you'd like to replicate"
      />


      <Form className="mt-4">
        <Row className="mt-2">

          <Col className="">
            <Row className="">
              <Col>
                <p
                  xs={12}
                  lg
                  as={Col}
                  inpClass="py-2"
                  className="p-0"
                  name="amountOfToken0"
                  type="text"
                  controlId=""
                  >
                    Option type
                  </p>
                <Creatable
                  options={OptionTypes}
                  isClearable
                  xs={12}
                  lg
                  as={Col}
                  inpClass="py-2"
                  className="p-0 z-10"
                  name="amountOfToken0"
                  type="text"
                  controlId=""
                  placeholder="Choose_type"
                  defaultValue={OptionTypes[0]}
                  size="sm"
                  onKeyDown={handleKeyDown}
                  onChange={(value) => {
                    if (value === null) return;
                    setOptionType(value);
                    console.log(OptionType);
                  }}
                  />
              </Col>
              <Col>
                <Col className="p-0">
                <p
                  xs={12}
                  lg
                  as={Col}
                  inpClass="py-2"
                  className="p-0"
                  name="amountOfToken0"
                  type="text"
                  controlId=""
                  >
                    Direction
                </p>
                <Creatable
                  options={OptionDirections}
                  isClearable
                  xs={12}
                  lg
                  as={Col}
                  inpClass="py-2"
                  className="p-0 z-10"
                  name="amountOfToken0"
                  type="text"
                  controlId=""
                  text=""
                  placeholder="long/short"
                  defaultValue={OptionDirections[0]}
                  size="sm"
                  onKeyDown={handleKeyDown}
                  onChange={(value) => {
                    if (value === null) return;
                    setDirection(value);
                    console.log(value.value);
                  }}
                />
                </Col>
              </Col>
            </Row>
              <Row className="mt-2">
                <Col>

                <Slider sliderType="strike" onChangeToggle = {setStrike}/>
                </Col>
                <Col>
                  <Slider sliderType="expiry" onChangeToggle = {setExpiration}/>
                </Col>
              </Row>

              {OptionType.value === ("curvedCall") && <Row>
                <Col>
                <Slider sliderType = "totalValue" onChangeToggle={setTotalValue}/>
                </Col>
              </Row>}
              {OptionType.value === ("curvedPut") && <Row>
                <Col>
                <Slider sliderType = "totalValue" onChangeToggle={setTotalValue}/>
                </Col>
              </Row>}
              <Row>
              <span className="my-3 font-bold text-lg">Specify the pair by choosing tokens</span>
              </Row>
              <Row className=''>
              <Col>
                <p
                  xs={12}
                  lg
                  as={Col}
                  inpClass="py-2"
                  className="p-0"
                  name="amountOfToken0"
                  type="text"
                  controlId=""
                  >
                  Token 1
                </p>
                <Creatable
                  options={TokenOptions}
                  isClearable
                  xs={12}
                  lg
                  as={Col}
                  inpClass="py-2"
                  className="p-0 z-10"
                  name="amountOfToken0"
                  type="text"
                  controlId=""
                  text="Amount of token 0"
                  placeholder="Address Token 1"
                  size="sm"
                  onKeyDown={handleKeyDown}
                  onChange={(value) => {
                    setaddressToken0(value.value);
                    console.log(value.value);
                  }}
                />
              </Col>
          
              <Col>
                <p
                  xs={12}
                  lg
                  as={Col}
                  inpClass="py-2"
                  className="p-0"
                  name="amountOfToken0"
                  type="text"
                  controlId=""
                  text="Amount of token 0"
                  >
                  Token 2
                </p>
                <Creatable
                  options={TokenOptions}
                  isClearable
                  xs={12}
                  lg
                  as={Col}
                  inpClass="py-2"
                  className="p-0 z-10"
                  name="amountOfToken0"
                  type="text"
                  controlId=""
                  text="Amount of token 0"
                  placeholder="Address Token 2"
                  size="sm"
                  onKeyDown={handleKeyDown}
                  onChange={(value) => {
                    setaddressToken1(value.value);
                    console.log(value.value);
                  }}
                />
              </Col>
          </Row>
          <Row className="mt-2">
                <Col>
                  <Slider sliderType="amountOfToken2" onChangeToggle = {setToken0Balance}/>
                </Col>
                <Col>
                  <Slider sliderType="deltaHedgesPerDay" onChangeToggle = {setPerDay}/>
                </Col>
          </Row>
          <Row className="mt-2">
                <Col>
                  <Slider sliderType="feesToHedgers" onChangeToggle = {setFees}/>
                </Col>
                <Col>
                  <Slider sliderType="riskFree" onChangeToggle = {setRiskFree}/>
                </Col>
          </Row>    

          </Col>

            <Col className="">
            <Row>
            <Col className="flex justify-center">
              <ProfitChart 
                OptionType={OptionType} 
                OptionDirection={OptionDirection} 
                params={{S: 1000, K: strike, T: expiration, r:0.01, sigma:0.8, TV0: totalValue}}
                className="" />
            </Col>
            </Row>
            <Row>
            <Col className="flex justify-center">
                  <PriceChart data={data} className=""/>
            </Col>
            {/*<Col xs={1}>2
            </Col>*/}
            </Row>
            </Col>
        </Row>


        <Row className="mt-3 mt-lg-4 px-3">
          {/*<FormInput
            xs={12}
            lg
            as={Col}
            inpClass="py-2"
            className="p-0"
            name="amountOfToken0"
            type="text"
            controlId=""
            text="Amount of token 0"
            placeholder="uint256"
            size="sm"
            onChange={(event) => setToken0Balance(event.target.value)}
          />*/}
        </Row>
        {/*<Row className="mt-3 px-3">
          <FormInput
            xs={12}
            lg
            as={Col}
            inpClass="py-2"
            className="p-0  mt-3 mt-lg-0"
            name="fees"
            type="text"
            controlId=""
            text="Fees you agree to split between your position hedgers"
            size="sm"
            placeholder="uint256"
            onChange={(event) => setFees(event.target.value)}
          />
        </Row>*/}
        {/*<Row className="mt-3 px-3">*/}
{/*          <FormInput
            xs={12}
            lg
            as={Col}
            inpClass="py-2"
            className="p-0"
            name="hedgePerDay"
            type="text"
            controlId=""
            text="Number of delta hedges per day"
            placeholder="uint"
            size="sm"
            successMsg="done"
            onChange={(event) => setPerDay(event.target.value)}
          />*/}
        {/*</Row>*/}

        {/*<Row className="mt-3 px-3">

          <FormInput
            xs={12}
            lg
            as={Col}
            inpClass="py-2"
            className="p-0  mt-4 mt-lg-3"
            name="riskFreeRate"
            type="text"
            controlId=""
            text="Risk Free Rate"
            placeholder="uint256"
            size="sm"
            successMsg="done"
            onChange={(event) => setRiskFree(event.target.value)}
          />
        </Row>*/}
        <p className="mt-3 px-1 fw-bold">
          Choose the parameters of Jump Diffusion Model:
        </p>
        <Row className="mt-3 px-3">
          <FormInput
            xs={12}
            lg
            as={Col}
            inpClass="py-2"
            className="p-0"
            name="sigma"
            type="text"
            controlId=""
            text="Volatility (sigma)"
            placeholder="uint256"
            size="sm"
            successMsg="done"
            onChange={(event) => setVolatility(event.target.value)}
          />
          <FormInput
            xs={12}
            lg
            as={Col}
            inpClass="py-2"
            className="p-0 ms-lg-5 mt-0 mt-lg-0"
            name="intensityOfJump"
            type="text"
            controlId=""
            text="Intensity Of Jump (lam)"
            placeholder="uint256"
            size="sm"
            successMsg="done"
            onChange={(event) => setJumpIntensity(event.target.value)}
          />
        </Row>
        <Row className="mt-3 px-3">
          <FormInput
            xs={12}
            lg
            as={Col}
            inpClass="py-2"
            className="p-0"
            name="meanRateOfJump"
            type="text"
            controlId=""
            text="Mean of Merton's Jump size (m)"
            placeholder="uint256"
            size="sm"
            successMsg="done"
            onChange={(event) => setMeanReversion(event.target.value)}
          />
          <FormInput
            xs={12}
            lg
            as={Col}
            inpClass="py-2"
            className="p-0 ms-lg-5 mt-4 mt-lg-0"
            name="stdOfJump"
            type="text"
            controlId=""
            text="Standart Deviation of Jump size (v)"
            placeholder="uint256"
            size="sm"
            successMsg="done"
            onChange={(event) => setJumpDeviation(event.target.value)}
          />
        </Row>

        <Button
          variant="primary"
          className="mt-5 py-2 px-40"
          onClick={sendForm}
        >
          Start replication
        </Button>
      </Form>
    </>
  );
};

export default ReplicationForm;
