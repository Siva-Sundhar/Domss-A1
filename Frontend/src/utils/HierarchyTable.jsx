import React, {useRef, useState} from 'react';
import ModalTitle from "./ModalTitle.jsx";
import SelectArea from "./SelectArea.jsx";

const HierarchyTable = ({isClose, selectionItem,}) => {

    const updateClose = () => {
        isClose(false);
    };
    const [allocation, setAllocation] = useState([
        {
            dueOn: "",
            location: "",
            batchNo: "",
            quantity: "",
            rate: "",
            uom: "",
            discount: "",
            amount: "",
        }
    ]);
    const inputRefs = useRef([]);
    const [totalQuantity, setTotalQuantity] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [showLocation, setShowLocation] = useState(false)
    // Input change Handler
    const handleInputChange = (e, index) => {
        const {value, name} = e.target;
        const updated = [...allocation];
        const allocations = allocation[index];
        allocations[name] = value;

        allocations.amount =
            allocations.quantity &&
            allocations.rate
                ? (allocations.quantity * allocations.rate) -
                (allocations.quantity * allocations.rate * (allocations.discount || 0) / 100)
                : "";

        // if(['quantity', 'rate', 'uom'].includes(name)) {
        //     allocations.amount = calculateAmount(allocations.quantity, allocations.rate, allocations.discount);
        // }
        setAllocation(updated);
    }

    // DueDate days adding prefix
    const addDueDay = (item, index) => {
        const regex = /^\d+$/;
        if (regex.test(item)) {
            allocation[index].dueOn = item + " Days";
            setAllocation([...allocation]);
        }
    };

    const handleKeyDown = (e, rowIndex, fieldIndex) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const nextField = rowIndex * 8 + fieldIndex + 1;
            if (
                nextField < inputRefs.current.length &&
                inputRefs.current[nextField]
            ) {
                inputRefs.current[nextField]?.focus();
            } else {
                if (rowIndex === allocation.length - 1) {
                    const newAllocation = [
                        ...allocation,
                        {
                            dueOn: "",
                            location: "",
                            batchNo: "",
                            quantity: "",
                            rate: "",
                            uom: "",
                            discount: "",
                            amount: "",
                        },
                    ];
                    setAllocation(newAllocation);
                    setTimeout(() => {
                        const nextRowFirstField = allocation.length;
                        inputRefs.current[nextRowFirstField * 8]?.focus();
                    }, 0);
                } else {
                    inputRefs.current[(rowIndex + 1) * 8]?.focus();
                }
            }
        }
    }

    console.log(allocation)

    const handleTotalQty =() =>{
        const qty = allocation.reduce((sum, alloc) => sum + parseFloat(alloc.quantity), 0);
        if(!isNaN(qty)){
            setTotalQuantity(parseFloat(qty).toFixed(2))
        }
    }
    const handleTotalAmount =() =>{
        const amt = allocation.reduce((sum, alloc) => sum + parseFloat(alloc.amount), 0);
        if(!isNaN(amt))
            setTotalAmount(parseFloat(amt).toFixed(2));

    }
    return (
        <>

            <div className="w-full fixed inset-0 bg-slate-400 bg-opacity-85 z-50 flex flex-col items-center">
                <div className="flex items-center justify-between w-full ">
                    <ModalTitle title={"Stock Item Allocations"} onHandle={updateClose}/>
                </div>
                <div className=" min-w-[465px] flex justify-center items-center h-[100%] ">
                    <div className="min-h-[480px] bg-white border border-slate-500 ">
                        <h1 className="text-[14px] text-center py-1">Item Allocations for
                            : <strong>{selectionItem}</strong></h1>
                        <div className="h-[450px] overflow-auto">
                            <table>
                                <thead className="">
                                <tr className="border-y border-slate-400 text-[14px] leading-5 ">
                                    <th className="border border-slate-400 text-center w-16 font-semibold ">
                                        Due on
                                    </th>
                                    <th className="border border-slate-400 text-center w-32 font-semibold">
                                        Location
                                    </th>
                                    <th className="border border-slate-400 text-center w-24 font-semibold">
                                        Batch/Lot No.
                                    </th>
                                    <th className="border border-slate-400 text-center w-20 font-semibold">
                                        Quantity
                                    </th>
                                    <th className="border border-slate-400 text-right w-20 font-semibold pr-2">
                                        Rate
                                    </th>
                                    <th className="border border-slate-400 text-center w-8 font-semibold">
                                        per
                                    </th>
                                    <th className="border border-slate-400 text-center w-12 italic font-semibold">
                                        Disc %
                                    </th>
                                    <th className="border border-slate-400 w-24 text-right font-semibold pr-0.5">
                                        Amount
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    allocation.map((allocate, allocateIndex) => (
                                        <React.Fragment key={allocateIndex}>
                                            <tr className="text-[13px] h-[17px] leading-4">
                                                <td className="border border-slate-300 text-center w-16 font-semibold">
                                                    <input
                                                        type="text"
                                                        autoFocus="on"
                                                        name="dueOn"
                                                        value={allocate.dueOn}
                                                        className="  outline-0  text-right focus:bg-[#fee8af] pr-0.5 w-full"
                                                        ref={(el) =>
                                                            (inputRefs.current[allocateIndex * 8] = el)
                                                        }
                                                        onChange={(e) => handleInputChange(e, allocateIndex)}
                                                        onKeyDown={(e) => handleKeyDown(e, allocateIndex, 0)}
                                                        onBlur={(e)=> addDueDay(e.target.value, allocateIndex)}
                                                    />
                                                </td>
                                                <td className="border border-slate-300">
                                                    <input
                                                        type="text"
                                                        name="location"
                                                        value={allocate.location}
                                                        className="outline-0 text-center focus:bg-[#fee8af]  pr-0.5 w-full"
                                                        ref={(el) =>
                                                            (inputRefs.current[allocateIndex * 8 + 1] = el)
                                                        }
                                                        onChange={(e) => handleInputChange(e, allocateIndex)}
                                                        onKeyDown={(e) => handleKeyDown(e, allocateIndex, 1)}
                                                    />
                                                    {/*{showLocation && (*/}
                                                    {/*    <SelectArea*/}
                                                    {/*        title="List of Locations"*/}
                                                    {/*        data={location}*/}
                                                    {/*        selectIndex={selectedLocation}*/}
                                                    {/*        onHandle={handleLocation}*/}
                                                    {/*        extraParams={focusedRow}*/}
                                                    {/*    />*/}
                                                    {/*)}*/}
                                                </td>
                                                <td className="border border-slate-300">
                                                    <input
                                                        type="text"
                                                        autoComplete="off"
                                                        name="batchNo"
                                                        value={allocate.batchNo}
                                                        className=" outline-0 text-left focus:bg-[#fee8af]  pr-0.5 w-full"
                                                        ref={(el) =>
                                                            (inputRefs.current[allocateIndex * 8 + 2] = el)
                                                        }
                                                        onChange={(e) => handleInputChange(e, allocateIndex)}
                                                        onKeyDown={(e) => handleKeyDown(e, allocateIndex, 2)}
                                                    />
                                                </td>
                                                <td className="border border-slate-300">
                                                    <input
                                                        autoComplete="off"
                                                        type="text"
                                                        name="quantity"
                                                        value={allocate.quantity}
                                                        className="outline-0 text-right focus:bg-[#fee8af] pr-0.5 w-full"
                                                        ref={(el) =>
                                                            (inputRefs.current[allocateIndex * 8 + 3] = el)
                                                        }
                                                        onChange={(e) => handleInputChange(e, allocateIndex)}
                                                        onKeyDown={(e) => handleKeyDown(e, allocateIndex, 3)}
                                                        onBlur={handleTotalQty}
                                                    />
                                                </td>
                                                <td className="border border-slate-300">

                                                    <input
                                                        type="text"
                                                        autoComplete="off"
                                                        name="rate"
                                                        value={allocate.rate}
                                                        className="outline-0 text-right focus:bg-[#fee8af] pr-0.5 w-full"
                                                        ref={(el) =>
                                                            (inputRefs.current[allocateIndex * 8 + 4] = el)
                                                        }
                                                        onChange={(e) => handleInputChange(e, allocateIndex)}
                                                        onKeyDown={(e) => handleKeyDown(e, allocateIndex, 4)}
                                                        onBlur={handleTotalAmount}
                                                    />
                                                </td>
                                                <td className="border border-slate-300">
                                                    <input
                                                        type="text"
                                                        autoComplete="off"
                                                        name="uom"
                                                        value={allocate.uom}
                                                        className="outline-0 text-right focus:bg-[#fee8af]  pr-0.5 w-full"
                                                        ref={(el) =>
                                                            (inputRefs.current[allocateIndex * 8 + 5] = el)
                                                        }
                                                        onChange={(e) => handleInputChange(e, allocateIndex)}
                                                        onKeyDown={(e) => handleKeyDown(e, allocateIndex, 5)}
                                                    />
                                                </td>
                                                <td className="border border-slate-300">
                                                    <input
                                                        type="text"
                                                        autoComplete="off"
                                                        name="discount"
                                                        value={allocate.discount}
                                                        className="outline-0 text-right focus:bg-[#fee8af]  pr-0.5 w-full"
                                                        ref={(el) =>
                                                            (inputRefs.current[allocateIndex * 8 + 6] = el)
                                                        }
                                                        onChange={(e) => handleInputChange(e, allocateIndex)}
                                                        onKeyDown={(e) => handleKeyDown(e, allocateIndex, 6)}
                                                        onBlur={handleTotalAmount}
                                                    />
                                                </td>
                                                <td className="border border-slate-300">
                                                    <input
                                                        type="text"
                                                        autoComplete="off"
                                                        name="amount"
                                                        value={allocate.amount}
                                                        className="outline-0 text-right focus:bg-[#fee8af] pr-0.5 w-full "
                                                        ref={(el) =>
                                                            (inputRefs.current[allocateIndex * 8 + 7] = el)
                                                        }
                                                        onChange={(e) => handleInputChange(e, allocateIndex)}
                                                        onKeyDown={(e) => handleKeyDown(e, allocateIndex, 7)}
                                                    />
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className="border-t border-double border-b-4 flex justify-between mb-1">
                            <h1 className="font-semibold pl-2 w1/2">Total</h1>
                            <div className="w-1/2 flex justify-between">
                                <span className="font-semibold">{totalQuantity}</span>
                                <span className="pr-2 font-semibold">{totalAmount}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default HierarchyTable;