import React, { useEffect, useRef } from "react";
import ModalTitle from "../utils/ModalTitle";
import PropTypes from 'prop-types'


const PaymentSub = ({data, setData, inputRef, focusedIndex, isOpen}) => {
	
	const inputRefs = useRef([]);
	const inputFocusKey = (e, rowIndex, colIndex) => {
		const key = e.key;
		if (key === "Enter") {
			const nextField = rowIndex * 5 + colIndex + 1;
			if (
				inputRefs.current[nextField] &&
				nextField < inputRefs.current.length
			) {
				inputRefs.current[nextField]?.focus();
			}
		}
	};

    const handleInputChange = (e, rowIndex)=>{
        const {name, value} = e.target;
        const updatedData = [...data];
        const billData= [...updatedData[focusedIndex].billWise];
        billData[rowIndex][name] = value;
        updatedData[focusedIndex].billWise = billData
        setData(updatedData);
    }
    useEffect(()=>{
        inputRefs.current[0]?.focus();
    },[])

    const NumberFormat = (item)=>{
        const cleanNumber = typeof item === "number" ? item : parseFloat(item.replace(/,/g, ""));

        if(isNaN(cleanNumber)) return "";
        const result = new Intl.NumberFormat('en-In',{
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            style:"currency",
            currency:"INR",
        }).format(cleanNumber)
        return result.replace(/(\D)/, '$1 ');
    }
    const withoutCurrency = (e, index)=>{
		const {name, value} = e.target;
        const cleanNumber = typeof item === "number" ? value : parseFloat(value.replace(/,/g, ""));

        if(isNaN(cleanNumber)) return "";

        const result = new Intl.NumberFormat('en-In',{
            minimumFractionDigits:2,
            maximumFractionDigits:2
        }).format(cleanNumber)

		const updated = [...data]
		updated[focusedIndex].billWise[index][name] = result;
		setData(updated);
    }
    
	return (
		<>
			<div className="w-full fixed inset-0 bg-slate-300 bg-opacity-85 z-50 flex flex-col items-center">
				<div className="flex items-center justify-between w-full ">
					<ModalTitle title={"Stock Item Allocations"} />
				</div>
				<div className=" min-w-[465] flex justify-start items-center h-[100%] ">
					<div className="min-h-[480px] bg-white border border-slate-500 ">
						<div className="text-[15px] pt-1 w-full flex">
							<label className="pl-1 w-[135px]">Bill-wise Details for</label>
							<span className="mr-1">:</span>
							<span className="font-semibold">{data[focusedIndex].name}</span>
						</div>
						<div className="text-[15px] leading-4 flex w-full">
							<label htmlFor="" className="pl-1 w-[135px]">Up to</label> 
							<span className="mr-1">:</span>	
							<span className="font-semibold ">{NumberFormat(data[focusedIndex].amount)}</span>
						</div>
						<div className="h-[440px] overflow-auto mt-2">
							<table>
								<thead>
									<tr className="leading-5 text-[13px] font-semibold border-y border-slate-400">
										<td className="align-top ">Type of Ref</td>
										<td className="align-top pl-4">Ref.Name</td>
										<td className="align-top">
											Due Date
										</td>
										<td className="align-top text-right pr-2">Amount</td>
										<td className="align-top">
											Dr/Cr
										</td>
									</tr>
								</thead>
								<tbody>
                                <tr className="h-4"></tr>
									{data[focusedIndex].billWise.map((item, index) => (
										<React.Fragment key={index}>
											
											<tr className="text-[13px] leading-4">
												<td>
													<input
                                                        autoFocus="on"
                                                        type="text"
														className=" w-24 outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent pl-0.5 "
														value={item.reference}
                                                        name="reference"
                                                        ref={(input)=> inputRefs.current[index * 5 + 0] = input}
                                                        onChange={(e) => handleInputChange(e, index)}
                                                        onKeyDown={(e)=> inputFocusKey(e, index, 0)}
													/>
												</td>
												<td>
													<input
														type="text"
														className=" w-28 outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent font-bold pl-0.5 "
														value={item.name}
                                                        name="name"
                                                        onChange={(e) => handleInputChange(e, index)}
                                                        ref={(input)=> inputRefs.current[index * 5 + 1] = input}
                                                        onKeyDown={(e)=> inputFocusKey(e, index, 1)}
													/>
												</td>
												<td>
													<input
														type="text"
														className=" w-24 outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent font-bold text-right pr-0.5 "
														value={item.creditDays}
                                                        name="creditDays"
                                                        onChange={(e)=> handleInputChange(e, index)}
                                                        ref={(input)=> inputRefs.current[index * 5 + 2] = input}
                                                        onKeyDown={(e)=> inputFocusKey(e, index, 2)}
													/>
												</td>
												<td>
													<input
														type="text"
														className=" w-24 outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent font-bold text-right pr-0.5 "
														value= {item.amount}
                                                        name="amount"
                                                        onChange={(e)=> handleInputChange(e, index)}
                                                        ref={(input)=> inputRefs.current[index * 5 + 3] = input}
                                                        onKeyDown={(e)=> inputFocusKey(e, index, 3)}
														onBlur={(e)=> withoutCurrency(e, index)}
													/>
												</td>
												<td>
													<input
														type="text"
														className=" w-7 outline-0 border border-transparent focus:border focus:border-blue-500 focus:bg-amber-200 bg-transparent font-bold pl-0.5 "
														value={item.creditOrDebit}
                                                        name="creditOrDebit"
                                                        onChange={(e) => handleInputChange(e, index)}
                                                        ref={(input)=> inputRefs.current[index * 5 + 4] = input}
                                                        onKeyDown={(e)=> {
															inputFocusKey(e, index, 4)
															if (e.key === 'Enter') {
																isOpen(false)
																inputRef.current[(focusedIndex + 1) * 2]?.focus()
															}}
														}
													/>
												</td>
											</tr>
										</React.Fragment>
									))}
								</tbody>
							</table>
						</div>
                        <div className="mb-2 flex justify-end">
                            <span className="text-right pr-1 font-semibold border-t border-double border-b-4 border-slate-500">{NumberFormat(data[focusedIndex].amount)} Dr</span>
                        </div>
                        
					</div>
                    
				</div>
			</div>
		</>
	);
};
export default PaymentSub;

PaymentSub.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
	setData: PropTypes.func,
	focusedIndex: PropTypes.number,
	isOpen: PropTypes.func,
	inputRef: PropTypes.arrayOf(PropTypes.object)
}
