import PropTypes from "prop-types";
import SelectArea from "./SelectArea";
import { useState } from "react";
const Header = ({ title, inputRefs, data, setData, tableRefs}) => {
	
	const [ShowCustomer, setShowCustomer] = useState(false);
	const [selectIndex, setSelectIndex] = useState(0);
	const [customerName] = useState([
		{ label: "Ramco" },
		{ label: "Coramandal" },
		{ label: "Tnpl Ltd" },
		{ label: "Jsw" },
	]);
	const [filteredCustomer, setFilteredCustomer] = useState(customerName)
	
	const handleChange = (e)=>{
		const {name, value} = e.target;
		setData((prevData) => ({ ...prevData, [name]: value }));
		if(name === 'customerName'){
			const filteredData = customerName.filter((cust)=> cust.label.toLowerCase().includes(value))
		setFilteredCustomer(filteredData)
		}
	}
	
	const handleSelect = (e, data) => {
		
		if (selectIndex < data.length) {
			if (e.key === "ArrowUp" && selectIndex > 0) {
				setSelectIndex((prev) => prev - 1);
			} else if (
				e.key === "ArrowDown" &&
				selectIndex < data.length - 1
			) {
				setSelectIndex((prev) => prev + 1);
			} else if (e.key === "Enter" && selectIndex >= 0) {
				if (data === customerName) {
					updateData(e,data[selectIndex]);
					setShowCustomer(false);
					inputRefs.current[1]?.focus();
					inputRefs.current[1].setSelectionRange(0,0)
				} 
				// tableRefs.current[0].focus();
			} else if (e.key === "Backspace") {
				if (e.target.value !== "") {
					return;
				} else {
					e.preventDefault();
					inputRefs.current[0]?.focus();
				}
			}
		}
	};
	const updateData = (e,value) => {
		setData((prevData) => ({
			...prevData,
			customerName: value.label,
		}));
		inputRefs.current[1]?.focus();
		setShowCustomer(false)
	};

	return (
		<>
			<div className="flex justify-between border-b border-slate-300">
				<div className="w-1/2">
					<div className=" pt-2  flex ">
						<label className="bg-[#2a67b1] text-center text-[13px] text-white font-semibold  h-[19px] w-32">
							{title}
						</label>
						<span className="text-[14px] font-semibold">
							&nbsp;No.&nbsp;&nbsp;1
						</span>
					</div>

					<div className=" ">
						<div className="flex leading-4 px-1">
							<label htmlFor="custNo" className="w-32 text-[14px]">
								Customer Name
							</label>
							<div className="mr-0.5">:</div>
							<input
								ref={(el) => (inputRefs.current[0] = el)}
								name="customerName"
								autoComplete="off"
								onChange={handleChange}
								value={data.customerName}
								type="text"
								autoFocus
								onKeyDown={(e) => handleSelect(e, customerName)}
								onFocus={() => setShowCustomer(true)}
								onBlur={() => {
									setShowCustomer(false);
									// setData((prevData) => ({ ...prevData, orderNo: e.target.value }));
								}}
								id="custNo"
								className="w-60 border border-transparent h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
							/>
							{ShowCustomer && (
								<SelectArea
									title={"List of Ledger Accounts"}
									data={filteredCustomer}
									selectIndex={selectIndex}
									onHandle={updateData}
								/>
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
					<label htmlFor="" className="text-[14px] text-right font-semibold">
						12-Aug-24
					</label>
					<label className="text-[13px] text-right">Monday</label>
					<div className="flex leading-4 pt-5">
						<label className="text-[13px] w-24">Order No</label>
						<div className="mx-0.5">:</div>
						<input
							type="text"
							id="orderNo"
							value={data.orderNo}
							onChange={handleChange}
							name="orderNo"
							ref={(el) => (inputRefs.current[1] = el)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									tableRefs.current[0]?.focus();
								} else if (e.key === "Backspace") {
									if (e.target.value !== "") {
										return;
									} else {
										e.preventDefault();
										inputRefs.current[0]?.focus();
										inputRefs.current[0].setSelectionRange(0,0)
									}
								}
							}}
							className="outline-0 border border-transparent font-semibold pl-0.5 h-[18px] focus:bg-[#fee8af] focus:border focus:border-blue-500 text-[13px] bg-transparent"
						/>
					</div>
				</div>
			</div>
		</>
	);
};
export default Header;
Header.propTypes = {
	title: PropTypes.string.isRequired,
	inputRefs: PropTypes.object.isRequired,
	data: PropTypes.shape(PropTypes.object.isRequired).isRequired,
	setData: PropTypes.func.isRequired,
	tableRefs: PropTypes.object.isRequired
};
