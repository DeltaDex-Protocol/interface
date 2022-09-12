import React from 'react'
import { useEffect, useState } from "react"
import { defineAddresses } from '../../../configs/mypositions.config'


function GenerateRow({ row }) {
    const [isVisible, setVisibility] = useState(false);


    return (
        <tr className="hover:bg-indigo-100 text-center"
            onClick={() => setVisibility(!isVisible)}
            id={row.id}>
            <td scope="row" className="py-4 ">
                {row.id}
            </td>
            <td className="py-4 ">
                {defineAddresses[row.token0] + "-" + defineAddresses[row.token1]}
            </td>
            <td scope="row" className="py-4 ">
                <span className="font-normal">
                    {parseFloat(row.token0_balance).toFixed(3)}
                </span>
            </td>
            <td scope="row" className="py-4 ">
                <span className="font-normal">
                    {parseFloat(row.token1_balance).toFixed(3)}
                </span>
            </td>
            <td className="py-4 ">{row.isCall ? "call" : "put"}</td>
            <td className="py-4 ">{row.isLong ? "long" : "short"}</td>
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
            <td className="py-4 ">
                <button
                    className="text-white rounded-lg bg-violet-500 hover:bg-indigo-400 py-2 px-4"
                    onClick={() => setVisibility(!isVisible)}>
                    Show
                </button>
            </td>
        </tr>
    )
}

export default GenerateRow