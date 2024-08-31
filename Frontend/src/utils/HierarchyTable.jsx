import React, {useEffect, useRef, useState} from 'react';
import ModalTitle from "./ModalTitle.jsx";
import SelectArea from "./SelectArea.jsx";

const HierarchyTable = ({isClose, selectionItem, orderData, setOrderData, allocation, row}) => {

    // const [allocation, setAllocation] = useState([
    //     {
            
        // }
    // ]);
    const inputRefs = useRef([]);
    const [totalQuantity, setTotalQuantity] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [showLocation, setShowLocation] = useState(false);

    const [location] = useState([
		{ label: "Main Location" },
		{ label: "Sub Location" },
		{ label: "East Location" },
		{ label: "West Location" },
	]);

  const [focusedRow, setFocusedRow] = useState(null)
    const [selectedLocation, setSelectedLocation] = useState(0);
    const updateClose = () => {
        isClose(false);
    };
    // Input change Handler
    const handleInputChange = (e, index) => {
        const {value, name} = e.target;
        const updated = [...orderData];
        const allocations = allocation[index];
        allocations[name] = value;

        allocations.amount =
            allocations.quantity &&
            allocations.rate
                ? (allocations.quantity * allocations.rate) -
                (allocations.quantity * allocations.rate * (allocations.discount || 0) / 100)
                : "";
        setOrderData(updated);
        }

    // DueDate days adding prefix
    const addDueDay = (item, index) => {
      
        const regex = /^\d+$/;
        if (regex.test(item)) {
          const updated = [...orderData];
          const allocations = allocation[index]
            allocations.dueOn = item + " Days";
            setOrderData(updated)
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
                    const newAllocation = [...orderData]
                        const alloctions = allocation;
                        alloctions.push({
                          
                            dueOn: "",
                            location: "",
                            batchNo: "",
                            quantity: "",
                            rate: "",
                            uom: "",
                            discount: "",
                            amount: "",
                        })
                    setOrderData(newAllocation)
                    setTimeout(() => {
                        const nextRowFirstField = allocation.length;
                        inputRefs.current[nextRowFirstField * 8]?.focus();
                    }, 0);
                } else {
                    inputRefs.current[(rowIndex + 1) * 8]?.focus();
                }
            }
        }
    };
      useEffect(()=>{
        const handleRowTotal = (e)=>{
          if( e.ctrlKey && e.key ==='a'){
            e.preventDefault()
            const newRow = [...orderData]
            newRow[row].description = selectionItem;
            newRow[row].dueOn = newRow[row].allocation[0].dueOn;
            newRow[row].quantity = newRow[row].allocation.reduce((sum, alloc) => sum + (alloc.quantity), 0);
            newRow[row].rate = newRow[row].allocation[0].rate;
            newRow[row].uom = newRow[row].allocation[0].uom;
            newRow[row].discount = newRow[row].allocation[0].discount;
            newRow[row].amount = newRow[row].allocation.reduce((sum, alloc)=> sum + (alloc.amount), 0)
            setOrderData(newRow)
            isClose(false)
          }
        }
        window.addEventListener('keydown', handleRowTotal)
      },[])

    const handleLocation = (item, extraPrams,)=>{
		
		const updatedData = [...orderData];
    const allocations = allocation[extraPrams];
		allocations.location = item;
		setOrderData(updatedData);

		inputRefs.current[extraPrams * 8 + 2]?.focus()
	}
    const handleLocationSelect = (e, rowIndex) =>{
		const key = e.key
		if (key === 'ArrowUp' && selectedLocation > 0){
			setSelectedLocation(prev => prev - 1);
		} else if(key === 'ArrowDown' && selectedLocation < location.length-1){
			setSelectedLocation(prev => prev + 1);
		} else if(key === 'Enter'){
			handleLocation(location[selectedLocation].label, rowIndex)
			setShowLocation(false);
			inputRefs
		}
	}
    // console.log(allocation)

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
						<ModalTitle
							title={"Stock Item Allocations"}
							onHandle={updateClose}
						/>
					</div>
					<div className=" min-w-[465px] flex justify-center items-center h-[100%] ">
						<div className="min-h-[480px] bg-white border border-slate-500 ">
							<h1 className="text-[14px] text-center py-1">
								Item Allocations for : <strong>{selectionItem}</strong>
							</h1>
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
										{allocation.map((allocate, allocateIndex) => (
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
															onChange={(e) =>
																handleInputChange(e, allocateIndex)
															}
															onKeyDown={(e) =>
																handleKeyDown(e, allocateIndex, 0)
															}
															onBlur={(e) =>
																addDueDay(e.target.value, allocateIndex)
															}
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
															onChange={(e) =>
																handleInputChange(e, allocateIndex)
															}
                              onFocus={() => {
														setShowLocation(true);
														setFocusedRow(allocateIndex);
													}}
															onKeyDown={(e) =>
																handleLocationSelect(e, allocateIndex)
															}
														/>
														{showLocation && (
															<SelectArea
																title="List of Locations"
																data={location}
																selectIndex={selectedLocation}
																onHandle={handleLocation}
																extraParams={focusedRow}
															/>
														)}
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
															onChange={(e) =>
																handleInputChange(e, allocateIndex)
															}
															onKeyDown={(e) =>
																handleKeyDown(e, allocateIndex, 2)
															}
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
															onChange={(e) =>
																handleInputChange(e, allocateIndex)
															}
															onKeyDown={(e) =>
																handleKeyDown(e, allocateIndex, 3)
															}
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
															onChange={(e) =>
																handleInputChange(e, allocateIndex)
															}
															onKeyDown={(e) =>
																handleKeyDown(e, allocateIndex, 4)
															}
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
															onChange={(e) =>
																handleInputChange(e, allocateIndex)
															}
															onKeyDown={(e) =>
																handleKeyDown(e, allocateIndex, 5)
															}
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
															onChange={(e) =>
																handleInputChange(e, allocateIndex)
															}
															onKeyDown={(e) =>
																handleKeyDown(e, allocateIndex, 6)
															}
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
															onChange={(e) =>
																handleInputChange(e, allocateIndex)
															}
															onKeyDown={(e) =>
																handleKeyDown(e, allocateIndex, 7)
															}
														/>
													</td>
												</tr>
											</React.Fragment>
										))}
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