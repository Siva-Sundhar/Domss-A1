import { useRef, useState } from "react";

const SubForm = () => {
	const [isFocused, setIsFocused] = useState(false);
	const [tableData, setTableData] = useState([
		{
			due:"",
			location: "",
			batch:"",
			quantity: "",
			rate: "",
			uom: "",
			discount: "",
			amount: ""
		}
	]);
	const inputRefs = useRef([]);
	const handleKeyDown = (e, rowIndex, colIndex) => {
		if (e.key === "Enter" && e.target.value.trim() !== "") {
			e.preventDefault();
			const nextCell = rowIndex * 8 + colIndex + 1;
			//usually focus next cell index
			if (nextCell < inputRefs.current.length && inputRefs.current[nextCell]) {
				inputRefs.current[nextCell]?.focus();
			} else {
				// add new row when reach last row
				if (rowIndex === tableData.length - 1) {
					addRow();
				//
				} else {
					inputRefs.current[(rowIndex + 1) * 8]?.focus();
				}
			}
		} else if(e.key === 'Backspace'){
			const prevCell = rowIndex * 8 + colIndex - 1;
			if(e.target.value.trim() !== ""){
				return;
			} else if(prevCell >= 0 ){
				e.preventDefault();
				inputRefs.current[prevCell]?.focus();
				inputRefs.current[prevCell].setSelectionRange(0, 0);
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
			inputRefs.current[rowIndex * 8]?.focus();
		}, 0);
	};
	return (
		<div className="w-full h-screen flex justify-center items-center">
		<div className="min-w-[465px] border border-slate-500 h-[80%]">
			<div className=" min-h-[470px]">
				<h1 className="py-0.5 text-center">
					Item Allocations for : <strong>Water 1L</strong>
				</h1>
				<table className="">
					<thead>
						<tr className=" border-y border-slate-400 text-[13px] leading-5">
							<td className="text-center w-20">Due on</td>
							<td className="text-center w-32">location</td>
							<td className="text-center w-20">Batch/Lot No.</td>
							<td className="text-center w-20 font-bold">Quantity</td>
							<td className="text-center w-20 font-bold">Rate</td>
							<td className="text-center w-8">per</td>
							<td className="text-center w-12 italic">Disc %</td>
							<td className="w-24 text-right font-bold pr-0.5">Amount</td>
						</tr>
					</thead>
					<tbody>
						{tableData.map((row, rowIndex) => (
							<tr key={rowIndex}>
								<td className="text-center w-20">
									<input
										onKeyDown={(e) => handleKeyDown(e, rowIndex, 0)}
										ref={(el) => (inputRefs.current[rowIndex * 8 + 0] = el)}
										type="text"
										className="text-[13px] outline-0 w-20 focus:bg-[#fee8af] focus:border-blue-500 border border-transparent focus:border pr-0.5 h-[17px]"
										autoFocus
									/>
								</td>
								<td>
									<input
										onKeyDown={(e) => handleKeyDown(e, rowIndex, 1)}
										type="text"
										ref={(el) => (inputRefs.current[rowIndex * 8 + 1] = el)}
										className="text-[14px] outline-0 h-[17px] text-left focus:bg-[#fee8af] focus:border-blue-500 border border-transparent focus:border pr-0.5 w-32"
										// onFocus={() => setIsFocused(true)}
										// onBlur={() => setIsFocused(false)}
									/>
								</td>
								<td>
									<input
										onKeyDown={(e) => handleKeyDown(e, rowIndex, 2)}
										type="text"
										ref={(el) => (inputRefs.current[rowIndex * 8 + 2] = el)}
										className="text-[14px] outline-0 h-[17px] text-left focus:bg-[#fee8af] focus:border-blue-500 border border-transparent focus:border pr-0.5 w-28"
									/>
								</td>
								<td>
									<input
										onKeyDown={(e) => handleKeyDown(e, rowIndex, 3)}
										ref={(el) => inputRefs.current[rowIndex * 8 + 3] = el}
										type="text"
										className="text-[14px] outline-0 h-[17px] text-right focus:bg-[#fee8af] focus:border-blue-500 border border-transparent focus:border pr-0.5 w-20"
									/>
								</td>
								<td>
									<input
										onKeyDown={(e) => handleKeyDown(e, rowIndex, 4)}
										type="text"
										ref={(el) => inputRefs.current[rowIndex * 8 + 4] = el}
										className="text-[14px] outline-0 h-[17px] text-right focus:bg-[#fee8af] focus:border-blue-500 border border-transparent focus:border pr-0.5 w-20"
										// onFocus={() => setIsFocused(true)}
										// onBlur={() => setIsFocused(false)}
									/>
								</td>
								<td>
									<input
										onKeyDown={(e) => handleKeyDown(e, rowIndex, 5)}
										ref={(el) => inputRefs.current[rowIndex * 8 + 5] = el}
										type="text"
										className="text-[14px] outline-0 h-[17px] text-right focus:bg-[#fee8af] focus:border-blue-500 border border-transparent focus:border pr-0.5 w-8"
										// onFocus={() => setIsFocused(true)}
										// onBlur={() => setIsFocused(false)}
									/>
								</td>
								<td>
									<input
										onKeyDown={(e) => handleKeyDown(e, rowIndex, 6)}
										ref={(el) => inputRefs.current[rowIndex * 8 + 6] = el}
										type="text"
										className="text-[14px] outline-0 h-[17px] text-right focus:bg-[#fee8af] focus:border-blue-500 border border-transparent focus:border pr-0.5 w-12"
										// onFocus={() => setIsFocused(true)}
										// onBlur={() => setIsFocused(false)}
									/>
								</td>
								<td>
									<input
										onKeyDown={(e) => handleKeyDown(e, rowIndex, 7)}
										ref={(el) => inputRefs.current[rowIndex * 8 + 7] = el}
										type="text"
										className="text-[14px] outline-0 h-[17px] text-right focus:bg-[#fee8af] focus:border-blue-500 border border-transparent focus:border pr-0.5 w-24 "
										// onFocus={() => setIsFocused(true)}
										// onBlur={() => setIsFocused(false)}
									/>
								</td>
							</tr>
						))}

					</tbody>
					
				</table>
				</div>
				<div className="border-t border-double border-b-4 ">Total</div>
			</div>
			
		</div>
		
	);
};
export default SubForm;
