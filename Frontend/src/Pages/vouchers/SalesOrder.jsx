import { useRef, useState } from "react";
import Title from "../../utils/Title";
import Header from "../../utils/Header";
import SelectArea from "../../utils/SelectArea";

const SalesOrder = () => {
	
	const [showProduct, setShowProduct] = useState(false)
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

	const [headerData, setHeaderData] = useState({
		customerName: "",
		currentBalance1: "",
		orderNo: ""
	})
	const [narration, setNarration] = useState("");
	
	const [stockItem, setStockItem] = useState([
		{ productCode: 10001, label: "Aquafina 1L", quantity: 40 },
		{ productCode: 10002, label: "Kinley 1L", quantity: 40 },
		{ productCode: 10003, label: "Bislery 1L", quantity: 40 },
		{ productCode: 10004, label: "Baily 1L", quantity: 40 },
		{ productCode: 10005, label: "Himalayan 1L", quantity: 40 },
		
	]);
	

	const handleInputChange = (e, rowIndex) => {
		const { value, name } = e.target;
		const updatedData = [...tableData];
		updatedData[rowIndex][name] = value;
		setTableData(updatedData);
	};
	
	const handleKeyDown = (e, rowIndex, colIndex) => {
		if (e.key === "Enter" && e.target.value.trim() !== "") {
			e.preventDefault();
			const nextCell = rowIndex * 8 + colIndex + 1;
			//usually focus next cell index
			if (nextCell < tableRefs.current.length && tableRefs.current[nextCell]) {
				tableRefs.current[nextCell]?.focus();
			} else {
				// add new row when reach last row
				if (rowIndex === tableData.length - 1) {
					addRow();
				//
				} else {
					tableRefs.current[(rowIndex + 1) * 8]?.focus();
				}
			}
		} else if(e.key === 'Backspace'){
			const prevCell = rowIndex * 8 + colIndex - 1;
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
			tableRefs.current[rowIndex * 8]?.focus();
		}, 0);
	};
	const handleFormSubmit = ()=>{
		const customerName = headerData.customerName;
		const ledger = headerData.salesLedger
		const orderNo = headerData.orderNo
		const data =  {
			customerName,
			ledger,
			orderNo,
			tableData,
			narration
		}
		console.log(data)
	}

  const handleClick = (item) =>{
    
  }
	

	return (
		<>
			<Title title="Order Voucher Creation" />
			<form action="" className="relative" onSubmit={(e) => e.preventDefault()}>
				<Header
					title="Sales Order"
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
								<th className="w-[90px] text-center border border-slate-300">
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
									<td className="text-center border border-slate-300 bg-white  ">
										<input
											ref={(input) =>
												(tableRefs.current[rowIndex * 8 + 0] = input)
											}
											onChange={(e) => handleInputChange(e, rowIndex)}
											type="text"
											className="w-full outline-0 "
											name="productCode"
											value={item.productCode}
											onKeyDown={(e) => handleKeyDown(e, rowIndex, 0)}
											onFocus={()=> setShowProduct(true)}
											onBlur={()=> setShowProduct(false)}
										/>
										{
											showProduct && (
                        
												<SelectArea 
                          title="List of Stock Items"
                          data={stockItem}
                          onHandle={handleClick}
                        />
                        
											)
										}
									</td>
									<td className="text-center border border-slate-300 bg-white">
										<input
											onChange={(e) => handleInputChange(e, rowIndex)}
											type="text"
											className="w-full outline-0"
											name="description"
											value={item.description}
											ref={(input) =>
												(tableRefs.current[rowIndex * 8 + 1] = input)
											}
											onKeyDown={(e) => handleKeyDown(e, rowIndex, 1)}
										/>
									</td>
									<td className="text-center border border-slate-300 bg-white">
										<input
											ref={(input) =>
												(tableRefs.current[rowIndex * 8 + 2] = input)
											}
											onChange={(e) => handleInputChange(e, rowIndex)}
											type="text"
											className="w-full outline-0 text-center"
											name="dueOn"
											value={item.dueOn}
											onKeyDown={(e) => handleKeyDown(e, rowIndex, 2)}
										/>
									</td>
									<td className="text-center border border-slate-300 bg-white">
										<input
											ref={(input) =>
												(tableRefs.current[rowIndex * 8 + 3] = input)
											}
											onChange={(e) => handleInputChange(e, rowIndex)}
											className="w-full outline-0 text-right"
											type="text"
											name="quantity"
											value={item.quantity}
											onKeyDown={(e) => handleKeyDown(e, rowIndex, 3)}
										/>
									</td>
									<td className="text-center border border-slate-300 bg-white">
										<input
											onChange={(e) => handleInputChange(e, rowIndex)}
											className="w-full outline-0"
											type="text"
											name="rate"
											value={item.rate}
											ref={(input) =>
												(tableRefs.current[rowIndex * 8 + 4] = input)
											}
											onKeyDown={(e) => handleKeyDown(e, rowIndex, 4)}
										/>
									</td>
									<td className="text-center border border-slate-300 bg-white">
										<input
											onChange={(e) => handleInputChange(e, rowIndex)}
											className="w-full outline-0"
											type="text"
											name="per"
											value={item.per}
											ref={(input) =>
												(tableRefs.current[rowIndex * 8 + 5] = input)
											}
											onKeyDown={(e) => handleKeyDown(e, rowIndex, 5)}
										/>
									</td>
									<td className="text-center border border-slate-300 bg-white">
										<input
											onChange={(e) => handleInputChange(e, rowIndex)}
											className="w-full outline-0"
											type="text"
											name="discount"
											value={item.discount}
											ref={(input) =>
												(tableRefs.current[rowIndex * 8 + 6] = input)
											}
											onKeyDown={(e) => handleKeyDown(e, rowIndex, 6)}
										/>
									</td>
									<td className="text-center border border-slate-300 bg-white">
										<input
											onChange={(e) => handleInputChange(e, rowIndex)}
											className="w-full outline-0"
											type="text"
											name="tax"
											value={item.tax}
											ref={(input) =>
												(tableRefs.current[rowIndex * 8 + 7] = input)
											}
											onKeyDown={(e) => handleKeyDown(e, rowIndex, 7)}
										/>
									</td>
									<td className="text-center border border-slate-300 bg-white cursor-default">
										<input
											onChange={(e) => handleInputChange(e, rowIndex)}
											className="w-full outline-0"
											type="text"
											name="amount"
											value={item.amount}
											ref={(input) =>
												(tableRefs.current[rowIndex * 8 + 8] = input)
											}
											onKeyDown={(e) => handleKeyDown(e, rowIndex, 8)}
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
							name="narration"
							value={narration}
							onChange={(e) => setNarration(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									const confirmed = window.confirm("Do you want Confirm...");
									if (confirmed) {
										handleFormSubmit();
									}
								}
							}}
							className="h-[36px] text-[13px] resize-none focus:bg-[#fee8af] overflow-hidden outline-0 focus:border focus:border-blue-400 w-[700px]"
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
export default SalesOrder;
