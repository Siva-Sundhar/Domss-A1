import Title from "../../utils/Title.jsx";
// import SelectArea from "../../utils/SelectArea.jsx";
import React, { useRef, useState } from "react";
import PaySub from "../PaySub.jsx";

const Payment = () => {
	const acountRef = useRef(null);
	const narrationRef = useRef(null);
	const inputRefs = useRef([]);
	const [showAccountLedger, setshowAccountLedger] = useState(false);
	const [accountName, setAccountName] = useState("");
	const [narration, setNarration] = useState("");
	const [supplier, setSupplier] = useState([
		{
			name: "",
			amount: "",
			billWise: [
				{
					reference: "",
					date: "",
					name: "",
					creditDays: "",
					forexCurrencyType: "",
					forexAmount: "",
					exchangeRate: "",
					amount: "",
					creditOrDebit: "Dr",
				},
			],
		},
	]);
	const [total, setTotal] = useState("");
	const [accountLedger] = useState([{ ledger: "Cash" }, { ledger: "Bank" }]);
	const [isOpen, setIsOpen] = useState(false);
	const [focusedIndex, setFocusedIndex] = useState(null);
	const [nameBlurred, setNameBlurred] = useState(
		Array(supplier.length).fill(false)
	);
	const [amountBlurred, setAmountBlurred] = useState(
		Array(supplier.length).fill(false)
	);
	const [ledgers] = useState([
		{ ledger: "Comic Stan" },
		{ ledger: "Super Nova" },
		{ ledger: "Blue Moon" },
		{ ledger: "Bumble bee" },
		{ ledger: "Megatron" },
	]);
	const display =
		supplier.length > 1 ? [{ ledger: "♦ End of List" }, ...ledgers] : ledgers;
	const handleNameBlur = (index) => {
		const updatedBlurred = [...nameBlurred];
		updatedBlurred[index] = true;
		setNameBlurred(updatedBlurred);
	};
	const [selectIndex, setSelectIndex] = useState(0);
	const handleAmountBlur = (index) => {
		const updatedBlurred = [...amountBlurred];
		updatedBlurred[index] = true;
		setAmountBlurred(updatedBlurred);
	};
	const inputChangeHandler = (e, rowIndex) => {
		const { name, value } = e.target;
		const updateData = [...supplier];
		updateData[rowIndex][name] = value;
		if (name === "amount" && updateData[rowIndex].billWise) {
			updateData[rowIndex].billWise.forEach((bill) => {
				bill.amount = value;
			});
		}
		setSupplier(updateData);
	};
	const [showLedger, setShowLedger] = useState(false);
	const inputFocusKey = (e, rowIndex, colIndex) => {
		const key = e.key;
		if (key === "Enter") {
			e.preventDefault();
			const nextField = rowIndex * 2 + colIndex + 1;
			if (
				inputRefs.current[nextField] &&
				nextField < inputRefs.current.length
			) {
				inputRefs.current[nextField]?.focus();
			} else if (rowIndex === supplier.length - 1) {
				addNewRow();
			}
		}
	};
	const addNewRow = () => {
		setSupplier((prev) => [
			...prev,
			{
				name: "",
				amount: "",
				billWise: [
					{
						reference: "",
						name: "",
						creditDays: "",
						forexAmount: "",
						exchangeRate: "",
						amount: "",
						creditOrDebit: "Dr",
					},
				],
			},
		]);
		const rowIndex = supplier.length;
		inputRefs.current[rowIndex * 2]?.focus();
	};
	const numberFormat = (e, rowIndex) => {
		const { name, value } = e.target;
		const cleanNumber =
			typeof item === "number" ? value : parseFloat(value.replace(/,/g, ""));
		if (isNaN(cleanNumber)) return "";

		const result = new Intl.NumberFormat("en-IN", {
			maximumFractionDigits: 2,
			minimumFractionDigits: 2,
		}).format(cleanNumber);
		const updated = [...supplier];
		updated[rowIndex][name] = result;
		if (name === "amount" && updated[rowIndex].billWise) {
			updated[rowIndex].billWise.forEach((bill) => {
				bill.amount = result;
			});
		}
		setSupplier(updated);
	};
	const handleSelect = (e, rowIndex, item) => {
		const key = e.key;
		if (selectIndex < ledgers.length) {
			if (key === "ArrowUp" && selectIndex > 0) {
				setSelectIndex((prev) => prev - 1);
			} else if (key === "ArrowDown" && selectIndex < ledgers.length - 1) {
				setSelectIndex((prev) => prev + 1);
			} else if (key === "Enter") {
				e.preventDefault();
				onSelect(item[selectIndex].ledger, rowIndex);
			}
		}
	};
	const onSelect = (item, rowIndex) => {
		const updated = [...supplier];
		updated[rowIndex].name = item;
		setSupplier(updated);
		setShowLedger(false);
		if(item !== "♦ End of List"){
			inputRefs.current[rowIndex * 2 + 1]?.focus();
		} else {
			const updated = supplier.filter((_, index) => index !== rowIndex)
            setSupplier(updated);
            narrationRef.current?.focus();
		}
		setSelectIndex(0);
		
	};
	const HandleAccountSelect = (e, item) => {
		const key = e.key;
		if (selectIndex < accountLedger.length) {
			if (key === "ArrowUp" && selectIndex > 0) {
				setSelectIndex((prev) => prev - 1);
			} else if (
				key === "ArrowDown" &&
				selectIndex < accountLedger.length - 1
			) {
				setSelectIndex((prev) => prev + 1);
			} else if (key === "Enter") {
				e.preventDefault();
				accountSelector(item[selectIndex].ledger);
			}
		}
	};
	const accountSelector = (item) => {
		setAccountName(item);
		setshowAccountLedger(false);
		inputRefs.current[0]?.focus();
		setSelectIndex(0);
	};
	const handleTotal = () => {
		const tot = supplier.reduce(
			(sum, curr) => sum + parseFloat(curr.amount.replace(/,/g, "") || 0),
			0
		);
		setTotal(tot);
	};

	return (
		<>
			<div className="bg-[#fffaf4] h-screen w-full">
				<Title title="Accounting Voucher Creation" nav={"/"} />
				<div className="relative">
					<div className="flex justify-between border-b border-slate-300 ">
						<div className="w-1/2">
							<div className=" pt-2 flex">
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
										ref={acountRef}
										name="accountName"
										autoFocus="on"
										onChange={(e) => {
											setAccountName(e.target.value);
										}}
										value={accountName}
										type="text"
										onKeyDown={(e) => HandleAccountSelect(e, accountLedger)}
										onFocus={() => setshowAccountLedger(true)}
										onBlur={() => setshowAccountLedger(false)}
										id="account"
										className="w-96 border border-transparent focus:bg-[#fee8af] focus:border-blue-500  text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
									/>
									{showAccountLedger && (
										<div className="absolute top-0 right-0 w-64 bg-[#def1fc] h-[625px] border border-slate-500 overflow-y-auto">
											<div className="sticky top-0 bg-[#def1fc]">
												<h1 className="bg-[#2a67b1] text-white pl-2 text-[13px]  top-0">
													List of Ledger Accounts
												</h1>

												<button className="w-full text-right text-[14px] mt-3 pr-2 border-b border-slate-500">
													Create
												</button>
											</div>
											<ul onMouseDown={(e) => e.preventDefault()} tabIndex="-1">
												{accountLedger.map((item, ind) => (
													<li
														key={ind}
														tabIndex="0"
														className={`px-2 h-[17px] flex justify-between items-center py-0.5 cursor-pointer text-sm ${
															selectIndex === ind ? "bg-amber-400" : ""
														}`}
														onClick={() => {
															setAccountName(item.ledger);
														}}
													>
														{item.ledger}
													</li>
												))}
											</ul>
										</div>
									)}
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
					<div className="w-full h-[465px] ">
						<table className="w-full">
							<thead>
								<tr className="border h-[17px] leading-4">
									<td className="text-[14px] font-semibold pl-10">
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
													value={item.name}
													onBlur={() => {
														handleNameBlur(index);
														setShowLedger(false);
													}}
													ref={(input) =>
														(inputRefs.current[index * 2 + 0] = input)
													}
													onKeyDown={(e) => {
														handleSelect(e, index, display);
													}}
													onFocus={() => setShowLedger(true)}
													onChange={(e) => inputChangeHandler(e, index)}
													className="outline-0 bg-transparent pl-0.5 focus:border-blue-500 focus:border focus:bg-amber-200 border border-transparent font-semibold w-80"
												/>
												{showLedger && (
													<div className="absolute top-0 right-0 w-64 bg-[#def1fc] h-[625px] border border-slate-500 overflow-y-auto">
														<div className="sticky top-0 bg-[#def1fc]">
															<h1 className="bg-[#2a67b1] text-white pl-2 text-[13px]  top-0">
																List of Ledger Accounts
															</h1>

															<button className="w-full text-right text-[14px] mt-3 pr-2 border-b border-slate-500">
																Create
															</button>
														</div>
														<ul
															onMouseDown={(e) => e.preventDefault()}
															tabIndex="-1"
														>
															{display.map((item, ind) => (
																<li
																	key={ind}
																	tabIndex="0"
																	className={`px-2 h-[17px] flex justify-between items-center py-0.5 cursor-pointer text-sm ${
																		selectIndex === ind ? "bg-amber-400" : ""
																	}`}
																	onClick={() => onSelect(item.ledger, index)}
																>
																	{item.ledger}
																</li>
															))}
														</ul>
													</div>
												)}
											</td>
											<td className="text-right">
												<input
													type="text"
													name="amount"
													onChange={(e) => inputChangeHandler(e, index)}
													ref={(input) =>
														(inputRefs.current[index * 2 + 1] = input)
													}
													value={item.amount}
													onKeyDown={(e) => {
														inputFocusKey(e, index, 1);
														if (e.key === "Enter")
															if (e.target.value.trim() !== "") {
																setIsOpen(true);
															}
													}}
													onBlur={(e) => {
														handleAmountBlur(index);
														numberFormat(e, index);
														handleTotal();
													}}
													onFocus={() => {
														setFocusedIndex(index);
													}}
													className="outline-0 bg-transparent pr-0.5 focus:border-blue-500 focus:border focus:bg-amber-200 border border-transparent font-semibold w-24 text-right"
												/>
											</td>
										</tr>
										{nameBlurred[index] && (
											<tr className="h-[17px] text-[13px] italic text-slate-600 leading-4">
												<td className="pl-10 w-0">
													Cur Bal : &nbsp;
													<span className="font-semibold">
														{amountBlurred[index] ? item.amount : ""}
													</span>
												</td>
											</tr>
										)}
										{/* {isOccupied && item.billWise.map((it, ind) => (
											<React.Fragment key={ind}>
												<table>
													<tbody>
														<tr className="leading-4 text-[13px]">
															<td className="">
																<input
																	type="text"
																	className="w-16 outline-0 bg-transparent focus:bg-amber-200 focus:border focus:border-blue-400 border border-transparent"
																	value={it.reference}
																/>
															</td>
															<td className="">
																<input
																	type="text"
																	className="w-20 font-semibold outline-0 bg-transparent focus:bg-amber-200 focus:border focus:border-blue-400 border border-transparent"
																	value={it.name}
																/>
															</td>
															<td className="">
																<input
																	type="text"
																	className="w-12 font-semibold outline-0 bg-transparent focus:bg-amber-200 focus:border focus:border-blue-400 border border-transparent"
																	value={it.creditDays}
																/>
															</td>
															<td className="">
																<input
																	type="text"
																	className="w-20 font-semibold outline-0 bg-transparent text-right focus:bg-amber-200 focus:border focus:border-blue-400 border border-transparent"
																	value={it.amount}
																/>
															</td>
															<td className="">
																<input
																	type="text"
																	className="w-7 font-semibold outline-0 bg-transparent focus:bg-amber-200 focus:border focus:border-blue-400 border border-transparent"
																	value={it.creditOrDebit}
																/>
															</td>
														</tr>
													</tbody>
												</table>
											</React.Fragment>
										))} */}
									</React.Fragment>
								))}
							</tbody>
						</table>
						{isOpen && (
							<PaySub
								data={supplier}
								setData={setSupplier}
								inputRef={inputRefs.current}
								focusedIndex={focusedIndex}
								isOpen={setIsOpen}
							/>
						)}
					</div>
				</div>
				<div className="flex">
					<div className="flex flex-col w-[85%]">
						<label htmlFor="">Narration:</label>
						<textarea
							ref={narrationRef}
							name="narration"
							type="text"
							value={narration}
							onChange={(e) => setNarration(e.target.value)}
							maxLength={280}
							className="w-[60%] outline-0 bg-transparent focus:border focus:border-blue-500 focus:bg-amber-200 h-[62px] text-[13px] resize-none"
						/>
					</div>
					<div className="text-right w-[15%]">
						<div>
							<h1 className="text-[14px] font-semibold border-t border-double border-b-4 border-slate-400 pr-0.5 h-6">
								{total
									? new Intl.NumberFormat("en-IN", {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
									}).format(total)
									: ""}
							</h1>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Payment;
