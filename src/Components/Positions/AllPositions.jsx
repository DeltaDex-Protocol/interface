import { useState } from "react";

// import other component
import Titles from "./../Titles/Titles";
// import FormInput from "./../Forms/FormInput/FormInput";

// import other pkg
import { Form, Button } from "react-bootstrap";
// import { useFormik } from "formik";
import { string, object, ref } from "yup";

import {
  getUserPositions,
  getTokenPair,
  getAllPairAddresses,
  getAllPositions,
} from "./../../utils/interact";

import Creatable, { useCreatable } from "react-select/creatable";
import DataGrid from "react-data-grid";
import { useEffect } from "react";

import { settings } from "../../constants";

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
  "0xaaa31658EfA0da2a69fE925Ff652FeCb9cF94E24": "DAI",
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": "USDC",
  "0xdAC17F958D2ee523a2206206994597C13D831ec7": "USDT",
  "0x6D73De24AA0a5154df2915095BAe44598997029e": "WETH",
};

const GenerateRow = ({ row }) => {
  const [isVisible, setVisibility] = useState(false);
  // console.log(defineAddresses.)

  // const costForHedging = parseFloat(Math.random() * 1.5).toFixed(3);
  const [_costForHedge, _setCostForHedge] = useState(1);

  var current = Date.now();
  // console.log((current - parseInt(row.lastHedge) * 1000) / 1000);

  const perDay = parseInt(row.perday);

  const hedgeFee = parseInt(row.hedgeFee);

  const counter = parseInt(
    (24 * 3600) / perDay - (current - parseInt(row.lastHedge) * 1000) / 1000
  );

  const [seconds, setSeconds] = useState(counter);
  const [_seconds, _setSeconds] = useState(counter);

  useEffect(() => {
    const interval = setInterval(() => {
      _setCostForHedge(parseFloat(Math.random() * 1.5).toFixed(3));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const secondsToDhms = (seconds) => {
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " d " : " d ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " h " : " h ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " m " : " m ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  };

  return (
    <>
      <tr
        className="hover:bg-indigo-100 text-center"
        id={row.id}
        onClick={() => setVisibility(!isVisible)}
      >
        <th scope="row" className="py-4 px-6  whitespace-nowrap justify-center">
          {row.id}
        </th>
        <td className="py-4 px-6">
          {defineAddresses[row.token0] + "-" + defineAddresses[row.token1]}
        </td>
        <th scope="row" className="py-4 px-6  whitespace-nowrap justify-center">
          {_costForHedge + " $"}
        </th>
        <th scope="row" className="py-4 px-6  whitespace-nowrap justify-center">
          {parseFloat(row.hedgeFee).toFixed(3) + " DAI"}
        </th>

        <td>{seconds > 0 ? secondsToDhms(seconds) : "0 s"}</td>
        <td className="py-4 px-3">
          {seconds > 0 ? (
            <button
              disabled
              className="font-medium text-white rounded-lg bg-indigo-500 disabled:bg-gray-300"
              onClick={() => setVisibility(!isVisible)}
            >
              Hedge
            </button>
          ) : (
            <button
              className="font-medium text-white rounded-lg bg-indigo-400 disabled:bg-gray-300 hover:bg-indigo-300"
              onClick={() => setVisibility(!isVisible)}
            >
              Hedge
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

// const rows = ({}) => getRows();

const rows = [{}];

// const rows = getUserPositionsTable();

const AllPositions = ({}) => {
  const [ReplicationModel, setReplicationModel] = useState("");

  const [tagInputValue, setTagInputValue] = useState("");
  const [tagValue, setTagValue] = useState("");

  const [rowData, setRowData] = useState([]);

  const [upd, setUpd] = useState(false);

  const [rowsExpanded, setExpandedRows] = useState({});

  useEffect(() => {
    const func = async () => {
      // const rowData = await getAllPositions('0x7BDA8b27E891F9687BD6d3312Ab3f4F458e2cC91');
      const rowData = await getAllPositions();
      console.log(rowData);
      setRowData(rowData);
    };
    func();
  }, [upd]);

  return (
    <div className="overflow-x-auto relative sm:rounded-lg shadow-lg mb-8">
      <table className="text-sm shadow-lg bg-white">
        <thead
          className={`text-xs ${settings.text_color} uppercase ${settings.hover_main_color} text-center`}
        >
          <tr>
            <th scope="col" className="py-3 px-6">
              Position id
            </th>
            <th scope="col" className="py-3 px-6">
              Option pair
            </th>
            <th scope="col" className="py-3 px-6">
              Estimated tx cost for hedging
            </th>
            <th scope="col" className="py-3 px-6">
              Reward for hedging
            </th>

            <th scope="col" className="py-3 px-6">
              Time left until next hedging
            </th>
            <th />
          </tr>
        </thead>
        {rowData[0] !== undefined && (
          <tbody>
            {rowData.map((el, i) => (
              <GenerateRow row={rowData[i]} />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default AllPositions;
