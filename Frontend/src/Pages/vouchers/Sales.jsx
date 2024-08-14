import { useRef, useState } from "react";
import SelectArea from "../../utils/SelectArea";
import Title from "../../utils/Title";
import Header from "../../utils/Header";

const Sales = () => {
	const [distributorData] = useState([
		{ label: "Ramco" },
		{ label: "Coramandal" },
		{ label: "Tnpl Ltd" },
		{ label: "Jsw" },
	]);
	const [ledger] = useState([
		{ label: "Sales Ledger 18%" },
		{ label: "Purchase Ledger 18%" },
		{ label: "Cash" },
		{ label: "Customer" },
	]);
	const [tableData, setTableData] = useState([
		{
			productCode: "",
			description: "",
			dueOn: "",
			quantity: "",
			rate: "",
			per: "",
			discount: "",
			amount: "",
		},
	]);
	const tableRefs = useRef([]);
	const inputRefs = useRef([]);

	const [customerName, setCustomerName] = useState("");
	const [salesLedger, setSalesLedger] = useState("");

	const [showSalesLedger, setShowSalesLedger] = useState(false);
	const [ShowCustomer, setShowCustomer] = useState(false);

	const [selectIndex, setSelectIndex] = useState(0);

	const handleInputChange = (e, rowIndex) => {
		const { value, name } = e.target;
		const updatedData = [...tableData];
		updatedData[rowIndex][name] = value;
		setTableData(updatedData);
	};
	const handleSelect = (e, data) => {
		e.preventDefault();
		if (selectIndex < distributorData.length) {
			if (e.key === "ArrowUp" && selectIndex > 0) {
				setSelectIndex((prev) => prev - 1);
			} else if (
				e.key === "ArrowDown" &&
				selectIndex < distributorData.length - 1
			) {
				setSelectIndex((prev) => prev + 1);
			} else if (e.key === "Enter" && selectIndex >= 0) {
				if (data === distributorData) {
					handleDistributor(data[selectIndex]);
					setShowCustomer(false);
				} else if (data === ledger) {
					handleLedger(data[selectIndex]);
					setShowSalesLedger(false);
				}
				// tableRefs.current[0].focus();
			} else if (e.key === "Backspace") {
				if (e.target.value !== "") {
					return;
				} else {
					setShowCustomer(false);
					e.preventDefault();
					inputRefs.current[1].focus();
				}
			}
		}
	};
	const handleKeyDown = (e, rowIndex, colIndex) => {
		if (e.key === "Enter" && e.target.value.trim() !== "") {
			e.preventDefault();
			const nextCell = rowIndex * 3 + colIndex + 1;
			//usually focus next cell index
			if (nextCell < tableRefs.current.length && tableRefs.current[nextCell]) {
				tableRefs.current[nextCell]?.focus();
			} else {
				// add new row when reach last row
				if (rowIndex === tableData.length - 1) {
					addRow();
				//
				} else {
					tableRefs.current[(rowIndex + 1) * 3]?.focus();
				}
			}
		} else if(e.key === 'Backspace'){
			const prevCell = rowIndex * 3 + colIndex - 1;
			if(e.target.value.trim() !== ""){
				return;
			} else if(prevCell >= 0 ){
				e.preventDefault();
				tableRefs.current[prevCell]?.focus();
				tableRefs.current[prevCell].setSelectionRange(0, 0);
			}
		}
	};
	const addRow = () => {
		setTableData((prev) => [
			...prev,
			{
				productCode: "",
				description: "",
				dueOn: "",
				quantity: "",
				rate: "",
				per: "",
				discount: "",
				amount: "",
			},
		]);
		setTimeout(() => {
			const rowIndex = tableData.length;
			tableRefs.current[rowIndex * 3]?.focus();
		}, 0);
	};
	const handleDistributor = (item) => {
		setCustomerName(item.label);
	};
	const handleLedger = (item) => {
		setSalesLedger(item.label);
	};

	// console.log(tableRefs)

	return (
		<>
			<Title title="Order Voucher Creation" />
			<form action="" className="relative">
				<Header title="Sales" />
				<div className=" border-b border-slate-300">
					<div className="flex leading-4 px-1">
						<label htmlFor="custNo" className="w-28 text-[14px]">
							Customer Name
						</label>
						<div className="mr-0.5">:</div>
						<input
							ref={(el) => (inputRefs.current[2] = el)}
							autoComplete="off"
							onChange={(e) => setCustomerName(e.target.value)}
							value={customerName}
							type="text"
							onKeyDown={(e) => handleSelect(e, distributorData)}
							onFocus={() => setShowCustomer(true)}
							onBlur={() => setShowCustomer(false)}
							id="custNo"
							className="w-60 border border-transparent h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
						/>
						{ShowCustomer && (
							<SelectArea
								title={"List of Ledger Accounts"}
								data={distributorData}
								tableRefs={tableRefs}
								selectIndex={selectIndex}
								onHandle={handleDistributor}
							/>
						)}
					</div>
					<div className="flex leading-4 px-1 my-0.5">
						<label
							htmlFor="currentBalance"
							className="w-28 text-[13px] italic text-slate-500"
						>
							Current balance
						</label>
						<div className="mr-0.5 text-slate-500">:</div>
					</div>
					<div className="flex leading-4 px-1">
						<label htmlFor="custNo" className="w-28 text-[14px]">
							Sales ledger
						</label>
						<div className="mr-0.5">:</div>
						<input
							ref={(el) => (inputRefs.current[2] = el)}
							autoComplete="off"
							onChange={(e) => setSalesLedger(e.target.value)}
							value={salesLedger}
							type="text"
							onKeyDown={(e) => handleSelect(e, ledger)}
							onFocus={() => setShowSalesLedger(true)}
							onBlur={() => setShowSalesLedger(false)}
							id="custNo"
							className="w-60 border border-transparent h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
						/>
						{showSalesLedger && (
							<SelectArea
								title={"List of Ledger Accounts"}
								data={ledger}
								tableRefs={tableRefs}
								selectIndex={selectIndex}
								onHandle={handleLedger}
							/>
						)}
					</div>
					<div className="flex leading-4 px-1 my-0.5">
						<label
							htmlFor="currentBalance"
							className="w-28 text-[13px] italic text-slate-500"
						>
							Current balance
						</label>
						<div className="mr-0.5 text-slate-500">:</div>
					</div>
				</div>
				<div className="h-[72vh] overflow-auto">
				<table>
				<thead className="bg-[#F9F3CC] text-[12px] border border-slate-300 font-semibold sticky top-0">
					<tr className="h-[17px] leading-4 border border-slate-300">
						<th className="w-[73px] text-center border border-slate-300">
							S.no
						</th>
						<th className="w-[120px] text-center border border-slate-300">
							Product Code
						</th>
						<th className="w-[500px] text-center border border-slate-300">
							Description
						</th>
						<th className="w-[120px] text-center border border-slate-300">
							Due on
						</th>
						<th className="w-[120px] text-center border border-slate-300">
							Quantity
						</th>
						<th className="w-[120px] text-center border border-slate-300">
							Rate
						</th>
						<th className="w-[110px] text-center border border-slate-300">
							per
						</th>
						<th className="w-[103px] text-center border border-slate-300">
							Discount
						</th>
						<th className="w-[103px] text-center border border-slate-300">
							Amount
						</th>
					</tr>
				</thead>
				<tbody>
					{tableData.map((item, rowIndex) => (
						<tr className=" text-[13px] h-[17px] leading-4" key={rowIndex}>
							<td className="text-center border border-slate-300 bg-white">
								{rowIndex + 1}
							</td>
							<td className="text-center border border-slate-300 bg-white relative ">
								<input
									ref={(input) => (tableRefs.current[rowIndex * 3 + 0] = input)}
									onChange={(e) => handleInputChange(e, rowIndex)}
									type="text"
									className="w-full outline-0 "
									name="productCode"
									value={item.productCode}
									onKeyDown={(e) => handleKeyDown(e, rowIndex, 0)}
								/>
							</td>
							<td className="text-center border border-slate-300 bg-white">
								<input
									onChange={(e) => handleInputChange(e, rowIndex)}
									type="text"
									className="w-full outline-0"
									name="description"
									value={item.description}
								/>
							</td>
							<td className="text-center border border-slate-300 bg-white">
								<input
									ref={(input) => (tableRefs.current[rowIndex * 3 + 1] = input)}
									onChange={(e) => handleInputChange(e, rowIndex)}
									type="text"
									className="w-full outline-0"
									name="dueOn"
									value={item.dueOn}
									onKeyDown={(e) => handleKeyDown(e, rowIndex, 1)}
								/>
							</td>
							<td className="text-center border border-slate-300 bg-white">
								<input
									ref={(input) => (tableRefs.current[rowIndex * 3 + 2] = input)}
									onChange={(e) => handleInputChange(e, rowIndex)}
									className="w-full outline-0"
									type="text"
									name="quantity"
									value={item.quantity}
									onKeyDown={(e) => handleKeyDown(e, rowIndex, 2)}
								/>
							</td>
							<td className="text-center border border-slate-300 bg-white">
								<input
									onChange={(e) => handleInputChange(e, rowIndex)}
									className="w-full outline-0"
									type="text"
									name="rate"
									value={item.rate}
									onKeyDown={handleKeyDown}
								/>
							</td>
							<td className="text-center border border-slate-300 bg-white">
								<input
									onChange={(e) => handleInputChange(e, rowIndex)}
									className="w-full outline-0"
									type="text"
									name="per"
									value={item.per}
									onKeyDown={handleKeyDown}
								/>
							</td>
							<td className="text-center border border-slate-300 bg-white">
								<input
									onChange={(e) => handleInputChange(e, rowIndex)}
									className="w-full outline-0"
									type="text"
									name="discount"
									value={item.discount}
									onKeyDown={handleKeyDown}
								/>
							</td>
							<td className="text-center border border-slate-300 bg-white cursor-default">
								<input
									onChange={(e) => handleInputChange(e, rowIndex)}
									className="w-full outline-0"
									type="text"
									name="amount"
									value={item.amount}
									onKeyDown={handleKeyDown}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
				</div>
				<div className="flex justify-between">
					<div className=" flex flex-col">
						<label htmlFor="narration" className="text-[14px] pl-1">
							Narration :
						</label>
						<textarea
							type="text"
							className="h-[36px] text-[13px] resize-none overflow-hidden outline-0 focus:border focus:border-blue-400 w-[700px]"
							rows={1}
						/>
					</div>
					<div className="border-double border-t border-b-4 border-slate-400 h-[22px] w-[350px] flex items-center">
						Total
					</div>
				</div>
			</form>
		</>
	);
};
export default Sales;
