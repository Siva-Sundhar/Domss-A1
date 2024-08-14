const SingleEmployeeAttendance = () => {
	return (
		<>
			<div className="">
				<div className="w-[30%]">
					<h2>Employee Attendance</h2>
					<form action="">
						<div className="flex leading-4 mt-2">
							<label className="text-[14px] text-blue-700 w-[35%] pl-2">
								Employee Code
							</label>
							<div className="text-[14px] mr-1">:</div>
							<input
								type="text"
								name="name"
								className=" w-[60%] text-[14px] font-semibold border outline-0 pl-0.5"
							/>
						</div>
						<div className="flex leading-4 mt-2">
							<label className="text-[14px] text-blue-700 w-[35%] pl-2">
								Employee Name
							</label>
							<div className="text-[14px] mr-1">:</div>
							<input
								type="text"
								name="name"
								className=" w-[60%] text-[14px] font-semibold border outline-0 pl-0.5"
							/>
						</div>
                        <div className="flex leading-4 mt-2">
								<label className="text-[14px] text-blue-700 w-[35%] pl-2">
								Attendance Date
								</label>
								<div className="text-[14px] mr-1">:</div>
								<input
									type="text"
									name="name"
									className=" w-[60%] text-[14px] font-semibold border outline-0 pl-0.5"
								/>
							</div>
                            <div className="flex leading-4 mt-2">
								<label className="text-[14px] text-blue-700 w-[35%] pl-2">
									Attendance Status
								</label>
								<div className="text-[14px] mr-1">:</div>
								<input
									type="text"
									name="name"
									className=" w-[60%] text-[14px] font-semibold border outline-0 pl-0.5"
								/>
							</div>
                            <div className="flex leading-4 mt-2">
								<label className="text-[14px] text-blue-700 w-[35%] pl-2">
									In Time
								</label>
								<div className="text-[14px] mr-1">:</div>
								<input
									type="text"
									name="name"
									className=" w-[60%] text-[14px] font-semibold border outline-0 pl-0.5"
								/>
							</div>
                            <div className="flex leading-4 mt-2">
								<label className="text-[14px] text-blue-700 w-[35%] pl-2">
									Out Time
								</label>
								<div className="text-[14px] mr-1">:</div>
								<input
									type="text"
									name="name"
									className=" w-[60%] text-[14px] font-semibold border outline-0 pl-0.5"
								/>
							</div>
					</form>
				</div>
			</div>
		</>
	);
};
export default SingleEmployeeAttendance;
