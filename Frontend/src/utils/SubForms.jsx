import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import ModalTitle from "./ModalTitle";
import SelectArea from "./SelectArea";

const HierarchyTable = ({ isClose, selectionItem, allocations}) => {
	const [focusedRow, setFocusedRow] = useState(null);
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
		},
	]);

	const [location] = useState([
		{ label: "Main Location" },
		{ label: "Sub Location" },
		{ label: "East Location" },
		{ label: "West Location" },
	]);
	const [showLocation, setShowLocation] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState(0);

	const [totalQuantity, setTotalQuantity] = useState("")
	const [totalAmount, setTotalAmount] = useState("")

	const updateClose = () => {
		isClose(false);
	};

	const inputRefs = useRef([]);

	const handleInputChange = (e, rowIndex) => {
		const { name, value } = e.target;
		const updatedData = [...allocation];
		updatedData[rowIndex][name] = value;
		setAllocation(updatedData);
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
	};

	const numberFormat = (number, item, rowIndex) => {
		const name = item === "rate" ? "rate" : "amount";
		const cleanNumber = parseFloat(number.replace(/,/g, ""));

		if (isNaN(cleanNumber)) return "";
		const ans = new Intl.NumberFormat("en-IN", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(cleanNumber);
		const updatedData = [...allocation];
		updatedData[rowIndex][name] = ans;
		setAllocation(updatedData);
	};
	const afterDiscount = (e, index) => {
		const { value } = e.target;
		const rate = parseFloat(allocation[index].rate.replace(/,/g, ""));
		const quantity = parseFloat(allocation[index].quantity.replace(/,/g, ""));
		if(value){
		const updatedData = [...allocation];
		const discount = (quantity * rate * value) / 100;
		const amount = quantity * rate - discount;
		updatedData[index].amount = new Intl.NumberFormat("en-IN", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(amount);
		setAllocation(updatedData);
	}
	};
	const handleCurrentAmount = (e, index) => {
		const { value } = e.target;
		const quantity = parseFloat(allocation[index].quantity);
		const rate = parseFloat(allocation[index].rate.replace(/,/g, ""));
		if (value) {
			const totalAmount = quantity * rate;
			const updatedData = [...allocation];
			updatedData[index].amount = new Intl.NumberFormat("en-IN", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}).format(totalAmount);
			setAllocation([...allocation]);
		}
	};

	const addDueDay = (item, index) => {
		const regex = /^\d+$/;
		if (regex.test(item)) {
			allocation[index].dueOn = item + " Days";
			setAllocation([...allocation]);
		}
	};
	const handleLocation = (item, extraPrams)=>{
		
		const updatedData = [...allocation];
		updatedData[extraPrams].location = item;
		setAllocation(updatedData);

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
	console.log(allocations);
	return (
		<>
			<div className="w-full flex flex-col items-center fixed inset-0 bg-slate-400 bg-opacity-90 z-50">
				<div className="w-full">
					<ModalTitle title={"Stock Item Allocations"} onHandle={updateClose} />
				</div>
				<div className="min-w-[465px] border border-slate-500 h-[80%] bg-white mt-[53px]">
					<div className=" min-h-[470px]">
						<h1 className="py-0.5 text-center text-[14px]">
							Item Allocations for : <strong>{selectionItem}</strong>
						</h1>
						<table>
							<thead>
								<tr className="border-y border-slate-400 text-[14px] leading-5 ">
									<th className="border border-slate-400 text-center w-16 font-semibold">
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
							<tbody className="">
								{allocation.map((allocate, rowIndex) => (
									<React.Fragment key={rowIndex}>
										<tr className="text-[13px] h-[17px] leading-4">
											<td className="text-center border border-slate-300">
												<input
													type="text"
													autoFocus="on"
													name="dueOn"
													value={allocate.dueOn}
													className="  outline-0  text-right focus:bg-[#fee8af] pr-0.5 w-full"
													onKeyDown={(e) => handleKeyDown(e, rowIndex, 0)}
													onChange={(e) => handleInputChange(e, rowIndex)}
													onBlur={(e) => addDueDay(e.target.value, rowIndex)}
													ref={(el) =>
														(inputRefs.current[rowIndex * 8 + 0] = el)
													}
												/>
											</td>
											<td className="border border-slate-300">
												<input
													type="text"
													name="location"
													value={allocate.location}
													className="outline-0 text-center focus:bg-[#fee8af]  pr-0.5 w-full"
													onKeyDown={(e) =>{ 
														// handleKeyDown(e, rowIndex, 1)
														handleLocationSelect(e, rowIndex)
													}}
													onFocus={() => {
														setShowLocation(true);
														setFocusedRow(rowIndex);
													}}
													onChange={(e) => handleInputChange(e, rowIndex)}
													onBlur={() => setShowLocation(false)}
													ref={(el) =>
														(inputRefs.current[rowIndex * 8 + 1] = el)
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
													onKeyDown={(e) => handleKeyDown(e, rowIndex, 2)}
													onChange={(e) => handleInputChange(e, rowIndex)}
													ref={(el) =>
														(inputRefs.current[rowIndex * 8 + 2] = el)
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
													onKeyDown={(e) => handleKeyDown(e, rowIndex, 3)}
													onChange={(e) => handleInputChange(e, rowIndex)}
													ref={(el) =>
														(inputRefs.current[rowIndex * 8 + 3] = el)
													}
												/>
											</td>
											<td className="border border-slate-300">
											
													<input
														type="text"
														autoComplete="off"
														name="rate"
														value={allocate.rate}
														className="outline-0 text-right focus:bg-[#fee8af] pr-0.5 w-full"
														onKeyDown={(e) => handleKeyDown(e, rowIndex, 4)}
														onChange={(e) => handleInputChange(e, rowIndex)}
														// onBlur={(e) => {
														// 	handleCurrentAmount(e, rowIndex);
														// 	numberFormat(e.target.value, "rate", rowIndex);
														// }}
														ref={(el) =>
															(inputRefs.current[rowIndex * 8 + 4] = el)
														}
													/>
												
											</td>

											<td className="border border-slate-300">
												<input
													type="text"
													autoComplete="off"
													name="uom"
													value={allocate.uom}
													className="outline-0 text-right focus:bg-[#fee8af]  pr-0.5 w-full"
													onKeyDown={(e) => handleKeyDown(e, rowIndex, 5)}
													onChange={(e) => handleInputChange(e, rowIndex)}
													ref={(el) =>
														(inputRefs.current[rowIndex * 8 + 5] = el)
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
													onKeyDown={(e) => handleKeyDown(e, rowIndex, 6)}
													onChange={(e) => handleInputChange(e, rowIndex)}
													// onBlur={(e) => {
													// 	afterDiscount(e, rowIndex);
													// }}
													ref={(el) =>
														(inputRefs.current[rowIndex * 8 + 6] = el)
													}
												/>
											</td>

											<td className="border border-slate-300">
												<input
													type="text"
													autoComplete="off"
													name="amount"
													value={allocate.amount}
													className="outline-0 text-right focus:bg-[#fee8af] pr-0.5 w-full "
													onKeyDown={(e) => handleKeyDown(e, rowIndex, 7)}
													onChange={(e) => handleInputChange(e, rowIndex)}
													// onBlur={(e) => {
													// 	numberFormat(e.target.value, "amount", rowIndex);
													// }}
													ref={(el) =>
														(inputRefs.current[rowIndex * 8 + 7] = el)
													}
												/>
											</td>
										</tr>
									</React.Fragment>
								))}
							</tbody>
						</table>
						<div className="border-t border-double border-b-4 ">
						<h1 className="font-semibold pl-2">Total</h1>
						</div>
					</div>
					
				</div>
				{/* <button onClick={addNewCompany}> AddCompany</button> */}
			</div>
		</>
	);
};

export default HierarchyTable;
HierarchyTable.propTypes = {
	isClose: PropTypes.func,
	selectionItem: PropTypes.string,
};
