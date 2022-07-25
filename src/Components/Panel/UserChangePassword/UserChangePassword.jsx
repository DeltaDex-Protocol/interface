import { useState } from "react";

// import other component
import Titles from "../../Titles/Titles";
import FormInput from "../../Forms/FormInput/FormInput";

// import other pkg
import { Form, Button } from "react-bootstrap";
// import { useFormik } from "formik";
import { string, object, ref } from "yup";

import {
  getUserPositions,
  getUserPositionsTable,
  getCurrentPositions,
} from "../../../utils/interact";

import Creatable, { useCreatable } from "react-select/creatable";
import DataGrid from "react-data-grid";

const TokenOptions = [
  { label: "Black Scholes", value: "BSM" },
  { label: "Jump Diffusion Model", value: "JDM" },
  { label: "Heston Model", value: "HM" },
  { label: "SABR Model", value: "SABR" },
];

const columns = [
  { key: "id", name: "ID" },
  { key: "token0", name: "Token 1" },
  { key: "token1", name: "Token 2" },
  { key: "token0_balance", name: "Token 1 Balance" },
  { key: "token1_balance", name: "Token 2 Balance" },
  { key: "amount", name: "Initial Deposit" },
  { key: "expiry", name: "Time to expiry" },
  { key: "fees", name: "Fees" },
  { key: "hedges", name: "Hedges" },
  { key: "strike", name: "K" },
  { key: "T", name: "T" },
  { key: "r", name: "r" },
  { key: "sigma", name: "sigma" },
  { key: "lam", name: "lam" },
  { key: "m", name: "m" },
  { key: "v", name: "v" },
];

const rows = [
  {
    id: 0,
    token0: "DAI",
    token1: "WETH",
    token0_balance: 149.87,
    token1_balance: 0.88,
    amount: 1500,
    expiry: 1674355061,
    fees: 200,
    hedges: 4,
    hedgeFee: 0.25,
    strike: 1000,
    T: 0.5,
    r: 0.1,
    sigma: 0.9,
    lam: 1.0,
    m: 1.0,
    v: 1.0,
  },
];

// const rows = [{}];

// const rows = getUserPositionsTable();

const UserChangePassword = ({}) => {
  const [ReplicationModel, setReplicationModel] = useState("");

  const [tagInputValue, setTagInputValue] = useState("");
  const [tagValue, setTagValue] = useState("");

  return (
    <>
      <Titles title="My Positions" text="" />
      <div>
        <Creatable
          options={TokenOptions}
          isClearable
          xs={12}
          lg
          inpClass="py-2"
          className="p-0"
          name="amountOfToken0"
          type="text"
          controlId=""
          placeholder="Filter by model"
          size="sm"
        />
        <DataGrid columns={columns} rows={rows} rdg-dark />

        <Button
          variant="primary"
          className="mt-5 py-2 px-4"
          type="submit"
          onClick={() => getUserPositions()}
        >
          View Positions
        </Button>
      </div>
    </>
  );
};

export default UserChangePassword;
