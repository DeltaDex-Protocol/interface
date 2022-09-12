import React from 'react'
import { useState, useEffect } from 'react'
import { positions } from '../../../data/mypositions.data'
import GenerateRow from './GenerateRow';
import ReactLoading from 'react-loading';


function Table() {
    const [rowData, setRowData] = useState(positions);

    // useEffect(() => {
    //     const func = async () => {
    //       const rowData = await getUserPositions() || [];
    //       console.log(rowData);
    //       setRowData(rowData);
    //     };
    //     func();
    //   }, []);
        
      return (
        <>
        <div className="rounded-xl overflow-x-auto">
          <table className="text-sm shadow-lg max-w-xl bg-white rounded-xl ">
            <thead className="text-xs text-white uppercase bg-indigo-400 text-center">
              <tr className='rounded'>
                <th scope="col" className="px-4 py-4">
                  Position id
                </th>
                <th scope="col" className="px-4 py-4">
                  Option pair
                </th>
                <th scope="col" className="px-6 py-4">
                  Token 1 balance
                </th>
                <th scope="col" className="px-6 py-4">
                  Token 2 balance
                </th>
                <th scope="col" className="px-4 py-4">
                  Option type
                </th>
                <th scope="col" className="px-6 py-4">
                  Direction
                </th>
                <th scope="col" className="px-6 py-4">
                  Strike
                </th>
                <th scope="col" className="px-6 py-4">
                  Expiry
                </th>
                <th scope="col" className="px-6 py-4">
                  Last hedge
                </th>
                <th scope="col" className="px-6 py-4">
                  Details
                </th>
              </tr>
            </thead>
            {rowData !== undefined && (
              <tbody>
                {rowData.map((el) => (
                  <GenerateRow row={el} />
                ))}
              </tbody>
            )}
          </table>
        </div>
        {rowData.length == 0 && (<ReactLoading type={'spin'} color="#fff" width={70} className="mx-auto my-10"/>)}
        </>
      );
}


export default Table