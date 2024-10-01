import { useEffect, useRef, useState } from "react";
import Title from "../../utils/Title";
import Header from "../../utils/Header";
import SelectArea from "../../utils/SelectArea";
import HierarchyTable from "../../utils/HierarchyTable";
import axios from "axios";
// import ProductSelectArea from "../../utils/ProductSelectArea";

const Purchase = () => {
	const [showProduct, setShowProduct] = useState(false);
	const [showSubForm, setShowSubForm] = useState(false);
	const [tableData, setTableData] = useState([
		{
			productCode: "",
			description: "",
			dueOn: "",
			quantity: "",
			rate: "",
			uom: "",
			discount: "",
			amount: "",
			allocation: [
				{
					dueOn: "",
					location: "♦ Any",
					batchNo: "♦ Any",
					quantity: "",
					rate: "",
					uom: "",
					discount: "",
					amount: "",
				},
			],
		},
	]);
	const tableRefs = useRef([]);
	const inputRefs = useRef([]);
	const [selectionItem, setSelectionItem] = useState("");
	const [headerData, setHeaderData] = useState({
		customerName: "",
		currentBalance1: "",
		orderNo: "",
	});
	const [narration, setNarration] = useState("");
	const [stockItem] = useState([
		{ productCode: "10001", label: "Aquafina 1L", quantity: 40 },
		{ productCode: "10002", label: "Kinley 1L", quantity: 40 },
		{ productCode: "10003", label: "Bislery 1L", quantity: 40 },
		{ productCode: "10004", label: "Baily 1L", quantity: 40 },
		{ productCode: "10005", label: "Himalayan 1L", quantity: 40 },
	]);
	const [selectedProduct, setSelectedProduct] = useState(0);
	const [focusedRow, setFocusedRow] = useState(null);
	const [filteredStockItem, setFilterdStockItem] = useState(stockItem);
	const display =
		tableData.length > 1
			? [{ label: "♦ End of List" }, ...filteredStockItem]
			: filteredStockItem;
	const [totalQuantity, setTotalQuantity] = useState("");
	const [totalAmount, setTotalAmount] = useState("");

	const handleInputChange = (e, rowIndex) => {
		const { value, name } = e.target;
		const updatedData = [...tableData];
		updatedData[rowIndex][name] = value;
		setTableData(updatedData);
		if (name === "productCode") {
			const selectedProductItem = stockItem.filter((item) =>
				item.label.toLowerCase().includes(value.toLowerCase())
			);
			setFilterdStockItem(selectedProductItem);
		}
	};

	const handleKeyDown = (e, rowIndex, colIndex) => {
		if (e.key === "Enter" && e.target.value.trim() !== "") {
			e.preventDefault();
			const nextCell = rowIndex * 2 + colIndex + 1;
			//usually focus next cell index
			if (nextCell < tableRefs.current.length && tableRefs.current[nextCell]) {
				tableRefs.current[nextCell]?.focus();
				tableRefs.current[nextCell].setSelectionRange(0, 0);
			} else {
				// add new row when reach last row
				if (rowIndex === tableData.length - 1) {
					addRow();
					//
				} else {
					tableRefs.current[(rowIndex + 1) * 2]?.focus();
					tableRefs.current[(rowIndex + 1) * 2].setSelectionRange(0, 0);
				}
			}
		} else if (e.key === "Backspace") {
			const prevCell = rowIndex * 2 + colIndex - 1;
			if (prevCell >= 0 && prevCell < tableRefs.current.length) {
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
				uom: "",
				discount: "",
				amount: "",
				allocation: [
					{
						dueOn: "",
						location: "",
						batchNo: "♦ Any",
						quantity: "",
						rate: "",
						uom: "",
						discount: "",
						amount: "",
					},
				],
			},
		]);
		setTimeout(() => {
			const rowIndex = tableData.length;
			tableRefs.current[rowIndex * 2]?.focus();
		}, 0);
		setFilterdStockItem(stockItem);
	};
	const handleFormSubmit = async () => {
		const customerName = headerData.customerName;
		const orderNo = headerData.orderNo;
		const orderItem = tableData.map((item) => ({
			productCode: item.productCode,
			description: item.description,
			dueDate: item.dueOn,
			quantity: item.quantity,
			rate: item.rate,
			uom: item.uom,
			discount: item.discount,
			amount: item.amount,
			batchWiseItem: item.allocation.map((batch) => ({
				dueDate: batch.dueOn,
				location: batch.location,
				batchNo: batch.batchNo,
				quantity: batch.quantity,
				rate: batch.rate,
				uom: batch.uom,
				discount: batch.discount,
				amount: batch.amount,
			})),
		}));
		const data = {
			customerName,
			orderNo,
			orderItem,
			narration,
		};
		console.log(data);
		await axios.post("http://localhost:8080/order/save", data);
	};
	const handleSelect = (e, item, rowIndex) => {
		if (selectedProduct < stockItem.length) {
			if (e.key === "ArrowUp" && selectedProduct > 0) {
				setSelectedProduct((prev) => prev - 1);
			} else if (
				e.key === "ArrowDown" &&
				selectedProduct < stockItem.length - 1
			) {
				setSelectedProduct((prev) => prev + 1);
			} else if (e.key === "Enter" && selectedProduct >= 0) {
				onSelected(e, item[selectedProduct], rowIndex);
				// tableRefs.current[0].focus();
			} else if (e.key === "Backspace") {
				if (e.target.value !== "") {
					return;
				} else {
					if (rowIndex > 0) {
						const prevRowIndex = rowIndex - 1;
						const prevRow = prevRowIndex * 2 + 1;
						e.preventDefault();
						tableRefs.current[prevRow]?.focus();
					} else {
						e.preventDefault();
						inputRefs.current[1]?.focus();
						inputRefs.current[1].setSelectionRange(0, 0);
					}
				}
			}
		}
	};
	const onSelected = (e, item, rowIndex) => {
		const updatedTable = [...tableData];
		updatedTable[rowIndex].productCode = item.label;
		setSelectionItem(item.label);
		if (item.label !== "♦ End of List") {
			setShowSubForm(true);
		} else {
			setShowSubForm(false);
			e.preventDefault();
			inputRefs.current[2]?.focus();
			const updated = tableData.filter((_, index) => index !== rowIndex);
			setTableData(updated);
		}
		setShowProduct(false);
	};
	const afterAllocation = (row) => {
		setTimeout(() => {
			tableRefs.current[row * 2 + 1]?.focus();
		}, 0);
	};
	useEffect(() => {
		tableRefs.current = tableRefs.current.filter((ref) => ref !== null);
	}, [tableData]);

	const handleTotalQty = () => {
		const qty = tableData.reduce(
			(sum, alloc) => sum + parseFloat(alloc.quantity || 0),
			0
		);
		if (!isNaN(qty)) {
			setTotalQuantity(parseFloat(qty).toFixed(2));
		}
	};
	const handleTotalAmount = () => {
		const amt = tableData.reduce(
			(sum, alloc) => sum + parseFloat(alloc.amount),
			0
		);
		if (!isNaN(amt)) setTotalAmount(parseFloat(amt).toFixed(2));
	};
	useEffect(() => {
		handleTotalQty();
		handleTotalAmount();
	}, []);

	return (
		<>
			<div className="bg-pink-100 w-full ">
				<Title title="Accounting Voucher Creation" nav="/" />
				<form
					action=""
					className="relative"
					onSubmit={(e) => e.preventDefault()}
				>
					<Header
						title="Purchase"
						inputRefs={inputRefs}
						data={headerData}
						setData={setHeaderData}
						tableRefs={tableRefs}
					/>
					<div className="h-[72vh] overflow-auto">
						<table>
							<thead className=" bg-[#F9F3CC] text-[12px] border border-slate-300 font-semibold sticky top-0">
								<tr className="h-[17px] leading-4 border border-slate-300">
									<th className="w-[45px] text-center border border-slate-300">
										S.No
									</th>
									<th className="w-[100px] text-center border border-slate-300">
										Product Code
									</th>
									<th className="w-[420px] text-center border border-slate-300">
										Item Name
									</th>
									<th className="w-[60px] text-center border border-slate-300">
										Due on
									</th>
									<th className="w-[70px] text-center border border-slate-300">
										Quantity
									</th>
									<th className="w-[90px] text-right border border-slate-300">
										Rate
									</th>
									<th className="w-[50px] text-center border border-slate-300">
										Per
									</th>
									<th className="w-[70px] text-center border border-slate-300">
										Discount
									</th>
									<th className="w-[70px] text-center border border-slate-300">
										Tax %
									</th>
									<th className="w-[103px] text-right border border-slate-300">
										Amount
									</th>
								</tr>
							</thead>
							<tbody>
								{tableData.map((item, rowIndex) => (
									<tr
										className=" text-[13px] h-[17px] leading-4"
										key={rowIndex}
									>
										<td className="text-center border border-slate-300 bg-white">
											{rowIndex + 1}
										</td>
										<td className="text-center border border-slate-300 bg-white">
											<input
												ref={(input) =>
													(tableRefs.current[rowIndex * 2 + 0] = input)
												}
												onChange={(e) => handleInputChange(e, rowIndex)}
												type="text"
												className="w-full outline-0 focus:bg-amber-300"
												name="productCode"
												value={item.productCode}
												onKeyDown={(e) => handleSelect(e, display, rowIndex)}
												onFocus={() => {
													setShowProduct(true);
													setFocusedRow(rowIndex);
												}}
												onBlur={() => setShowProduct(false)}
											/>
											{showProduct && (
												<SelectArea
													title="List of Stock Items"
													selectIndex={selectedProduct}
													data={display}
													onHandle={onSelected}
													allocations={item.allocation}
													extraParams={rowIndex}
												/>
											)}
										</td>

										<td className=" border border-slate-300 bg-white">
											{/* <input
											onChange={(e) => handleInputChange(e, rowIndex)}
											type="text"
											className="w-full outline-0"
											name="description"
											value={item.description}
											ref={(input) =>
												(tableRefs.current[rowIndex * 9 + 1] = input)
											}
											onKeyDown={(e) => handleKeyDown(e, rowIndex, 1)}
										/> */}
											{item.description}
										</td>
										<td className="text-center border border-slate-300 bg-white">
											{/* <input
											ref={(input) =>
												(tableRefs.current[rowIndex * 9 + 2] = input)
											}
											onChange={(e) => handleInputChange(e, rowIndex)}
											type="text"
											className="w-full outline-0 text-center"
											name="dueOn"
											value={item.dueOn}
											onKeyDown={(e) => handleKeyDown(e, rowIndex, 2)}
										/> */}
											{item.dueOn}
										</td>
										<td className="text-center border border-slate-300 bg-white">
											{/* <input
											ref={(input) =>
												(tableRefs.current[rowIndex * 9 + 3] = input)
											}
											onChange={(e) => handleInputChange(e, rowIndex)}
											className="w-full outline-0 text-right"
											type="text"
											name="quantity"
											value={item.quantity}
											onKeyDown={(e) => handleKeyDown(e, rowIndex, 3)}
										/> */}
											{item.quantity}
										</td>
										<td className="text-right border border-slate-300 bg-white">
											{/* <input
											onChange={(e) => handleInputChange(e, rowIndex)}
											className="w-full outline-0 text-right"
											type="text"
											name="rate"
											value={item.rate}
											ref={(input) =>
												(tableRefs.current[rowIndex * 9 + 4] = input)
											}
											onKeyDown={(e) => handleKeyDown(e, rowIndex, 4)}
										/> */}
											{item.rate}
										</td>
										<td className="text-center border border-slate-300 bg-white">
											{/* <input
											onChange={(e) => handleInputChange(e, rowIndex)}
											className="w-full outline-0"
											type="text"
											name="uom"
											value={item.uom}
											ref={(input) =>
												(tableRefs.current[rowIndex * 9 + 5] = input)
											}
											onKeyDown={(e) => handleKeyDown(e, rowIndex, 5)}
										/> */}
											{item.uom}
										</td>
										<td className="text-center border border-slate-300 bg-white">
											{/* <input
											onChange={(e) => handleInputChange(e, rowIndex)}
											className="w-full outline-0"
											type="text"
											name="discount"
											value={item.discount}
											ref={(input) =>
												(tableRefs.current[rowIndex * 9 + 6] = input)
											}
											onKeyDown={(e) => handleKeyDown(e, rowIndex, 6)}
										/> */}
											{item.discount ? item.discount + " %" : ""}
										</td>
										<td className="text-center border border-slate-300 bg-white">
											{/* <input
											onChange={(e) => handleInputChange(e, rowIndex)}
											className="w-full outline-0"
											type="text"
											name="tax"
											value={item.tax}
											ref={(input) =>
												(tableRefs.current[rowIndex * 9 + 7] = input)
											}
											onKeyDown={(e) => handleKeyDown(e, rowIndex, 7)}
										/> */}
											{item.tax ? item.tax + " %" : ""}
										</td>
										<td className=" border border-slate-300 bg-white cursor-default">
											<input
												onChange={(e) => handleInputChange(e, rowIndex)}
												className="w-full outline-0 text-right focus:bg-amber-300"
												type="text"
												name="amount"
												value={item.amount}
												ref={(input) =>
													(tableRefs.current[rowIndex * 2 + 1] = input)
												}
												onKeyDown={(e) => handleKeyDown(e, rowIndex, 1)}
												readOnly
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>

						{showSubForm && (
							<HierarchyTable
								isClose={setShowSubForm}
								selectionItem={selectionItem}
								orderData={tableData}
								setOrderData={setTableData}
								allocation={tableData[focusedRow].allocation}
								row={focusedRow}
								afterAllocation={afterAllocation}
							/>
						)}
					</div>
					<div className="w-[1078px] flex justify-end">
						<div className="border-double border-t border-b-4 border-slate-400 h-[22px] w-[550px] flex items-center">
							<span>{totalQuantity}</span>
							<span>{totalAmount}</span>
						</div>
					</div>
					<div className="flex justify-between ">
						<div className=" flex flex-col">
							<label htmlFor="narration" className="text-[14px] pl-1">
								Narration :
							</label>
							<textarea
								// type="text"
								ref={(el) => (inputRefs.current[2] = el)}
								name="narration"
								value={narration}
								onChange={(e) => setNarration(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										const confirmed = window.confirm("Do you want Confirm...");
										if (confirmed) {
											handleFormSubmit();
										}
									} else if (e.key === "Backspace") {
										if (inputRefs.current[2].value === "") {
											console.log();
										}
									}
								}}
								className="h-[36px] text-[13px] resize-none focus:bg-[#fee8af] overflow-hidden outline-0 focus:border focus:border-blue-400 w-[700px] bg-transparent"
								rows={1}
							/>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
export default Purchase;
