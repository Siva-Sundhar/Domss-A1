import React, { useEffect, useRef, useState } from "react";
import ModalTitle from "./ModalTitle.jsx";
import SelectArea from "./SelectArea.jsx";
import PropTypes from "prop-types";
const HierarchyTable = ({
	isClose,
	selectionItem,
	orderData,
	setOrderData,
	allocation,
	row,
	afterAllocation,
}) => {
	const inputRefs = useRef([]);
	const [totalQuantity, setTotalQuantity] = useState("");
	const [totalAmount, setTotalAmount] = useState("");
	const [showLocation, setShowLocation] = useState(false);

	const [location] = useState([
		{ label: "♦ Any" },
		{ label: "Main Location" },
		{ label: "Sub Location" },
		{ label: "East Location" },
		{ label: "West Location" },
	]);
	const [filteredLocation, setFilteredLocation] = useState(location);
	const [focusedRow, setFocusedRow] = useState(0);
	const [selectedLocation, setSelectedLocation] = useState(0);
	const updateClose = () => {
		isClose(false);
	};

	useEffect(()=>{
		handleTotalAmount()
		handleTotalQty()
	},[])

	// calculate Total 
	const handleTotal = (e, index)=>{
		const {name} = e.target;
		const updated = [...orderData]
		const allocations = allocation[index]

		
		if((name === 'quantity' && e.target.value !== "" && e.target.value > 0)|| (name === 'rate' && e.target.value !== "") || name === 'discount'){
			if(allocations.quantity && allocations.rate ){
				allocations.amount =
				allocations.quantity && allocations.rate
				? allocations.quantity * allocations.rate -
					(allocations.quantity *
						allocations.rate *
						(allocations.discount || 0)) /
						100
				: "";
			}
		} else{
			e.target.focus()
		}
		setOrderData(updated)
		
	}
	// Input change Handler
	const handleInputChange = (e, index) => {
		const { value, name } = e.target;
		const updated = [...orderData];
		const allocations = allocation[index];
		allocations[name] = value;		
		setOrderData(updated);

		if (name === "location") {
			const locations = location.filter((item) =>
				item.label.toLowerCase().includes(value)
			);
			setFilteredLocation(locations);
		}
	};

	// DueDate days adding prefix
	const addDueDay = (e, item, index) => {
		if(e.key === 'Enter'){
			const regex = /^\d+$/;
			if (regex.test(item)) {
				const updated = [...orderData];
				const allocations = allocation[index];
				allocations.dueOn = item + " Days";
				setOrderData(updated);
				inputRefs.current[index * 8 + 1]?.focus()
			} 
			if(item.trim() === "" && allocation.length - 1 > 0){
				const updated = [...orderData];
				updated[row].allocation = allocation.filter((item)=> item.dueOn !== "" );
				setOrderData(updated)
				updateAllocation()
			} else if (item.trim() !== "" ){
				inputRefs.current[index * 8 + 1]?.focus()
			}
			
		}
	};

	const handleKeyDown = (e, rowIndex, fieldIndex) => {
		const key = e.key;

		// only for not first row
		if (rowIndex > 0 && key === "Enter") {
			if (fieldIndex === 3 ) {
				e.preventDefault();
				inputRefs.current[rowIndex * 8 + 7]?.focus()
			} else {
				const nextField = rowIndex * 8 + fieldIndex + 1;
				if (
					nextField < inputRefs.current.length &&
					inputRefs.current[nextField]
				) {
					inputRefs.current[nextField]?.focus();
				} else {
					if (rowIndex === allocation.length - 1) {
						addAllocationRow()
					} else {
						inputRefs.current[(rowIndex + 1) * 8]?.focus();
					}
				}
			}
		} else {
			// this is for First row only
			if (key === "Enter" && allocation[0].dueOn.trim() !== "") {
				e.preventDefault();
				const nextField = rowIndex * 8 + fieldIndex + 1;
				if (
					nextField < inputRefs.current.length &&
					inputRefs.current[nextField]
				) {
					inputRefs.current[nextField]?.focus();
				} else {
					if (rowIndex === allocation.length - 1) {
						addAllocationRow()
					} else {
						inputRefs.current[(rowIndex + 1) * 8]?.focus();
					}
				}
			} else if (key === 'Backspace'){
				const previousIndex = rowIndex * 8 +fieldIndex - 1;
				if(e.target.value !== ""){
					return;
				} else {
					if (previousIndex >= 0 && previousIndex < inputRefs.current.length) {
						e.preventDefault();
						inputRefs.current[previousIndex].focus();
						inputRefs.current[previousIndex].setSelectionRange(0,0);
					}
				}
			}
		}
	};
	const addAllocationRow = () => {
		const newAllocation = [...orderData];
		const alloctions = allocation;
		alloctions.push({
			dueOn: "",
			location: "",
			batchNo: "♦ Any",
			quantity: "",
			rate: allocation[0].rate,
			uom: allocation[0].uom,
			discount: allocation[0].discount,
			amount: "",
		});
		setOrderData(newAllocation);
		setTimeout(() => {
			const nextRowFirstField = allocation.length;
			inputRefs.current[nextRowFirstField * 8]?.focus();
		}, 0);
	};

	const updateAllocation = ()=>{
		const newRow = [...orderData];
				newRow[row].description = selectionItem;
				newRow[row].dueOn = newRow[row].allocation[0].dueOn;
				newRow[row].quantity = parseFloat(
					newRow[row].allocation.reduce(
						(sum, alloc) => sum + parseFloat(alloc.quantity),
						0
					)
				).toFixed(2);
				newRow[row].rate = parseFloat(newRow[row].allocation[0].rate).toFixed(2);
				newRow[row].uom = newRow[row].allocation[0].uom;
				newRow[row].discount = newRow[row].allocation[0].discount;
				newRow[row].amount = parseFloat(
					newRow[row].allocation.reduce((sum, alloc) => sum + alloc.amount, 0)
				).toFixed(2);
				setOrderData(newRow);
				afterAllocation(row);

				isClose(false);
	}
	useEffect(() => {
		const handleKeys = (e) => {
			if (e.ctrlKey && e.key === "a") {
				e.preventDefault();
				updateAllocation();
			} else if (e.key === "Escape") {
				isClose(false);
			}
		};

		window.addEventListener("keydown", handleKeys);
	}, []);

	const handleLocation = (item, extraPrams) => {
		const updatedData = [...orderData];
		const allocations = allocation[extraPrams];
		allocations.location = item;
		setOrderData(updatedData);

		inputRefs.current[extraPrams * 8 + 2]?.focus();
	};
	const handleLocationSelect = (e, rowIndex) => {
		const key = e.key;
		if (key === "ArrowUp" && selectedLocation > 0) {
			setSelectedLocation((prev) => prev - 1);
		} else if (key === "ArrowDown" && selectedLocation < location.length - 1) {
			setSelectedLocation((prev) => prev + 1);
		} else if (key === "Enter") {
			handleLocation(filteredLocation[selectedLocation].label, rowIndex);
			setShowLocation(false);
			setSelectedLocation(0);
		}
	};
	const preventDefault = (e)=>{
		if(e.key === 'ArrowUp' || e.key === 'ArrowDown')
			e.preventDefault();
	}

	const handleTotalQty = () => {

		const qty = allocation.reduce(
			(sum, alloc) => sum + parseFloat(alloc.quantity || 0),
			0
		);
		if (!isNaN(qty)) {
			setTotalQuantity(parseFloat(qty).toFixed(2));
		}
	};
	const handleTotalAmount = () => {
		const amt = allocation.reduce(
			(sum, alloc) => sum + parseFloat(alloc.amount),
			0
		);
		if (!isNaN(amt)) setTotalAmount(parseFloat(amt).toFixed(2));
	};
	return (
		<>
			<div className="w-full fixed inset-0 bg-slate-400 bg-opacity-85 z-50 flex flex-col items-center">
				<div className="flex items-center justify-between w-full ">
					<ModalTitle title={"Stock Item Allocations"} onHandle={updateClose} />
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
															addDueDay(e, e.target.value, allocateIndex)
														}
														onBlur={() => {
															setFocusedRow(allocateIndex);
														}}
													/>
												</td>
												<td className="border border-slate-300">
													<input
														type="text"
														name="location"
														value={allocate.location}
														className="outline-0 text-center focus:bg-[#fee8af]  pr-0.5 w-full font-semibold"
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
															data={filteredLocation}
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
														className=" outline-0 focus:bg-[#fee8af]  pr-0.5 w-full font-semibold text-center"
														ref={(el) =>
															(inputRefs.current[allocateIndex * 8 + 2] = el)
														}
														onChange={(e) =>
															handleInputChange(e, allocateIndex)
														}
														onKeyDown={(e) =>
															handleKeyDown(e, allocateIndex, 2)
														}
														onFocus={() => setFocusedRow(allocateIndex)}
													/>
												</td>
												<td className="border border-slate-300">
													<input
														autoComplete="off"
														type="number"
														name="quantity"
														value={allocate.quantity}
														className="outline-0 text-right focus:bg-[#fee8af] pr-0.5 w-full appearance-none"
														ref={(el) =>
															(inputRefs.current[allocateIndex * 8 + 3] = el)
														}
														onChange={(e) =>
															handleInputChange(e, allocateIndex)
														}
														onKeyDown={(e) => {
															handleKeyDown(e, allocateIndex, 3);
															preventDefault(e);
														}}
														onBlur={(e) => {
															handleTotalQty();
															handleTotal(e, allocateIndex);
															if (allocateIndex > 0) {
																handleTotalAmount();
															}
														}}
														onFocus={() => setFocusedRow(allocateIndex)}
													/>
												</td>
												<td className="border border-slate-300">
													<input
														type="number"
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
														onBlur={(e) => {
															handleTotal(e, allocateIndex);
															handleTotalAmount();
														}}
														onFocus={() => setFocusedRow(allocateIndex)}
														readOnly={allocateIndex > 0}
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
														onFocus={() => setFocusedRow(allocateIndex)}
														readOnly={allocateIndex > 0}
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
														onBlur={(e) => {
															handleTotalAmount();
															handleTotal(e, allocateIndex);
														}}
														onFocus={() => setFocusedRow(allocateIndex)}
														readOnly={allocateIndex > 0}
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
														onFocus={() => setFocusedRow(allocateIndex)}
														readOnly
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
								<span className="font-semibold">
									{totalQuantity > 0 ? totalQuantity : ""}
								</span>
								<span className="pr-2 font-semibold">
									{totalAmount > 0 ? totalAmount : ""}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HierarchyTable;

HierarchyTable.propTypes = {
	isClose: PropTypes.func,
	selectionItem: PropTypes.string,
	orderData: PropTypes.arrayOf(
		PropTypes.shape({
			productCode: PropTypes.string,
			description: PropTypes.string,
			dueOn: PropTypes.string,
			quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			uom: PropTypes.string,
			discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			allocation: PropTypes.arrayOf(
				PropTypes.shape({
					dueOn: PropTypes.string,
					location: PropTypes.string,
					batchNo: PropTypes.string,
					quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
					rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
					uom: PropTypes.string,
					discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
					amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
				})
			),
		})
	),
	allocation: PropTypes.arrayOf(
		PropTypes.shape({
			dueOn: PropTypes.string,
			location: PropTypes.string,
			batchNo: PropTypes.string,
			quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			uom: PropTypes.string,
			discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		})
	),
	setOrderData: PropTypes.func,
	row: PropTypes.number,
	afterAllocation: PropTypes.func,
};
