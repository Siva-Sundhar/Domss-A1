// import { useState } from 'react';

// const Table = () => {
//     const [showModal, setShowModal] = useState(false);
//     const [godowns] = useState([
//         { location: 'Main Location', batch: 'Any', dueOn: '1-Apr-24', quantity: 10, rate: 120, disc: 12 },
//         { location: 'Sample Godown', batch: 'Any', dueOn: '5 Days', quantity: 10, rate: 120, disc: 12 },
//         { location: 'Sd', batch: 'Any', dueOn: '5 Days', quantity: 10, rate: 120, disc: 12 },
//     ]);

//     const totalQuantity = godowns.reduce((total, g) => total + Number(g.quantity), 0);

//     return (
//         <div className="p-4">
//             <button
//                 onClick={() => setShowModal(true)}
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//             >
//                 Open Item Allocation
//             </button>

//             {showModal && (
//                 <div className="fixed inset-0 bg-gray-600 bg-opacity-100 overflow-y-auto h-full w-full">
//                     <div className="relative top-20 mx-auto p-5 border w-full shadow-lg rounded-md bg-white">
//                         <h3 className="text-lg font-medium text-gray-900 mb-4">Item Allocations for: 1L Water</h3>
//                         <table className="w-full text-sm text-left">
//                             <thead>
//                                 <tr>
//                                     <th className="border px-4 py-2">Location</th>
//                                     <th className="border px-4 py-2">Batch/Lot No.</th>
//                                     <th className="border px-4 py-2">Quantity</th>
//                                     <th className="border px-4 py-2">Rate</th>
//                                     <th className="border px-4 py-2">Disc %</th>
//                                     <th className="border px-4 py-2">Amount</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {godowns.map((godown, index) => (
//                                     <tr key={index}>
//                                         <td className="border px-4 py-2">{godown.location}</td>
//                                         <td className="border px-4 py-2">{godown.batch}</td>
//                                         <td className="border px-4 py-2">{godown.quantity} CTN</td>
//                                         <td className="border px-4 py-2">{godown.rate}</td>
//                                         <td className="border px-4 py-2">{godown.disc} %</td>
//                                         <td className="border px-4 py-2">{(godown.quantity * godown.rate).toFixed(2)}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                             <tfoot>
//                                 <tr>
//                                     <td className="border px-4 py-2" colSpan="2">Total</td>
//                                     <td className="border px-4 py-2">{totalQuantity} CTN</td>
//                                     <td className="border px-4 py-2"></td>
//                                     <td className="border px-4 py-2"></td>
//                                     <td className="border px-4 py-2">{(totalQuantity * godowns[0].rate).toFixed(2)}</td>
//                                 </tr>
//                             </tfoot>
//                         </table>
//                         <div className="mt-4">
//                             <button
//                                 onClick={() => setShowModal(false)}
//                                 className="px-4 py-2 bg-blue-500 text-white rounded"
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Table;
import React, { useState } from 'react';

// Mock data for items
const items = [
    { name: "1L Water", quantity: "50 CTN" },
    { name: "Captain America Shield", quantity: "50 Nos" },
    { name: "Iron Man Suit", quantity: "50 Nos" },
    // Add more items as needed
];

const ItemSelection = ({ onItemSelected }) => {
    return (
        <div className="p-4">
            <h2 className="text-lg font-medium">List of Stock Items</h2>
            <ul className="border rounded w-80">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => onItemSelected(item.name)}
                    >
                        {item.name} - {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ItemAllocationModal = ({ itemName, onClose }) => {
    // Modal content as previously defined
    const [godowns, setGodowns] = useState([
        { location: 'Main Location', batch: 'Any', dueOn: '1-Apr-24', quantity: 10, rate: 120, disc: 12 },
        { location: 'Sample Godown', batch: 'Any', dueOn: '5 Days', quantity: 10, rate: 120, disc: 12 },
        { location: 'Sd', batch: 'Any', dueOn: '5 Days', quantity: 10, rate: 120, disc: 12 },
    ]);

    const totalQuantity = godowns.reduce((total, g) => total + Number(g.quantity), 0);

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Item Allocations for: {itemName}</h3>
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Location</th>
                            <th className="border px-4 py-2">Batch/Lot No.</th>
                            <th className="border px-4 py-2">Quantity</th>
                            <th className="border px-4 py-2">Rate</th>
                            <th className="border px-4 py-2">Disc %</th>
                            <th className="border px-4 py-2">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {godowns.map((godown, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{godown.location}</td>
                                <td className="border px-4 py-2">{godown.batch}</td>
                                <td className="border px-4 py-2">{godown.quantity} CTN</td>
                                <td className="border px-4 py-2">{godown.rate}</td>
                                <td className="border px-4 py-2">{godown.disc} %</td>
                                <td className="border px-4 py-2">{(godown.quantity * godown.rate).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="border px-4 py-2" colSpan="2">Total</td>
                            <td className="border px-4 py-2">{totalQuantity} CTN</td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2">{(totalQuantity * godowns[0].rate).toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
                <div className="mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const Table = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemSelected = (itemName) => {
        setSelectedItem(itemName);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    return (
        <div className="p-4">
            {!selectedItem ? (
                <ItemSelection onItemSelected={handleItemSelected} />
            ) : (
                <ItemAllocationModal itemName={selectedItem} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default Table;
