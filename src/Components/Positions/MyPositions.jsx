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
    <div className="overflow-x-auto relative sm:rounded-lg shadow-lg">
      <table className="w-full text-sm text-left text-blue-400  shadow-lg">
          <thead className="text-xs text-black uppercase bg-gray-400">
              <tr>
                  <th scope="col" className="py-3 px-6">
                      Position id
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Option pair
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

          <tbody>
              <tr className="bg-gray-00  hover:bg-gray-300 text-black" id={rowData[0].id}>
                  <th scope="row" className="py-4 px-6 font-medium  whitespace-nowrap ">
                      {rowData[0].id} 
                  </th>
                  <td className="py-4 px-6">
                      Sliver
                  </td>
                  <td className="py-4 px-6">
                      Laptop
                  </td>
                  <td className="py-4 px-6">
                      $2999
                  </td>
                  <td/>
                  <td/>
                  <td/>
                  <td className="py-4 px-3">
                      <button 
                      className="font-medium text-black rounded-lg bg-gray-300"
                      onClick={() => setExpandedRows({1: !rowsExpanded[1]})}
                      >Show</button>
                  </td>
              </tr>

              {(rowsExpanded[1] !== undefined) && (rowsExpanded[1] !== false) && (

              <tr className="text-black bg-gray-300">
                  <th scope="col" className="py-3 px-6">
                      Product name<br/>
                      asdas
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Color
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Category
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Price
                  </th>
                  <th/>
              </tr>
              )}
              
              <tr className="bg-gray-00  hover:bg-gray-300 text-black">
                  <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap ">
                      Apple Watch 5
                  </th>
                  <td className="py-4 px-6">
                      Red
                  </td>
                  <td className="py-4 px-6">
                      Wearables
                  </td>
                  <td className="py-4 px-6">
                      $999
                  </td>
                  <td className="py-4 px-6">
                      <a href="#" className="font-medium text-black hover:underline">Edit</a>
                  </td>
              </tr>
          </tbody>
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