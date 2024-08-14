import { useState } from "react";

const EmployeeMaster = () => {
    const [employeeMaster, setEmployeeMaster] = useState({
        employeeId: "",
        name:"",
        dob:"",
        mobile: "",
        email: "",
        gender: "",
        fatherName: "", 
        motherName: "",
        spouseName: "",
        bloodGroup: "",
        address1: "",
        address2: "",
        address3:"",
        address4: "",
        dateOfJoining: "",
        designation: "",
        department: "",
        hours:"",
        mins: "",
        emergencyContact: "",
        status: "",
        adhar: "",
        panNo: "",
        uan: "",
        pfNo: "",
        esiNo: "",
        dateOfResign: "",
        bankName: "",
        bankAccountNo: "",
        bankIfsc: "",
        workPermitNo: "",
        contractStartDate: "",
        contractEndDate: "",
        salaryPerMonth: "",
        salaryPerDay: "",
    })

	const [image, setImage] = useState(null);
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
	console.log(image)
	return (
		<>
			<div className="p-3 bg-[#CAF4FF] h-screen ">
				<form action="" className="border border-white ">
					
					<div className="flex justify-between  h-min">
						<div className="w-[30%] border border-white m-2 py-2">
							<h1 className="text-xl text-center text-red-700">
								
								-Personal Details-
							</h1>
							<div className="flex leading-4 mt-2">
								<label className="text-[14px] text-blue-700 w-[35%] pl-2">
									Name
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
									Date of Birth
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
									Mobile No
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
									E-mail
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
									Gender
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
									Father&apos;s Name
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
									Mother&apos;s Name
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
									Spouse Name
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
									Blood Group
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
									Address1
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
									Address2
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
									Address3
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
									Address4
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
									Emergency Contact
								</label>
								<div className="text-[14px] mr-1">:</div>
								<input
									type="text"
									name="name"
									className=" w-[60%] text-[14px] font-semibold border outline-0 pl-0.5"
								/>
							</div>
						</div>

						<div className="w-[30%] border-white border m-2 py-2">
							<h1 className="text-xl text-center text-red-700">
								-Official Details-
							</h1>
							<div className="flex leading-4 mt-2">
								<label className="text-[14px] text-blue-700 w-[45%] pl-2">
									Employee Id
								</label>
								<div className="text-[14px] mr-1">:</div>
								<input
									type="text"
									name="name"
									className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
								/>
							</div>
							<div className="flex leading-4 mt-2">
								<label className="text-[14px] text-blue-700 w-[45%] pl-2">
									Date of Joining
								</label>
								<div className="text-[14px] mr-1">:</div>
								<input
									type="text"
									name="name"
									className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
								/>
							</div>
							<div className="flex leading-4 mt-2">
								<label className="text-[14px] text-blue-700 w-[45%] pl-2">
									Designation
								</label>
								<div className="text-[14px] mr-1">:</div>
								<input
									type="text"
									name="name"
									className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
								/>
							</div>
							<div className="flex leading-4 mt-2">
								<label className="text-[14px] text-blue-700 w-[45%] pl-2">
									Department
								</label>
								<div className="text-[14px] mr-1">:</div>
								<input
									type="text"
									name="name"
									className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
								/>
							</div>
							<div className="flex leading-4 mt-2">
								<label className="text-[14px] text-blue-700 w-[45%] pl-2">
									Supervisor Name
								</label>
								<div className="text-[14px] mr-1">:</div>
								<input
									type="text"
									name="name"
									className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
								/>
							</div>
							<div className="flex leading-4 mt-2">
								<label className="text-[14px] text-blue-700 w-[45%] pl-2">
									Working Hours
								</label>
								<div className="text-[14px] mr-1">:</div>
								<div className="flex w-[50%]">
									<input
										type="text"
										name="name"
										className=" w-[25%] text-[14px] font-semibold border outline-0 pl-0.5 text-center"
									/>
									<div className=" w-[25%] bg-white text-[13px] font-semibold border outline-0 pl-0.5">
										Hrs
									</div>
									<input
										type="text"
										name="name"
										className=" w-[25%] text-[14px] font-semibold border outline-0 pl-0.5 text-center"
									/>
									<div className=" w-[25%] bg-white text-[13px] font-semibold border outline-0 pl-0.5 ">
										Mins
									</div>
								</div>
							</div>
							<div className="flex leading-4 mt-2">
								<label className="text-[14px] text-blue-700 w-[45%] pl-2">
									Status
								</label>
								<div className="text-[14px] mr-1">:</div>
								<input
									type="text"
									name="name"
									className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
								/>
							</div>
							<div className="flex leading-4 mt-2">
								<label className="text-[14px] text-blue-700 w-[45%] pl-2">
									Aadhar Number
								</label>
								<div className="text-[14px] mr-1">:</div>
								<input
									type="text"
									name="name"
									className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
								/>
							</div>
							<div className="flex leading-4 mt-2">
								<label className="text-[14px] text-blue-700 w-[45%] pl-2">
									PAN Number
								</label>
								<div className="text-[14px] mr-1">:</div>
								<input
									type="text"
									name="name"
									className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
								/>
							</div>
							<div className="flex leading-4 mt-2">
								<label className="text-[14px] text-blue-700 w-[45%] pl-2">
									Universal Account Number
								</label>
								<div className="text-[14px] mr-1">:</div>
								<input
									type="text"
									name="name"
									className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
								/>
							</div>
							<div className="flex leading-4 mt-2">
								<label className="text-[14px] text-blue-700 w-[45%] pl-2">
									PF account number
								</label>
								<div className="text-[14px] mr-1">:</div>
								<input
									type="text"
									name="name"
									className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
								/>
							</div>
							<div className="flex leading-4 mt-2">
								<label className="text-[14px] text-blue-700 w-[45%] pl-2">
									ESI number
								</label>
								<div className="text-[14px] mr-1">:</div>
								<input
									type="text"
									name="name"
									className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
								/>
							</div>
							<div className="flex leading-4 mt-2">
								<label className="text-[14px] text-blue-700 w-[45%] pl-2">
									Date of Resignation
								</label>
								<div className="text-[14px] mr-1">:</div>
								<input
									type="text"
									name="name"
									className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
								/>
							</div>
						</div>
						<div className=" w-[30%]">
						<div className="h-28 flex justify-end mr-5">
						<div className="w-[100px] h-[100px] bg-slate-500 relative flex items-center justify-center">
							{image ? (
								<img
									src={image}
									alt="Profile"
									className="w-full h-full object-cover"
								/>
							) : (
								<span className="text-white">Upload Image</span>
							)}
							<input
								type="file"
								onChange={handleFileChange}
								className="absolute inset-0 opacity-0 cursor-pointer"
							/>
						</div>
					</div>
							<div className="border border-white m-2 h-40 py-2">
								<h1 className="text-xl text-center text-red-700">
									{" "}
									-Bank Details-
								</h1>
								<div className="flex leading-4 mt-2">
									<label className="text-[14px] text-blue-700 w-[45%] pl-2">
										Account No
									</label>
									<div className="text-[14px] mr-1">:</div>
									<input
										type="text"
										name="name"
										className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
									/>
								</div>
								<div className="flex leading-4 mt-2">
									<label className="text-[14px] text-blue-700 w-[45%] pl-2">
										Bank Name
									</label>
									<div className="text-[14px] mr-1">:</div>
									<input
										type="text"
										name="name"
										className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
									/>
								</div>
								<div className="flex leading-4 mt-2">
									<label className="text-[14px] text-blue-700 w-[45%] pl-2">
										Branch Name
									</label>
									<div className="text-[14px] mr-1">:</div>
									<input
										type="text"
										name="name"
										className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
									/>
								</div>
								<div className="flex leading-4 mt-2">
									<label className="text-[14px] text-blue-700 w-[45%] pl-2">
										IFSC Code{" "}
									</label>
									<div className="text-[14px] mr-1">:</div>
									<input
										type="text"
										name="name"
										className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
									/>
								</div>
							</div>
							<div className="border border-white m-2 h-32 py-2">
								<h1 className="text-xl text-center text-red-700">
									-Contract Details-
								</h1>
								<div className="flex leading-4 mt-2">
									<label className="text-[14px] text-blue-700 w-[45%] pl-2">
										Work Permit No
									</label>
									<div className="text-[14px] mr-1">:</div>
									<input
										type="text"
										name="name"
										className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
									/>
								</div>
								<div className="flex leading-4 mt-2">
									<label className="text-[14px] text-blue-700 w-[45%] pl-2">
										Contract Start Date
									</label>
									<div className="text-[14px] mr-1">:</div>
									<input
										type="text"
										name="name"
										className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
									/>
								</div>
								<div className="flex leading-4 mt-2">
									<label className="text-[14px] text-blue-700 w-[45%] pl-2">
										Contract End Date
									</label>
									<div className="text-[14px] mr-1">:</div>
									<input
										type="text"
										name="name"
										className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
									/>
								</div>
							</div>
							<div className="border border-white m-2 h-32 py-2">
								<h1 className="text-xl text-center text-red-700">
									-Salary Details-
								</h1>
								<div className="flex leading-4 mt-2">
									<label className="text-[14px] text-blue-700 w-[45%] pl-2">
										Salary Per Month
									</label>
									<div className="text-[14px] mr-1">:</div>
									<input
										type="text"
										name="name"
										className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
									/>
								</div>
								<div className="flex leading-4 mt-2">
									<label className="text-[14px] text-blue-700 w-[45%] pl-2">
										Salary Per Day
									</label>
									<div className="text-[14px] mr-1">:</div>
									<input
										type="text"
										name="name"
										className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
									/>
								</div>
								<div className="flex leading-4 mt-2">
									<label className="text-[14px] text-blue-700 w-[45%] pl-2">
										Salary Per Hour
									</label>
									<div className="text-[14px] mr-1">:</div>
									<input
										type="text"
										name="name"
										className=" w-[50%] text-[14px] font-semibold border outline-0 pl-0.5"
									/>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
export default EmployeeMaster;
