import ModalTitle from "./ModalTitle.jsx";

const BankAllocationSub = () => {
	return (
		<>
			<div className="fixed inset-0 bg-slate-400 bg-opacity-85 z-50 flex flex-col items-center">
				<div className="flex items-center justify-between w-full ">
					<ModalTitle title={"Stock Item Allocations"} />
				</div>
				<div className="flex items-center justify-between min-w-[695px] h-screen ">
					<div className="min-h-[480px] bg-white 0 px-5 w-full">
						<h1 className="text-[14px] text-center py-1 ">
							Bank Allocations for:&nbsp;
							<strong>&nbsp; Sbi</strong>
						</h1>
						<h1 className="border-b border-slate-400 text-center ">
							For: <strong>200.00</strong>
						</h1>

						<div className="">
							<table className="w-full">
								<thead>
									<tr className="border-y border-slate-400 text-[14px] leading-5 font-semibold">
										<td>Transaction Type</td>
										<td className="text-right">Amount</td>
									</tr>
								</thead>
								<tbody>
									<tr className="h-[17px]"></tr>
									<tr className="h-[17px] text-[13px] leading-4 ">
										<td>
											<input
												type="text"
												className="outline-0 focus:border focus:border-blue-400 focus:bg-amber-200 border border-transparent
                                                bg-transparent text-[13px]"
											/>
										</td>
										<td className="text-right">
											<input
												type="text"
												className="outline-0 focus:border
                                                border border-transparent focus:border-blue-400
                                                bg-transparent focus:bg-amber-200 w-24 text-right text-[13px]"
											/>
										</td>
									</tr>
								</tbody>
							</table>
							<div className="flex items-center w-1/2 text-[13px] leading-4 mt-3">
								<label htmlFor="chequeRange" className="text-[13px] w-24 ">
									Cheque range
								</label>
								<div className="mr-0.5">:</div>
								<input
									type="text"
									id="chequeRange"
									className="outline-0 focus:border
                                    border border-transparent focus:border-blue-400
                                    bg-transparent focus:bg-amber-200  text-[13px]"
								/>
							</div>
							<div className="flex">
								<div className="flex items-center w-1/2 leading-4 mt-3">
									<label htmlFor="chequeRange" className="text-[13px] w-24 ">
										Inst No.
									</label>
									<div className="mr-0.5">:</div>
									<input
										type="text"
										id="chequeRange"
										className="outline-0 focus:border
                                    border border-transparent focus:border-blue-400
                                    bg-transparent focus:bg-amber-200 text-[13px] "
									/>
								</div>
								<div className="flex items-center w-1/2  leading-3 mt-3">
									<label htmlFor="chequeRange" className="text-[13px] w-24 ">
										Inst Date
									</label>
									<div className="mr-0.5">:</div>
									<input
										type="text"
										id="chequeRange"
										className="outline-0 focus:border
                                    border border-transparent focus:border-blue-400
                                    bg-transparent focus:bg-amber-200  text-[13px]"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BankAllocationSub;
