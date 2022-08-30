import { useState } from "react";

import {
  getUserPositions,
  getUserPositionsTable,
  getCurrentPositions,
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
  "0x2dc042385a6b1efaeec4816118e704028a733bed": "DAI",
  "0x2dc042385a6b1efaeec4816118e704028a733bed": "USDC",
  "0x2dc042385a6b1efaeec4816118e704028a733bed": "USDT",
  "0xA8132b63AdE6ff0eAFE2b6a8E7E252A2418eCCec": "WETH",
};

const GenerateRow = ({ row }) => {
  const [isVisible, setVisibility] = useState(false);
  // console.log(defineAddresses.)

  return (
    <>
      <tr
        className="hover:bg-indigo-100 text-center"
        id={row.id}
        onClick={() => setVisibility(!isVisible)}
      >
        <th scope="row" className="py-4 px-6">
          {row.id}
        </th>
        <td className="py-4 px-6">
          {defineAddresses[row.token0] + "-" + defineAddresses[row.token1]}
        </td>
        <th scope="row" className="py-4 px-6  ">
          <span className="font-normal">
            {parseFloat(row.token0_balance).toFixed(3)}
          </span>
        </th>
        <th scope="row" className="py-4 px-6 ">
          <span className="font-normal">
            {parseFloat(row.token1_balance).toFixed(3)}
          </span>
        </th>

        <td className="py-4 px-6">{row.isCall ? "call" : "put"}</td>
        <td className="py-4 px-6">{row.isLong ? "long" : "short"}</td>
        <td>{row.strike}</td>
        <td>
          {new Date(parseInt(row.expiry) * 1000)
            .toISOString()
            .slice(0, 10)
            .replace("T", " ")}
        </td>
        <td>
          {new Date(parseInt(row.lastHedge) * 1000).toISOString().slice(0, 10)}
        </td>
        <td className="py-4 px-3">
          <button
            className={`text-white rounded-lg ${settings.main_color} hover:${settings.hover_main_color}`}
            onClick={() => setVisibility(!isVisible)}
          >
            Show
          </button>
        </td>
      </tr>
      {isVisible !== false && (
        <>
          <tr className="bg-gray-100 text-center">
            <th scope="col" className="py-3 px-6">
              <span className="font-normal">fees</span>
              <br />
              <span className="font-normal">{row.fees}</span>
            </th>
            <th scope="col" className="py-3 px-6">
              <span className="font-normal">amount</span>
              <br />
              <span className="font-normal">
                {parseFloat(row.amount).toFixed(3)}
              </span>
            </th>
            <th scope="col" colspan="1" className="py-3 px-6 ">
              <span className="font-normal">hedge fee</span>
              <br />
              <span className="font-normal">
                {parseFloat(row.hedgeFee).toFixed(3)}{" "}
              </span>
            </th>
            <th scope="col" className="py-3 px-6">
              <span className="font-normal">hedges per day</span>
              <br />
              <span className="font-normal">{row.perday} </span>
            </th>
            <th />
            <th />
            <th />
            <th />
            <th />
            <th />
          </tr>
          <tr className=" bg-gray-100 text-center">
            <th scope="col" className="py-3 px-6">
              <span className="font-normal">model</span>
              <br />
              <span className="font-normal">{"jump diffusion"} </span>
            </th>
            <th scope="col" className="py-3 px-6">
              <span className="font-normal">lambda</span>
              <br />
              <span className="font-normal">
                {parseFloat(row.lam).toFixed(3)}
              </span>
            </th>
            <th scope="col" className="py-3 px-6">
              <span className="font-normal">m</span>
              <br />
              <span className="font-normal">
                {parseFloat(row.m).toFixed(3)}
              </span>
            </th>
            <th scope="col" className="py-3 px-6">
              <span className="font-normal">risk-free rate</span>
              <br />
              <span className="font-normal">
                {parseFloat(row.r).toFixed(3)}
              </span>
            </th>
            <th scope="col" className="py-3 px-6">
              <span className="font-normal">sigma</span>
              <br />
              <span className="font-normal">
                {parseFloat(row.sigma).toFixed(3)}
              </span>
            </th>
            <th scope="col" className="py-3 px-6">
              <span className="font-normal">nu</span>
              <br />
              <span className="font-normal">
                {parseFloat(row.v).toFixed(3)}
              </span>
            </th>
            <th />
            <th />
            <th />
            <th />
          </tr>
        </>
      )}
    </>
  );
};

// const rows = ({}) => getRows();

const rows = [{}];

// const rows = getUserPositionsTable();

const NewMyPositions = ({}) => {
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

  return <>123</>;
};

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
      <table className="text-sm shadow-lg max-w-4xl bg-white">
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
            {rowData.map((el, i) => (
              <GenerateRow row={rowData[i]} />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default MyPositions;
