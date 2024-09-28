import React, { useRef, useState } from "react";
import Title from "../../utils/Title";
import SubForm from "../SubForm";

const Journal = () => {

	const partyRef = useRef([])
	const debitRef = useRef([])
	const creditRef = useRef([])
	const [showAgainst, setShowAgainst] = useState(false)
	const [totalDebit, setTotalDebit] = useState('')
	const [totalCredit, setTotalCredit] = useState('')
	const narrationRef = useRef(null);
	const [narration, setNarration] = useState("");
	const [inputData, setInputData] = useState([
		{
			creditOrDebit: "Dr",
			name: "",
			debitAmount: "",
			creditAmount: "",
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
	const drCr = ['Cr', 'Dr']
	const inputChangeHandler = (e, index) => {
		const { name, value } = e.target;
		const updated = [...inputData];
		updated[index][name] = value;
		
		if(name === 'debitAmount' || name === 'creditAmount' || name === 'creditOrDebit' && updated[index].billWise){
			updated[index].billWise.forEach((bill) => {
				bill[name] = value;
		})}
		setInputData(updated);
	};
	const [selectIndex, setSelectIndex] = useState(0);
    const [showPartyLedger, setShowPartyLedger] = useState(false);
	const partyLedger = [
		{
			partyName: "Arun Enterprises",
		},
		{
			partyName: "Ram Enterprises",
		},
	];
	const [focusedIndex, setFocusedIndex] = useState(null)
	const [isOpen, setIsOpen] = useState(false)
    const handleSelect = (e,index, item)=>{
        const key = e.key
        if(selectIndex < partyLedger.length){
            if (key === 'ArrowDown' && selectIndex < partyLedger.length - 1){
                setSelectIndex(prev => prev + 1)
            } else if(key === 'ArrowUp' && selectIndex > 0){
                setSelectIndex(prev => prev - 1)
            } else if(key === 'Enter'){
                onSelect(item[selectIndex].partyName, index)
            }
        }
    }
    const onSelect = (item, index)=>{
        const updated = [...inputData]
        updated[index].name = item
        setInputData(updated);
        setShowPartyLedger(false)
    }
	const numberFormat = (e, index )=>{
		const {value, name} = e.target;
		const cleanNumber = typeof value === 'number' ? value : parseFloat(value.replace(/,/g, ""));

		if(isNaN(cleanNumber)) return "";

		const result = new Intl.NumberFormat("en-In",{
			maximumFractionDigits: 2,
			minimumFractionDigits: 2,
		}).format(cleanNumber);
		const updated = [...inputData]
		updated[index][name] = result;
		if(name === 'debitAmount' || name === 'creditAmount' && updated[index].billWise){
			updated[index].billWise.forEach((bill) => {
				bill.amount = result;
		})}
		setInputData(updated)
	}
	const addNewRow = (payLoad)=>{
		
		setInputData((prev)=> [
			...prev,
			{
				creditOrDebit: payLoad,
				name: "",
				debitAmount: "",
				creditAmount: "",
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
						creditOrDebit: payLoad,
					},
				],
			},
		])
		setTimeout(()=>{
			partyRef.current[inputData.length + 1]?.focus();
		},0)
	}
	const totalCreditCalculation = () => {
		const total = inputData.reduce(
			(sum, acc) => sum + parseFloat(acc.creditAmount.replace(/,/g, "") || 0),
			0
		);
		setTotalCredit(
			new Intl.NumberFormat("en-In", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}).format(total)
		);
	};
	const totalDebiCalculation = () => {
		const total = inputData.reduce(
			(sum, acc) => sum + parseFloat(acc.debitAmount.replace(/,/g, "") || 0),
			0
		);
		setTotalDebit(
			new Intl.NumberFormat("en-In", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}).format(total)
		);
	};
	const handleSuggestion = 
	const onSuggestionSelect = (item, index)=>{
		const updated = [...inputData]
		updated[index].creditOrDebit = item;
		setInputData(updated);
		setShowAgainst(false)
		partyRef.current[index * 2 + 1]?.focus()
	}
	const suggestion = (index) => {
		return (
			<div className="absolute left-7 -top-7 border border-slate-500 z-10 h-[80px] w-28 bg-[#def1fc]">
				
				<h1 className="bg-[#2a67b1] text-white pl-2 text-[13px] ">
					Dr/Cr
				</h1>

				<ul
					onMouseDown={(e) => e.preventDefault()}
					tabIndex="-1"
					className="mt-3"
				>
					{drCr.map((item, ind) => (
						<li
							key={ind}
							tabIndex="0"
							className={`px-2 h-[17px] flex justify-between items-center py-0.5  cursor-pointer text-sm ${
								selectIndex === ind ? "bg-amber-300" : ""
							}`}
							onClick={() => onSuggestionSelect(item, index)}
						>
							{item}
						</li>
					))}
				</ul>
			</div>
		);
	};
	return (
		<>
			<div className="h-screen">
				<Title title="Accounting Voucher Creation" nav={"/"} />
				<div className="relative">
					<div className="flex justify-between border-b border-slate-300 min-h-16 ">
						<div className="w-1/2 ">
							<div className=" pt-2 flex">
								<label className="bg-[#2a67b1] text-center text-[13px] text-white font-semibold  h-[19px] w-32">
									Journal
								</label>
								<span className="text-[14px] font-semibold">
									&nbsp;No.&nbsp;&nbsp;1
								</span>
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

					<div className="w-full h-[475px] ">
						<table className="w-full">
							<thead>
								<tr className="text-[14px] leading-4 border">
									<th className="text-left"> </th>
									<th className="text-left w-[78%]">Particular</th>
									<th className="text-right w-[10%]">Debit</th>
									<th className="text-right w-[10%]">Credit</th>
								</tr>
							</thead>
							<tbody>
								<tr className="h-4"></tr>
								{inputData.map((item, rowIndex) => (
									<React.Fragment key={rowIndex}>
										<tr className="text-[13px] leading-4 ">
											<td className="relative">
												{rowIndex === 0 ? (
													<span className="pl-0.5 border border-transparent">
														{item.creditOrDebit}
													</span>
												) : (
													<input
														type="text"
														name="creditOrDebit"
														value={item.creditOrDebit}
														onChange={(e) => inputChangeHandler(e, rowIndex)}
														onFocus={() => {
															setFocusedIndex(rowIndex);
															setShowAgainst(true);
														}}
														onKeyDown={(e)=> handleSuggestion(e, rowIndex, drCr)}
														onBlur={() => setShowAgainst(false)}
														ref={(par) =>
															(partyRef.current[rowIndex * 2 + 0] = par)
														}
														className="w-6 border border-transparent outline-0 focus:bg-amber-200 focus:border focus:border-blue-500 pl-0.5"
													/>
												)}
												{showAgainst && focusedIndex === rowIndex && (suggestion(rowIndex))}
											</td>
											<td>
												<input
													type="text"
													autoFocus="on"
													className="w-96 border border-transparent outline-0 focus:bg-amber-200 focus:border focus:border-blue-500 pl-0.5 font-semibold"
													name="name"
													ref={(par) =>
														(partyRef.current[rowIndex * 2 + 1] = par)
													}
													value={item.name}
													onFocus={() => {
														setShowPartyLedger(true);
														setFocusedIndex(rowIndex);
													}}
													onBlur={() => setShowPartyLedger(false)}
													onChange={(e) => inputChangeHandler(e, rowIndex)}
													onKeyDown={(e) => {
														handleSelect(e, rowIndex, partyLedger);
														if (e.key === "Enter") {
															if (item.creditOrDebit.toLowerCase() === "dr") {
																debitRef.current[rowIndex * 1 + 0]?.focus();
															} else if (
																item.creditOrDebit.toLowerCase() === "cr"
															) {
																creditRef.current[rowIndex * 1 + 0]?.focus();
															}
														}
													}}
												/>
												{showPartyLedger && (
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
															{partyLedger.map((item, ind) => (
																<li
																	key={ind}
																	tabIndex="0"
																	className={`px-2 h-[17px] flex justify-between items-center py-0.5 cursor-pointer text-sm ${
																		selectIndex === ind ? "bg-amber-400" : ""
																	}`}
																	onClick={() =>
																		onSelect(item.partyName, rowIndex)
																	}
																>
																	{item.partyName}
																</li>
															))}
														</ul>
													</div>
												)}
											</td>
											<td className="w-[10%] text-right">
												{item.creditOrDebit.toLowerCase() === "dr" ? (
													<input
														type="text"
														className="w-28 border border-transparent outline-0 focus:bg-amber-200 focus:border focus:border-blue-500 text-right pr-0.5"
														name="debitAmount"
														ref={(deb) =>
															(debitRef.current[rowIndex * 1 + 0] = deb)
														}
														value={item.debitAmount}
														onChange={(e) => inputChangeHandler(e, rowIndex)}
														onFocus={() => setFocusedIndex(rowIndex)}
														onBlur={(e) => {
															totalDebiCalculation();
															numberFormat(e, rowIndex);
														}}
														onKeyDown={(e) => {
															if (e.key === "Enter") {
																if (e.target.value.trim() !== "") {
																	setIsOpen(true);
																}
															}
														}}
													/>
												) : (
													""
												)}
											</td>
											<td className=" w-[10%] text-right">
												{item.creditOrDebit.toLowerCase() === "cr" ? (
													<input
														type="text"
														className="w-28 border border-transparent outline-0 focus:bg-amber-200 focus:border focus:border-blue-500 text-right pr-0.5"
														name="creditAmount"
														ref={(cre) =>
															(creditRef.current[rowIndex * 1 + 0] = cre)
														}
														value={item.creditAmount}
														onChange={(e) => inputChangeHandler(e, rowIndex)}
														onBlur={(e) => {
															totalCreditCalculation();
															numberFormat(e, rowIndex);
														}}
														onFocus={() => setFocusedIndex(rowIndex)}
														onKeyDown={(e) => {
															if (e.key === "Enter") {
																if (e.target.value.trim() !== "") {
																	setIsOpen(true);
																}
															}
														}}
													/>
												) : (
													""
												)}
											</td>
										</tr>
									</React.Fragment>
								))}
							</tbody>
						</table>
						{isOpen && (
							<SubForm
								data={inputData}
								setData={setInputData}
								inputRef={partyRef.current}
								focusedIndex={focusedIndex}
								isOpen={setIsOpen}
								addNewRow={addNewRow}
								narrationRef={narrationRef.current}
								totalCredit={parseFloat(totalCredit.replace(/,/g, "") || 0)}
								totalDebit={parseFloat(totalDebit.replace(/,/g, "") || 0)}
							/>
						)}
					</div>
				</div>
				<div className="flex ">
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
						<div className="flex justify-between border-t border-double border-b-4 border-slate-400 px-1 leading-4">
							<h4 className="text-[14px] font-semibold  pr-0.5 h-4">
								{totalDebit}
							</h4>
							<h1 className="text-[14px] font-semibold  pr-0.5 h-4">
								{totalCredit}
							</h1>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Journal;
