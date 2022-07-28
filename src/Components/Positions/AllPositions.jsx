import { useState } from 'react';


// for (i < length): <row component>, in the row component should be another component with metadata. And if state has changed, it should be rendered.


const AllPositions = () => {

    const [rowsExpanded, setExpandedRows] = useState({});


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
            
            <tr className="bg-gray-00  hover:bg-gray-300 text-black">
                <th scope="row" className="py-4 px-6 font-medium  whitespace-nowrap ">
                    Apple 
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
                <td className="py-4 px-6">
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

            // <tr className="bg-gray-00  hover:bg-gray-300 text-black">
            //     <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
            //         Microsoft Surface Pro
            //     </th>
            //     <td className="py-4 px-6">
            //         White
            //     </td>
            //     <td className="py-4 px-6">
            //         Laptop PC
            //     </td>
            //     <td className="py-4 px-6">
            //         $1999
            //     </td>
            // </tr>
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

    )
}

export default AllPositions;
