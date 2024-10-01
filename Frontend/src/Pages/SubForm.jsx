import React, { useEffect, useRef, useState } from "react";
import ModalTitle from "../utils/ModalTitle";
import PropTypes from "prop-types";

const SubForm = ({
	data,
	setData,
	// inputRef,
	focusedIndex,
	isOpen,
	addNewRow,
	narrationRef,
	totalCredit,
	totalDebit
}) => {
	const [forexCust] = useState(true);
	const [showAgainstRef, setShowAgainstRef] = useState(false);
	const inputRefs = useRef([]);
	const inputFocusKey = (e, rowIndex, colIndex) => {
		const key = e.key;
		if (key === "Enter") {
			const nextField = rowIndex * 6 + colIndex + 1;
			if (
				inputRefs.current[nextField] &&
				nextField < inputRefs.current.length
			) {
				inputRefs.current[nextField]?.focus();
			}
		}
	};
	const handleInputChange = (e, rowIndex) => {
		const { name, value } = e.target;
		const updatedData = [...data];
		const billData = [...updatedData[focusedIndex].billWise];
		billData[rowIndex][name] = value;
		updatedData[focusedIndex].billWise = billData;
		setData(updatedData);
	};
	useEffect(() => {
		inputRefs.current[0]?.focus();
	}, []);
	const [selectIndex, setSelectIndex] = useState(2);
	const references = ["Advance", "Agst Ref", "New Ref"];
	const NumberFormat = (item) => {
		const cleanNumber =
			typeof item === "number" ? item : parseFloat(item.replace(/,/g, ""));

		if (isNaN(cleanNumber)) return "";
		const result = new Intl.NumberFormat("en-In", {
			maximumFractionDigits: 2,
			minimumFractionDigits: 2,
			style: "currency",
			currency: "INR",
		}).format(cleanNumber);
		return result.replace(/(\D)/, "$1 ");
	};
	const withoutCurrency = (e, index) => {
		const { name, value } = e.target;
		const cleanNumber =
			typeof item === "number" ? value : parseFloat(value.replace(/,/g, ""));

		if (isNaN(cleanNumber)) return "";

		const result = new Intl.NumberFormat("en-In", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(cleanNumber);

		const updated = [...data];
		updated[focusedIndex].billWise[index][name] = result;
		setData(updated);
	};
	const forex = () => {
		return (
			<>
				<table>
					<thead>
						<tr className="leading-5 text-[13px] font-semibold border-y border-slate-400">
							<td className=" align-top text-center w-28">Type of Ref</td>
							<td className=" align-top text-center w-20">Date</td>
							<td className=" align-top text-center w-40">Ref.Name</td>
							<td className=" align-top text-center w-20">Due Date</td>
							<td className=" align-top text-center w-36">
								Forex Currency Type
							</td>
							<td className=" align-top text-center w-32">Forex Amount</td>
							<td className=" align-top text-center ">Exchange Rate</td>
							<td className=" align-top text-right pr-2 w-32">Amount</td>
							<td className=" align-top w-10">Dr/Cr</td>
						</tr>
					</thead>
					<tbody>
						<tr className="h-3"></tr>
						{data[focusedIndex].billWise.map((item, index) => (
							<React.Fragment key={index}>
								<tr className="text-[13px] leading-4 relative">
									<td className="text-center">
										<input
											autoFocus="on"
											type="text"
											className=" w-full outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent pl-0.5 "
											value={item.reference}
											name="reference"
											ref={(input) =>
												(inputRefs.current[index * 9 + 0] = input)
											}
											onChange={(e) => handleInputChange(e, index)}
											onKeyDown={(e) => handleSelect(e, index, references, 9)}
											onFocus={() => setShowAgainstRef(true)}
											onBlur={() => setShowAgainstRef(false)}
										/>
										{showAgainstRef && suggestion(index, 9)}
									</td>

									<td className="text-center">
										<input
											type="text"
											className=" w-full outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent font-semibold pl-0.5 "
											value={item.date}
											name="date"
											onChange={(e) => handleInputChange(e, index)}
											ref={(input) =>
												(inputRefs.current[index * 9 + 1] = input)
											}
											onKeyDown={(e) => inputFocusKey(e, index, 1)}
										/>
									</td>
									<td className="text-center">
										<input
											type="text"
											className=" w-full outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent font-semibold pl-0.5 "
											value={item.name}
											name="name"
											onChange={(e) => handleInputChange(e, index)}
											ref={(input) =>
												(inputRefs.current[index * 9 + 2] = input)
											}
											onKeyDown={(e) => inputFocusKey(e, index, 2)}
										/>
									</td>
									<td className="text-center">
										<input
											type="text"
											className=" w-full outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent font-semibold pl-0.5 "
											value={item.creditDays}
											name="creditDays"
											onChange={(e) => handleInputChange(e, index)}
											ref={(input) =>
												(inputRefs.current[index * 9 + 3] = input)
											}
											onKeyDown={(e) => inputFocusKey(e, index, 3)}
										/>
									</td>
									<td className="text-center">
										<input
											type="text"
											className=" w-full outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent font-semibold text-right pr-0.5 "
											value={item.forexCurrencyType}
											name="forexCurrencyType"
											onChange={(e) => handleInputChange(e, index)}
											ref={(input) =>
												(inputRefs.current[index * 9 + 4] = input)
											}
											onKeyDown={(e) => inputFocusKey(e, index, 4)}
											onBlur={(e) => withoutCurrency(e, index)}
										/>
									</td>
									<td className="text-center">
										<input
											type="text"
											className=" w-full outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent font-semibold text-right pr-0.5 "
											value={item.forexAmount}
											name="forexAmount"
											onChange={(e) => handleInputChange(e, index)}
											ref={(input) =>
												(inputRefs.current[index * 9 + 5] = input)
											}
											onKeyDown={(e) => inputFocusKey(e, index, 5)}
											onBlur={(e) => withoutCurrency(e, index)}
										/>
									</td>
									<td className="text-center">
										<input
											type="text"
											className=" w-28 outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent font-semibold text-right pr-0.5 "
											value={item.exchangeRate}
											name="exchangeRate"
											onChange={(e) => handleInputChange(e, index)}
											ref={(input) =>
												(inputRefs.current[index * 9 + 6] = input)
											}
											onKeyDown={(e) => inputFocusKey(e, index, 6)}
											onBlur={(e) => withoutCurrency(e, index)}
										/>
									</td>
									<td className="text-center">
										<input
											type="text"
											className=" w-full outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent font-semibold text-right pr-0.5 "
											value={item.amount}
											name="amount"
											onChange={(e) => handleInputChange(e, index)}
											ref={(input) =>
												(inputRefs.current[index * 9 + 7] = input)
											}
											onKeyDown={(e) => inputFocusKey(e, index, 7)}
											onBlur={(e) => withoutCurrency(e, index)}
										/>
									</td>
									<td className="text-center">
										<input
											type="text"
											className=" w-7 outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent font-semibold pl-0.5 "
											value={item.creditOrDebit}
											name="creditOrDebit"
											onChange={(e) => handleInputChange(e, index)}
											ref={(input) =>
												(inputRefs.current[index * 9 + 8] = input)
											}
											onKeyDown={(e) => {
												inputFocusKey(e, index, 4);
												if (e.key === "Enter") {
													isOpen(false);
													handleCalculation()
												}
											}}
										/>
									</td>
								</tr>
							</React.Fragment>
						))}
					</tbody>
				</table>
			</>
		);
	};
	const normal = () => {
		return (
			<>
				<table>
					<thead>
						<tr className="leading-5 text-[13px] font-semibold border-y border-slate-400">
							<td className="border align-top text-center w-28">Type of Ref</td>
							<td className="border align-top text-center w-20">Date</td>
							<td className="border align-top text-center">Ref.Name</td>
							<td className="border align-top text-center">Due Date</td>
							<td className="border align-top text-right pr-2">Amount</td>
							<td className="border align-top text-center">Dr/Cr</td>
						</tr>
					</thead>
					<tbody>
						<tr className="h-3"></tr>
						{data[focusedIndex].billWise.map((item, index) => (
							<React.Fragment key={index}>
								<tr className="text-[13px] leading-4 relative">
									<td className="text-center">
										<input
											autoFocus="on"
											type="text"
											className=" w-24 outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent pl-0.5 "
											value={item.reference}
											name="reference"
											ref={(input) =>
												(inputRefs.current[index * 6 + 0] = input)
											}
											onChange={(e) => handleInputChange(e, index)}
											onKeyDown={(e) => handleSelect(e, index, references, 5)}
											onFocus={() => setShowAgainstRef(true)}
											onBlur={() => setShowAgainstRef(false)}
										/>
										{showAgainstRef && suggestion(index, 5)}
									</td>
									<td className="text-center">
										<input
											type="text"
											className=" w-16 outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent font-semibold pl-0.5 "
											value={item.date}
											name="date"
											onChange={(e) => handleInputChange(e, index)}
											ref={(input) =>
												(inputRefs.current[index * 6 + 1] = input)
											}
											onKeyDown={(e) => inputFocusKey(e, index, 1)}
										/>
									</td>
									<td className="text-center">
										<input
											type="text"
											className=" w-28 outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent font-semibold pl-0.5 "
											value={item.name}
											name="name"
											onChange={(e) => handleInputChange(e, index)}
											ref={(input) =>
												(inputRefs.current[index * 6 + 2] = input)
											}
											onKeyDown={(e) => inputFocusKey(e, index, 2)}
										/>
									</td>
									<td className="text-center">
										<input
											type="text"
											className=" w-16 outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent font-semibold text-right pr-0.5 "
											value={item.creditDays}
											name="creditDays"
											onChange={(e) => handleInputChange(e, index)}
											ref={(input) =>
												(inputRefs.current[index * 6 + 3] = input)
											}
											onKeyDown={(e) => inputFocusKey(e, index, 3)}
										/>
									</td>
									<td className="text-center">
										<input
											type="text"
											className=" w-24 outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent font-semibold text-right pr-0.5 "
											value={item.amount}
											name="amount"
											onChange={(e) => handleInputChange(e, index)}
											ref={(input) =>
												(inputRefs.current[index * 6 + 4] = input)
											}
											onKeyDown={(e) => inputFocusKey(e, index, 4)}
											onBlur={(e) => withoutCurrency(e, index)}
										/>
									</td>
									<td className="text-center">
										<input
											type="text"
											className=" w-7 outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent font-semibold pl-0.5 "
											value={item.creditOrDebit}
											name="creditOrDebit"
											onChange={(e) => handleInputChange(e, index)}
											ref={(input) =>
												(inputRefs.current[index * 6 + 5] = input)
											}
											onKeyDown={(e) => {
												inputFocusKey(e, index, 5);
												if (e.key === "Enter") {
													isOpen(false);
													handleCalculation()
												}
											}}
										/>
									</td>
								</tr>
							</React.Fragment>
						))}
					</tbody>
				</table>
			</>
		);
	};
	const handleSelect = (e, rowIndex, item, fields) => {
		const key = e.key;
		if (selectIndex < references.length) {
			if (key === "ArrowUp" && selectIndex > 0) {
				setSelectIndex((prev) => prev - 1);
			} else if (key === "ArrowDown" && selectIndex < references.length - 1) {
				setSelectIndex((prev) => prev + 1);
			} else if (key === "Enter") {
				e.preventDefault();
				onSelect(item[selectIndex], rowIndex, fields);
			}
		}
	};
	const onSelect = (item, index, fields) => {
		const updated = [...data];
		updated[focusedIndex].billWise[index].reference = item;
		setData(updated);
		inputRefs.current[index * fields + 1]?.focus();
		setShowAgainstRef(false);
	};
	const suggestion = (index, fields) => {
		return (
			<div className="absolute -top-7 left-[100px] border border-slate-500 z-20 h-[105px] w-32 bg-[#def1fc]">
				<h1 className="bg-[#2a67b1] text-white pl-2 text-[13px] ">
					Method of Adj.
				</h1>

				<ul
					onMouseDown={(e) => e.preventDefault()}
					tabIndex="-1"
					className="mt-3"
				>
					{references.map((item, ind) => (
						<li
							key={ind}
							tabIndex="0"
							className={`px-2 h-[17px] flex justify-between items-center py-0.5  cursor-pointer text-sm ${
								selectIndex === ind ? "bg-amber-300" : ""
							}`}
							onClick={() => onSelect(item, index, fields)}
						>
							{item}
						</li>
					))}
				</ul>
			</div>
		);
	};
	const handleCalculation = ()=>{
		
		if(totalDebit === totalCredit){
			narrationRef?.focus();
		} else if(totalDebit > totalCredit){
			addNewRow("Cr")
			
		} else if(totalDebit < totalCredit){
			addNewRow("Dr")
		}
	}

	return (
		<>
			<div className="w-full fixed inset-0 bg-slate-300 bg-opacity-85 z-50 flex flex-col items-center">
				<div className="flex items-center justify-between w-full ">
					<ModalTitle title={"Bill-wise Details"} onHandle={()=>isOpen(false)}/>
				</div>
				<div className=" min-w-[465] flex justify-start items-center h-[100%] ">
					<div className="min-h-[480px] bg-white border border-slate-500 ">
						<div className="text-[14px] pt-1 w-full flex">
							<label className="pl-1 w-[135px]">Bill-wise Details for</label>
							<span className="mr-1">:</span>
							<span className="font-semibold">{data[focusedIndex].name}</span>
						</div>
						<div className="text-[14px] leading-4 flex w-full">
							<label htmlFor="" className="pl-1 w-[135px]">
								Up to
							</label>
							<span className="mr-1">:</span>
							<span className="font-semibold ">
								{NumberFormat(
									data[focusedIndex].debitAmount ||
										data[focusedIndex].creditAmount
								)}
							</span>
						</div>
						<div className="h-[440px] overflow-auto mt-2">
							{forexCust ? forex() : normal()}
						</div>
						<div className="mb-2 flex justify-end leading-4">
							<span className="text-right pr-1 font-bold border-t border-double text-[13px] border-b-4 border-slate-500 ">
								{NumberFormat(data[focusedIndex].debitAmount || data[focusedIndex].creditAmount)} {data[focusedIndex].creditOrDebit}
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default SubForm;

SubForm.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
	setData: PropTypes.func,
	focusedIndex: PropTypes.number,
	isOpen: PropTypes.func,
	inputRef: PropTypes.arrayOf(PropTypes.object),
	addNewRow: PropTypes.func,
	narrationRef: PropTypes.object,
	totalCredit: PropTypes.any,
	totalDebit: PropTypes.any
};
