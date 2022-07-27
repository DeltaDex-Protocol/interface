

const AllPositions = () => {

    return (
        
<div className="overflow-x-auto relative sm:rounded-lg shadow-lg">
    <table className="w-full text-sm text-left text-blue-400  shadow-lg">
        <thead className="text-xs text-black uppercase bg-gray-300  ">
            <tr>
                <th scope="col" className="py-3 px-6">
                    Product name
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
                <th scope="col" className="py-3 px-6">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-gray-00  hover:bg-blue-500 text-black">
                <th scope="row" className="py-4 px-6 font-medium  whitespace-nowrap ">
                    Apple MacBook Pro 17"
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
                    <a href="#" className="font-medium text-black hover:underline">Edit</a>
                </td>
            </tr>
            <tr className="bg-gray-00  hover:bg-blue-500 text-black">
                <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                    Microsoft Surface Pro
                </th>
                <td className="py-4 px-6">
                    White
                </td>
                <td className="py-4 px-6">
                    Laptop PC
                </td>
                <td className="py-4 px-6">
                    $1999
                </td>
                <td className="py-4 px-6">
                    <a href="#" className="font-medium text-black hover:underline">Edit</a>
                </td>
            </tr>
            <tr className="bg-gray-00 hover:bg-blue-500 text-black">
                <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap ">
                    Magic Mouse 2
                </th>
                <td className="py-4 px-6">
                    Black
                </td>
                <td className="py-4 px-6">
                    Accessories
                </td>
                <td className="py-4 px-6">
                    $99
                </td>
                <td className="py-4 px-6">
                    <a href="#" className="font-medium text-black hover:underline">Edit</a>
                </td>
            </tr>
            <tr className="bg-gray-00  hover:bg-blue-500 text-black">
                <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap ">
                    Google Pixel Phone
                </th>
                <td className="py-4 px-6">
                    Gray
                </td>
                <td className="py-4 px-6">
                    Phone
                </td>
                <td className="py-4 px-6">
                    $799
                </td>
                <td className="py-4 px-6">
                    <a href="#" className="font-medium text-black hover:underline">Edit</a>
                </td>
            </tr>
            <tr className="bg-gray-00  hover:bg-blue-500 text-black">
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
