import { useState } from "react";

// import other component
import Titles from "./../Titles/Titles";
import FormInput from "./../Forms/FormInput/FormInput";

// import other pkg
import { Form, Button } from "react-bootstrap";
// import { useFormik } from "formik";
import { string, object, ref } from "yup";

import {
  getUserPositions,
  getUserPositionsTable,
  getCurrentPositions,
} from "./../../utils/interact";

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
  { key: "lastHedge", name: "Last Hedge" },
  { key: "strike", name: "K" },
  { key: "T", name: "T" },
  { key: "r", name: "r" },
  { key: "sigma", name: "sigma" },
  { key: "lam", name: "lam" },
  { key: "m", name: "m" },
  { key: "v", name: "v" },
];



const defineAddresses = {
  '0x6B175474E89094C44Da98b954EedeAC495271d0F': "DAI",
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': "USDC",
  '0xdAC17F958D2ee523a2206206994597C13D831ec7': "USDT",
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': "WETH",
}


const GenerateRow = ({row}) => {

  const [isVisible, setVisibility] = useState(false);
  // console.log(defineAddresses.)

  return (
    <>
    <tr className="bg-gray-00  hover:bg-gray-300 text-center" id={row.id} onClick={() => setVisibility(!isVisible)}>
      <th scope="row" className="py-4 px-6  whitespace-nowrap justify-center">
          {row.id} 
      </th>
      <td className="py-4 px-6">
          {defineAddresses[row.token0] + "-" + defineAddresses[row.token1]}
      </td>
      <th scope="row" className="py-4 px-6  whitespace-nowrap justify-center">
          {parseFloat(row.token0_balance).toFixed(3)}
      </th>
      <th scope="row" className="py-4 px-6  whitespace-nowrap justify-center">
          {parseFloat(row.token1_balance).toFixed(3)}
      </th>

      <td className="py-4 px-6">
          {row.isCall ? "call" : "put"}
      </td>
      <td className="py-4 px-6">
          {row.isLong ? "long" : "short"}
      </td>
      <td>
        {row.strike}
      </td>
      <td>
        {new Date(parseInt(row.expiry) * 1000).toISOString().slice(0, 10).replace('T', ' ')}
      </td>
      <td>
        {new Date(parseInt(row.lastHedge) * 1000).toISOString().slice(0,10)}
      </td>
      <td className="py-4 px-3">
          <button 
          className="font-medium text-black rounded-lg bg-gray-300"
          onClick={() => setVisibility(!isVisible)}
          >Show</button>
      </td>
    </tr>
    {(isVisible !== false) && (
        <>
              <tr className=" bg-gray-300 text-center">
                  <th scope="col" className="py-3 px-6">
                      <span className="text-black">fees</span>
                      <br/>
                      {row.fees}
                  </th>
                  <th scope="col" className="py-3 px-6">
                      <span className="text-black">amount</span>
                      <br/>
                      {parseFloat(row.amount).toFixed(3)}
                  </th>
                  <th scope="col" colspan="1" className="py-3 px-6 ">
                      <span className="text-black">hedge fee</span>
                      <br/>
                      {parseFloat(row.hedgeFee).toFixed(3)} 
                  </th>
                  <th scope="col" className="py-3 px-6">
                      <span className="text-black">hedges per day</span>
                      <br/>
                      {row.perday}
                  </th>
                  <th/>
                  <th/>
                  <th/>
                  <th/>
                  <th/>
                  <th/>
              </tr>
              <tr className=" bg-gray-300 text-center">
                  <th scope="col" className="py-3 px-6">
                      <span className="text-black">model</span>
                      <br/>
                      {"jump diffusion"}
                  </th>
                  <th scope="col" className="py-3 px-6">
                      <span className="text-black">lambda</span>
                      <br/>
                      {parseFloat(row.lam).toFixed(3)}
                  </th>
                  <th scope="col" className="py-3 px-6">
                      <span className="text-black">m</span>
                      <br/>
                      {parseFloat(row.m).toFixed(3)}
                  </th>
                  <th scope="col" className="py-3 px-6">
                      <span className="text-black">risk-free rate</span>
                      <br/>
                      {parseFloat(row.r).toFixed(3)}
                  </th>
                  <th scope="col" className="py-3 px-6">
                      <span className="text-black">sigma</span>
                      <br/>
                      {parseFloat(row.sigma).toFixed(3)}
                  </th>
                  <th scope="col" className="py-3 px-6">
                      <span className="text-black">nu</span>
                      <br/>
                      {parseFloat(row.v).toFixed(3)}
                  </th>
                  <th/>
                  <th/>
                  <th/>
                  <th/>
              </tr>
          </>

    )}
    </>
    )
}


// const rows = ({}) => getRows();

const rows = [{}];

// const rows = getUserPositionsTable();

const MyPositions = ({}) => {
  const [ReplicationModel, setReplicationModel] = useState("");

  const [tagInputValue, setTagInputValue] = useState("");
  const [tagValue, setTagValue] = useState("");

  const [rowData, setRowData] = useState([]);

  const [upd, setUpd] = useState(false);

  const [rowsExpanded, setExpandedRows] = useState({});


  useEffect(() => {
    const func = async () => {
      const rowData = await getUserPositions();
      console.log(rowData);
      setRowData(rowData);
    };
    func();
  }, [upd]);

  return (
    <div className="overflow-x-auto relative sm:rounded-lg shadow-lg mb-8">
      <table className="w-full text-sm text-left  shadow-lg">
          <thead className="text-xs text-black uppercase bg-gray-400 text-center">
              <tr>
                  <th scope="col" className="py-3 px-6">
                      Position id
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Option pair
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Token 1 balance
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Token 2 balance
                  </th>

                  <th scope="col" className="py-3 px-6">
                      Option type
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Direction
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Strike
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Expiry
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Last hedge
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Details
                  </th>
              </tr>
          </thead>
          {rowData[0] !== undefined && (
          <tbody>
              {rowData.map((el, i) => <GenerateRow row={rowData[i]}/>)}
              

          </tbody>
          )}
      </table>
    </div>
    // <>
    //   <Titles title="My Positions" text="" />
    //   <div>
    //     <Creatable
    //       options={TokenOptions}
    //       isClearable
    //       xs={12}
    //       lg
    //       inpClass="py-2"
    //       className="p-0"
    //       name="amountOfToken0"
    //       type="text"
    //       controlId=""
    //       placeholder="Filter by model"
    //       size="sm"
    //     />
    //     <DataGrid columns={columns} rows={rowData} rdg-light />

    //     <Button
    //       variant="primary"
    //       className="mt-5 py-2 px-4"
    //       type="submit"
    //       onClick={() => setUpd(!upd)}
    //     >
    //       View Positions
    //     </Button>
    //   </div>
    // </>
  );
};

export default MyPositions;