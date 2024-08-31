import Title from "../../utils/Title.jsx";
// import SelectArea from "../../utils/SelectArea.jsx";
import React, { useRef, useState } from "react";

const Payment = () => {
	const inputRefs = useRef([]);
	const [supplier, setSupplier] = useState([
		{
			name: "",
			amount: "",
		},
	]);
	const [nameBlurred, setNameBlurred] = useState(
		Array(supplier.length).fill(false)
	);
	const [amountBlurred, setAmountBlurred] = useState(
		Array(supplier.length).fill(false)
	);

	const handleNameBlur = (index) => {
		const updatedBlurred = [...nameBlurred];
		updatedBlurred[index] = true;
		setNameBlurred(updatedBlurred);
	};

	const handleAmountBlur = (index) => {
		const updatedBlurred = [...amountBlurred];
		updatedBlurred[index] = true;
		setAmountBlurred(updatedBlurred);
	};
	const inputChangeHandler = (e, rowIndex) => {
		const { name, value } = e.target;
		const updateData = [...supplier];
		updateData[rowIndex][name] = value;
		setSupplier(updateData);
	};

	// const [state, setState] = useState(initState);
	return (
		<>
			<div className="bg-[#fffaf4] h-screen">
				<Title title="Accounting Voucher Creation" nav={"/"} />
				<div className="">
					<div className="flex justify-between border-b border-slate-300 ">
						<div className="w-1/2">
							<div className=" pt-2  flex ">
								<label className="bg-[#2a67b1] text-center text-[13px] text-white font-semibold  h-[19px] w-32">
									Payment
								</label>
								<span className="text-[14px] font-semibold">
									&nbsp;No.&nbsp;&nbsp;1
								</span>
							</div>

							<div className=" my-1">
								<div className="flex leading-4 px-1">
									<label htmlFor="custNo" className="w-32 text-[14px]">
										Account
									</label>
									<div className="mr-1">:</div>
									<input
										ref={(el) => (inputRefs.current[0] = el)}
										name="account"
										autoComplete="on"
										// onChange={handleChange}
										// value={data.customerName}
										type="text"
										// autoFocus
										// onKeyDown={(e) => handleSelect(e, customerName)}
										// onFocus={() => setShowCustomer(true)}
										// onBlur={() => setShowCustomer(false)}
										id="account"
										className="w-60 border border-transparent focus:bg-[#fee8af] focus:border-blue-500  text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
									/>
									{/*{ShowCustomer && (*/}

									{/*    <SelectArea*/}
									{/*        title={"List of Ledger Accounts"}*/}
									{/*        data={customerName}*/}
									{/*        selectIndex={selectIndex}*/}
									{/*        onHandle={updateData}*/}

									{/*    />*/}
									{/*)}*/}
								</div>
								<div className="flex leading-4 px-1 my-0.5">
									<label
										htmlFor="currentBalance"
										className="w-32 text-[13px] italic text-slate-500"
									>
										Current balance
									</label>
									<div className="mr-0.5 text-slate-500">:</div>
								</div>
							</div>
						</div>
						<div className="pt-1 flex flex-col px-1">
							<label
								htmlFor=""
								className="text-[14px] text-right font-semibold"
							>
								12-Aug-24
							</label>
							<label className="text-[13px] text-right">Monday</label>
						</div>
					</div>
					<div className="w-full ">
						<table className="w-full">
							<thead>
								<tr className="border h-[17px] leading-4">
									<td className="text-[14px]  font-semibold pl-10">
										Particulars
									</td>
									<td className=" text-right text-[14px] font-semibold">
										Amount
									</td>
								</tr>
							</thead>
							<tbody>
								<tr className="h-[17px] text-[13px] leading-4"></tr>
								{supplier.map((item, index) => (
									<React.Fragment key={index}>
										<tr className="h-[17px] text-[13px] leading-4">
											<td className="">
												<input
													type="text"
													name="name"
													onBlur={() => handleNameBlur(index)}
													onChange={(e) => inputChangeHandler(e, index)}
													className="outline-0 bg-transparent pl-1 focus:border-blue-400 focus:border focus:bg-amber-200 border border-transparent font-semibold"
												/>
											</td>
											<td className="text-right ">
												<input
													type="text"
													name="amount"
													onChange={(e) => inputChangeHandler(e, index)}
													onBlur={() => handleAmountBlur(index)}
													className="outline-0 bg-transparent pl-1 focus:border-blue-400 focus:border focus:bg-amber-200 border border-transparent font-semibold w-24 text-right"
												/>
											</td>
										</tr>
										{nameBlurred[index] && (
											<tr className="h-[17px] text-[13px] italic text-slate-600 leading-4">
												<td className="pl-10 w-0">
													Cur Bal: <span className="font-semibold">{amountBlurred[index] ? item.amount : ""}</span>
												</td>
											</tr>
										)}
									</React.Fragment>
								))}
							</tbody>
						</table>
                        
					</div>
				</div>
			</div>
		</>
	);
};

export default Payment;
