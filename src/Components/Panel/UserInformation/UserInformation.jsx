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




const UserInformation = ({
  data
}) => {
  const [submit, setSubmit] = useState(false);

  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [addressToken0, setaddressToken0] = useState("");
  const [addressToken1, setaddressToken1] = useState("");
  const [token0Balance, setToken0Balance] = useState("");
  const [fees, setFees] = useState("");
  const [perDay, setPerDay] = useState("");

  const [strike, setStrike] = useState("");
  const [expiration, setExpiration] = useState("");
  const [riskFree, setRiskFree] = useState("");
  const [volatility, setVolatility] = useState("");
  const [meanReversion, setMeanReversion] = useState("");
  const [jumpDeviation, setJumpDeviation] = useState("");
  const [jumpIntensity, setJumpIntensity] = useState("");

  // console.log(data);

  // const a = getCurrentPositions();

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
        
              {/*<TradingViewWidget
                symbol="BINANCE:ETHUSDT"
                locale="en"
                width={700}
                height= {300}
                range={"6m"}
                isTransparent={false}
                autosize= {false}
                largeChartUrl=""
                hide_legend={true}
                hide_top_toolbar={true}
                hide_side_toolbar={true}
                toolbar_bg={false}
                style={3}
                details={false}
                control_bar={false}
                rightPriceScale={false}
              />*/}
      {console.log(data)}
      {/*{data.length > 0 && (<Chart data={data}/>)}*/}

      {/*{Chart(data)}*/}
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
                    {" "}
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
                  size="sm"
                  onKeyDown={handleKeyDown}
                  onChange={(value) => {
                    setaddressToken0(value.value);
                    console.log(value.value);
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
                    {" "}
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
                  size="sm"
                  onKeyDown={handleKeyDown}
                  onChange={(value) => {
                    setaddressToken0(value.value);
                    console.log(value.value);
                  }}
                />
                </Col>
              </Col>
            </Row>
              <Row className="mt-2">
                <Col>

                <Slider sliderType="strike"/>
                </Col>
                <Col>
                  <Slider sliderType="expiry"/>
                </Col>
              </Row>
              <Row>
              <span className="my-3 font-bold text-lg">Specify the pair by choosing tokens pair</span>
              </Row>

              <Row>
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
              {" "}
              Token 1
            </p>
          <Creatable
            options={TokenOptions}
            isClearable
            xs={12}
            lg
            as={Col}
            inpClass="py-2"
            className="p-0"
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
            {" "}
            Token 2
          </p>
          <Creatable
            options={TokenOptions}
            isClearable
            xs={12}
            lg
            as={Col}
            inpClass="py-2"
            className="p-0"
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
          </Col>
            <Col>
              <ProfitChart className="flex justify-end" />
            </Col>
        </Row>


        {/*<Row className="mt-3 mt-lg-4 px-3">
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
            {" "}
            Token 1
          </p>
          <Creatable
            options={TokenOptions}
            isClearable
            xs={12}
            lg
            as={Col}
            inpClass="py-2"
            className="p-0"
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
          </Row>

        <Row className="mt-3 mt-lg-4 px-3">
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
            {" "}
            Token 2
          </p>
          <Creatable
            options={TokenOptions}
            isClearable
            xs={12}
            lg
            as={Col}
            inpClass="py-2"
            className="p-0"
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
        </Row>*/}

        <Row className="mt-3 mt-lg-4 px-3">
          <FormInput
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
          />
        </Row>
        <Row className="mt-3 px-3">
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
        </Row>
        <Row className="mt-3 px-3">
          <FormInput
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
          />
{/*          <FormInput
            xs={12}
            lg
            as={Col}
            inpClass="py-2"
            className="p-0 ms-lg-5 mt-4 mt-lg-3"
            name="strike"
            type="text"
            controlId=""
            text="Strike Price"
            placeholder="uint256"
            size="sm"
            successMsg="done"
            onChange={(event) => setStrike(event.target.value)}
          />*/}
        </Row>
        <Row className="mt-3 px-3">
{/*          <FormInput
            xs={12}
            lg
            as={Col}
            inpClass="py-2"
            className="p-0"
            name="expirationDate"
            type="text"
            controlId=""
            text="Expiration Date"
            placeholder="uint256"
            size="sm"
            successMsg="done"
            onChange={(event) => setExpiration(event.target.value)}
          />*/}
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
        </Row>
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

        {/*<Button 
                    onClick={() => setSubmit(true)}
                    disabled={submit && !formik.isValid ? true : false}
                    variant="primary" className='mt-5 py-2 px-4'
                    type="submit">
                    Update
                </Button>*/}
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

export default UserInformation;
