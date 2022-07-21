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

const UserInformation = ({
  username,
  firstName,
  lastName,
  email,
  birthday,
  onChangeInfo,
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


  // getCurrentPositions().then((positions) => console.log(positions));
  

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
      jumpIntensity]);
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

  return (
    <>
      <Titles
        title="Replicate Your option"
        text="Choose the parameters of the option you'd like to replicate"
      />

      <Form>
        <Row className="mt-5 px-3">
          <FormInput
            xs={12}
            lg
            as={Col}
            inpClass="py-2"
            className="p-0"
            name="token0"
            type="text"
            controlId=""
            text="Token 0"
            placeholder="Address of token 0"
            size="sm"
            successMsg="done"
            onChange={(event) => {
              setaddressToken0(event.target.value);
              console.log(addressToken0);
            }}
          />
          <FormInput
            xs={12}
            lg
            as={Col}
            inpClass="py-2"
            className="p-0 ms-lg-5 mt-3 mt-lg-0"
            name="token1"
            type="text"
            controlId=""
            text="Token 1"
            placeholder="Address of token 1"
            size="sm"
            successMsg="done"
            onChange={(event) => setaddressToken1(event.target.value)}
          />
        </Row>

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
          <FormInput
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
          />
        </Row>
        <Row className="mt-3 px-3">
          <FormInput
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
          />
          <FormInput
            xs={12}
            lg
            as={Col}
            inpClass="py-2"
            className="p-0 ms-lg-5 mt-4 mt-lg-3"
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

// validate the component
UserInformation.propTypes = {
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  onChangeInfo: PropTypes.func.isRequired,
};

export default UserInformation;
