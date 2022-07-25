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
import { useEffect } from "react";

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

/* const rows = [
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
]; */

// const rows = ({}) => getRows();

const rows = [{}];

// const rows = getUserPositionsTable();

const UserChangePassword = ({}) => {
  const [ReplicationModel, setReplicationModel] = useState("");

  const [tagInputValue, setTagInputValue] = useState("");
  const [tagValue, setTagValue] = useState("");

  const [rowData, setRowData] = useState([]);
  const [upd, setUpd] = useState(false);

  useEffect(() => {
      const func = async () => {
        const rowData = await getUserPositions();
        console.log(rowData);
        setRowData(rowData);
      }
      func()
  }, [upd]); 

  // const rows = [
  //   {
  //     id: 0,
  //     token0: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  //     token1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  //     token0_balance: "149.0379590356981485",
  //     token1_balance: "0.875374677280394091",
  //     amount: "1500.0",
  //     expiry: "1674507901",
  //     fees: "200.0",
  //     hedges: "4000000000000000000",
  //     hedgeFee: "0.0",
  //     strike: "1000.0",
  //     T: "0.5",
  //     r: "0.1",
  //     sigma: "0.9",
  //     lam: "1.0",
  //     m: "1.0",
  //     v: "1.0",
  //   },
  //   {
  //     id: 0,
  //     token0: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  //     token1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  //     token0_balance: "179.0331122020014705",
  //     token1_balance: "0.855693402037468628",
  //     amount: "1500.0",
  //     expiry: "1674508578",
  //     fees: "200.0",
  //     hedges: "4000000000000000000",
  //     hedgeFee: "0.0",
  //     strike: "1200.0",
  //     T: "0.5",
  //     r: "0.1",
  //     sigma: "1.0",
  //     lam: "1.0",
  //     m: "1.0",
  //     v: "1.0",
  //   },
  //   {
  //     id: 0,
  //     token0: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  //     token1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  //     token0_balance: "179.0178495739317195",
  //     token1_balance: "0.855639814052167858",
  //     amount: "1500.0",
  //     expiry: "1674508762",
  //     fees: "200.0",
  //     hedges: "4000000000000000000",
  //     hedgeFee: "0.0",
  //     strike: "1200.0",
  //     T: "0.5",
  //     r: "0.1",
  //     sigma: "1.0",
  //     lam: "1.0",
  //     m: "1.0",
  //     v: "1.0",
  //   },
  //   {
  //     id: 0,
  //     token0: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  //     token1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  //     token0_balance: "179.002588992334566",
  //     token1_balance: "0.855586229603914766",
  //     amount: "1500.0",
  //     expiry: "1674509705",
  //     fees: "200.0",
  //     hedges: "5000000000000000000",
  //     hedgeFee: "0.0",
  //     strike: "1200.0",
  //     T: "0.5",
  //     r: "0.1",
  //     sigma: "1.0",
  //     lam: "1.0",
  //     m: "1.0",
  //     v: "1.0",
  //   },
  //   {
  //     id: 0,
  //     token0: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  //     token1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  //     token0_balance: "84.8126433555979245",
  //     token1_balance: "0.916520949722071599",
  //     amount: "1500.0",
  //     expiry: "1665049507",
  //     fees: "500.0",
  //     hedges: "2000000000000000000",
  //     hedgeFee: "0.000000000000000003",
  //     strike: "1200.0",
  //     T: "0.2",
  //     r: "0.1",
  //     sigma: "1.0",
  //     lam: "1.0",
  //     m: "1.0",
  //     v: "1.0",
  //   },
  // ];

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
        <DataGrid columns={columns} rows={rowData} rdg-light />

        <Button
          variant="primary"
          className="mt-5 py-2 px-4"
          type="submit"
          onClick={() => setUpd(!upd)}
        >
          View Positions
        </Button>
      </div>
    </>
  );
};

export default UserChangePassword;
