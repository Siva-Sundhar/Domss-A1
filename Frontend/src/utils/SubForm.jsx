import { useState } from "react";

const SubForm = () => {
	const [isFocused, setIsFocused] = useState(false);
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<div className="min-w-[465px] border border-slate-500 h-[80%]">
				<h1 className="py-0.5 text-center">
					Item Allocations for : <strong>ITEM</strong>
				</h1>
				<div>
					<ul className="flex border-y border-slate-400 text-[13px] leading-5 ">
						<li className="text-center w-32">location</li>
						<li className="text-center w-20 font-bold">Quantity</li>
						<li className="text-center w-20 font-bold">Rate</li>
						<li className="text-center w-8">per</li>
						<li className="text-center w-12 italic">Disc %</li>
						<li className="w-24 text-right font-bold pr-0.5">Amount</li>
					</ul>
				</div>
				<div className="min-h-[410px]">
					<div className={`text-[14px] mt-4 ml-5 leading-3`}>
						Due on
						<input
							type="text"
							className="text-[14px] outline-0 h-[17px] text-right focus:bg-[#fee8af] focus:border-blue-500 border border-transparent focus:border pr-0.5 w-16"
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
						/>
					</div>
					<ul className="flex  text-[14px] leading-4 ">
						<li>
							<input
								type="text"
								className="text-[14px] outline-0 h-[17px] text-left focus:bg-[#fee8af] focus:border-blue-500 border border-transparent focus:border pr-0.5 w-32"
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
							/>
						</li>
						<li>
							<input
								type="text"
								className="text-[14px] outline-0 h-[17px] text-right focus:bg-[#fee8af] focus:border-blue-500 border border-transparent focus:border pr-0.5 w-20"
							/>
						</li>
						<li>
							<input
								type="text"
								className="text-[14px] outline-0 h-[17px] text-right focus:bg-[#fee8af] focus:border-blue-500 border border-transparent focus:border pr-0.5 w-20"
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
							/>
						</li>
						<li>
							<input
								type="text"
								className="text-[14px] outline-0 h-[17px] text-right focus:bg-[#fee8af] focus:border-blue-500 border border-transparent focus:border pr-0.5 w-8"
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
							/>
						</li>
						<li>
							<input
								type="text"
								className="text-[14px] outline-0 h-[17px] text-right focus:bg-[#fee8af] focus:border-blue-500 border border-transparent focus:border pr-0.5 w-12 font-semibold"
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
							/>
						</li>
						<li className=" ">
							<input
								type="text"
								className="text-[14px] outline-0 h-[17px] text-right focus:bg-[#fee8af] focus:border-blue-500 border border-transparent focus:border pr-0.5 w-24 "
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
							/>
						</li>
					</ul>
				</div>
				<div className="border-t border-double border-b-4 ">Total</div>
			</div>
		</div>
	);
};
export default SubForm;
