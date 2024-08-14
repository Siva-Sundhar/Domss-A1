
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import MainCompanies from "../utils/MainCompanies";
import Title from "../utils/Title";

const CompanyCreation = () => {
	const [companyData, setCompanyData] = useState({
		name: "",
		mailingName: "",
		address1: "",
		address2: "",
		address3: "",
		address4: "",
		city: "",
		district: "",
		state: "",
		country: "",
		pincode: "",
		telephone: "",
		mobile: "",
		email: "",
		website: "",
		gstNo: "",
		panNo: "",
		msmeNo: "",
		fssaiNo: "",
		mainCompany: "Yes",
		divisionCompany: "No",
		under:"",
		headOffice: "",
		branchOffice: "",
		location: ""
	});
	const [mainCompanies, setMainCompanies] = useState([])
	const [companyId, setCompanyId] = useState("");
	const [selectIndex, setSelectIndex] = useState(0)
	const [show, setShow] = useState(false);
	const ref = useRef([]);
	
	useEffect(()=>{
		loadMainCompanies();
	},[])

	const loadMainCompanies = async ()=>{
		try {
			const response = await axios.get("http://localhost:8080/company/mainCompanies")
			setMainCompanies(response.data);
		} catch (error) {
			console.log(error, "Main company not found.")
		}
	}

	const changeHandler = (e) => {
		const { name, value } = e.target;
		
		setCompanyData({ ...companyData, [name]: value });
	};
	function capitalizeEachWord(str) {
		var words = str.split(' '); // Split the string into words
		for (var i = 0; i < words.length; i++) {
			words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1); // Capitalize first letter
		}
		return words.join(' ').trim(); // Join words back into a single string
	}
	
	const handleKeyDown = (e, index) => {
		const key = e.key;
		if (key === "Enter") {
			if (companyData.name.trim() === "") {
				e.preventDefault();
			} else {
				const nextIndex = index + 1;
				if (ref.current[nextIndex]) {
					ref.current[nextIndex]?.focus();
				} else if (index === 19 && ref.current[21]) {
					ref.current[21].focus();
				}
			}
		} else if (key === "Backspace") {
			if (e.target.value.trim() !== "") {
				return;
			} else {
				const prevIndex = index - 1;
				if (ref.current[prevIndex]) {
					ref.current[prevIndex]?.focus();
					e.preventDefault();
					ref.current[prevIndex].setSelectionRange(0, 0);
				}
			}
		}
	};
	const handleBlur = (e) => {
		const { name, value } = e.target;
		const capitizeWord = capitalizeEachWord(value)
			setCompanyData({ ...companyData, [name]: capitizeWord });
		
	};
	const handleSelect = (company)=>{
		setCompanyData((prev)=> ({...prev, under:company.name}))
		setCompanyId(company.id)
		ref.current[22].focus()
	}
	const handleKeySelect = (e, company)=>{
		const key = e.key;
		if(key === "ArrowDown" && selectIndex < mainCompanies.length - 1){
			setSelectIndex(prev => prev + 1);
		} else if(key === 'ArrowUp') {
			setSelectIndex(prev => prev - 1);
		} else if(key === 'Enter'){
			handleSelect(company[selectIndex])
		}

	}
	const handleSubmit = async (e) => {
			if(e.key === 'Enter'){
			const userConfirmed = window.confirm("Do you want confirm order");
			if (userConfirmed) {
				const {
					name,
					mailingName,
					address1,
					address2,
					address3,
					address4,
					city,
					district,
					state,
					country,
					pincode,
					telephone,
					mobile,
					email,
					website,
					gstNo,
					panNo,
					msmeNo,
					fssaiNo,
					mainCompany,
					headOffice,
					branchOffice,
					location
				} = companyData;
				
				const isMainCompany = mainCompany === "Yes";
				
					const company = {
						name,
						mailingName,
						address1,
						address2,
						address3,
						address4,
						city,
						district,
						state,
						country,
						pincode,
						telephone,
						mobile,
						email,
						website,
						gstNo,
						panNo,
						msmeNo,
						fssaiNo,
						isMainCompany,
						headOffice,
						branchOffice,
						location,
						...(isMainCompany ? {} : {companyId})
					}
					console.log(company);
					// try{
					
					// await axios.post(
					// 	"http://localhost:8080/company/save_company",
					// 	company
					// );
					// } catch (error){
					// 	console.error(error);
					// }
				}
			}
			else if (e.key === "Backspace") {
			if (e.target.value !== "") {
				return;
			} else {
				e.preventDefault();
				ref.current[20].focus();
				ref.current[20].setSelectionRange(0, 0);
			}
		}
	};
	return (
		<>
			<Title title="Company Creation" />

			<form
				action=""
				onSubmit={(e) => e.preventDefault()}
				className="flex justify-between border border-slate-300 m-2"
			>
				<div className="container p-2 w-1/2 border-r">
					<div className="flex leading-4 mt-2">
						<label htmlFor="name" className="w-[35%] text-[14px]">
							Company Name
						</label>
						<span className="mx-2">:</span>
						<input
							ref={(input) => (ref.current[0] = input)}
							onKeyDown={(e) => handleKeyDown(e, 0)}
							name="name"
							value={companyData.name}
							autoFocus
							id="name"
							onBlur={(e) => {
								handleBlur(e);
								setCompanyData((prev) => ({ ...prev, mailingName: prev.name }));
							}}
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							className="h-[20px] w-[60%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize border border-transparent focus:bg-amber-200 pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-2">
						<label htmlFor="mailingName" className="w-[35%] text-[14px]">
							Mailing Name
						</label>
						<span className="mx-2">:</span>
						<input
							ref={(input) => (ref.current[1] = input)}
							onKeyDown={(e) => handleKeyDown(e, 1)}
							name="mailingName"
							value={companyData.mailingName}
							id="mailingName"
							type="text"
							onFocus={() => ref.current[1].setSelectionRange(0, 0)}
							autoComplete="off"
							onChange={changeHandler}
							onBlur={handleBlur}
							className="h-[20px] w-[60%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize border border-transparent focus:bg-amber-200 pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-2">
						<label htmlFor="address1" className="w-[35%] text-[14px] ">
							Address1
						</label>
						<span className="mx-2">:</span>
						<input
							ref={(input) => (ref.current[2] = input)}
							onKeyDown={(e) => handleKeyDown(e, 2)}
							name="address1"
							value={companyData.address1}
							id="address1"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							onBlur={handleBlur}
							className="h-[20px] w-[60%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize focus:bg-amber-200 border border-transparent pl-0.5"
						/>
					</div>
					<div className="flex leading-4 ">
						<label htmlFor="address2" className="w-[35%] text-[14px]">
							Address2
						</label>
						<span className="mx-2">:</span>
						<input
							ref={(input) => (ref.current[3] = input)}
							onKeyDown={(e) => handleKeyDown(e, 3)}
							name="address2"
							value={companyData.address2}
							id="address2"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							onBlur={handleBlur}
							className="h-[20px] w-[60%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize focus:bg-amber-200 border border-transparent pl-0.5"
						/>
					</div>
					<div className="flex leading-4">
						<label htmlFor="address3" className="w-[35%] text-[14px]">
							Address3
						</label>
						<span className="mx-2">:</span>
						<input
							ref={(input) => (ref.current[4] = input)}
							onKeyDown={(e) => handleKeyDown(e, 4)}
							name="address3"
							value={companyData.address3}
							id="address3"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							onBlur={handleBlur}
							className="h-[20px] w-[60%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize focus:bg-amber-200 border border-transparent pl-0.5"
						/>
					</div>
					<div className="flex leading-4 ">
						<label htmlFor="address4" className="w-[35%] text-[14px]">
							Address4
						</label>
						<span className="mx-2">:</span>
						<input
							ref={(input) => (ref.current[5] = input)}
							onKeyDown={(e) => handleKeyDown(e, 5)}
							name="address4"
							value={companyData.address4}
							id="address4"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							onBlur={handleBlur}
							className="h-[20px] w-[60%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize focus:bg-amber-200 border border-transparent pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-2">
						<label htmlFor="city" className="w-[35%] text-[14px]">
							City
						</label>
						<span className="mx-2">:</span>
						<input
							ref={(input) => (ref.current[6] = input)}
							onKeyDown={(e) => handleKeyDown(e, 6)}
							name="city"
							value={companyData.city}
							id="city"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							onBlur={handleBlur}
							className="h-[20px] w-[60%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize focus:bg-amber-200 border border-transparent pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-2">
						<label htmlFor="district" className="w-[35%] text-[14px]">
							District
						</label>
						<span className="mx-2">:</span>
						<input
							ref={(input) => (ref.current[7] = input)}
							onKeyDown={(e) => handleKeyDown(e, 7)}
							name="district"
							value={companyData.district}
							id="district"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							onBlur={handleBlur}
							className="h-[20px] w-[60%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize focus:bg-amber-200 pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-2">
						<label htmlFor="state" className="w-[35%] text-[14px]">
							State
						</label>
						<span className="mx-2">:</span>
						<input
							ref={(input) => (ref.current[8] = input)}
							onKeyDown={(e) => handleKeyDown(e, 8)}
							name="state"
							value={companyData.state}
							id="state"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							onBlur={handleBlur}
							className="h-[20px] w-[60%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize focus:bg-amber-200 border border-transparent pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-2">
						<label htmlFor="country" className="w-[35%] text-[14px]">
							Country
						</label>
						<span className="mx-2">:</span>
						<input
							ref={(input) => (ref.current[9] = input)}
							onKeyDown={(e) => handleKeyDown(e, 9)}
							name="country"
							value={companyData.country}
							id="country"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							onBlur={handleBlur}
							className="h-[20px] w-[60%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize focus:bg-amber-200 border border-transparent pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-2">
						<label htmlFor="pincode" className="w-[35%] text-[14px]">
							Pincode
						</label>
						<span className="mx-2">:</span>
						<input
							ref={(input) => (ref.current[10] = input)}
							onKeyDown={(e) => handleKeyDown(e, 10)}
							name="pincode"
							value={companyData.pincode}
							id="pincode"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							onBlur={handleBlur}
							className="h-[20px] w-[15%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize focus:bg-amber-200 border border-transparent pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-2">
						<label htmlFor="telephone" className="w-[35%] text-[14px]">
							Telephone
						</label>
						<span className="mx-2">:</span>
						<input
							ref={(input) => (ref.current[11] = input)}
							onKeyDown={(e) => handleKeyDown(e, 11)}
							name="telephone"
							value={companyData.telephone}
							id="telephone"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							onBlur={handleBlur}
							className="h-[20px] w-[25%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize focus:bg-amber-200 border border-transparent pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-2">
						<label htmlFor="mobile" className="w-[35%] text-[14px]">
							Mobile Number
						</label>
						<span className="mx-2">:</span>

						<input
							ref={(input) => (ref.current[12] = input)}
							onKeyDown={(e) => handleKeyDown(e, 12)}
							name="mobile"
							value={companyData.mobile}
							id="mobile"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							onBlur={handleBlur}
							className="h-[20px] w-[30%] text-[14px]  font-semibold outline-0 focus:border focus:border-blue-400 focus:bg-amber-200 border border-transparent pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-2">
						<label htmlFor="email" className="w-[35%] text-[14px]">
							E-Mail
						</label>
						<span className="mx-2">:</span>
						<input
							ref={(input) => (ref.current[13] = input)}
							onKeyDown={(e) => handleKeyDown(e, 13)}
							name="email"
							value={companyData.email}
							id="email"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							// onBlur={handleBlur}
							className="h-[20px] w-[60%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 focus:bg-amber-200 border border-transparent pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-2">
						<label htmlFor="website" className="w-[35%] text-[14px]">
							Website
						</label>
						<span className="mx-2">:</span>
						<input
							ref={(input) => (ref.current[14] = input)}
							onKeyDown={(e) => handleKeyDown(e, 14)}
							name="website"
							value={companyData.website}
							id="website"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							className="h-[20px] w-[60%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 focus:bg-amber-200 border border-transparent pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-2">
						<label htmlFor="gstNo" className="w-[35%] text-[14px]">
							GSTIN No
						</label>
						<span className="mx-2">:</span>
						<input
							ref={(input) => (ref.current[15] = input)}
							onKeyDown={(e) => handleKeyDown(e, 15)}
							name="gstNo"
							value={companyData.gstNo}
							id="gstNo"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							onBlur={handleBlur}
							className="h-[20px] w-[60%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 uppercase focus:bg-amber-200 border border-transparent pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-2">
						<label htmlFor="panNo" className="w-[35%] text-[14px]">
							PAN No
						</label>
						<span className="mx-2">:</span>
						<input
							ref={(input) => (ref.current[16] = input)}
							onKeyDown={(e) => handleKeyDown(e, 16)}
							name="panNo"
							value={companyData.panNo}
							id="panNo"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							onBlur={handleBlur}
							className="h-[20px] w-[60%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 uppercase focus:bg-amber-200 border border-transparent pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-2">
						<label htmlFor="msmeNo" className="w-[35%] text-[14px]">
							MSME No
						</label>
						<span className="mx-2">:</span>
						<input
							ref={(input) => (ref.current[17] = input)}
							onKeyDown={(e) => handleKeyDown(e, 17)}
							name="msmeNo"
							value={companyData.msmeNo}
							id="msmeNo"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							onBlur={handleBlur}
							className="h-[20px] w-[60%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize focus:bg-amber-200 border border-transparent pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-2">
						<label htmlFor="fssaiNo" className="w-[35%] text-[14px]">
							FSSAI No
						</label>
						<span className="mx-2">:</span>
						<input
							ref={(input) => (ref.current[18] = input)}
							onKeyDown={(e) => handleKeyDown(e, 18)}
							name="fssaiNo"
							value={companyData.fssaiNo}
							id="fssaiNo"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							onBlur={handleBlur}
							className="h-[20px] w-[60%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize focus:bg-amber-200 border border-transparent pl-0.5"
						/>
					</div>
				</div>
				<div className="w-1/2 p-2">
					<div className="flex leading-4 mt-2">
						<label htmlFor="mainCompany" className="w-[35%] text-[14px]">
							Is this main company ?
						</label>
						<span className="mx-2">:</span>
						<input
							ref={(input) => (ref.current[19] = input)}
							onKeyDown={(e) => {
								if (e.key === "Enter" && e.target.value === "Yes") {
									handleSubmit(e);
								} else {
									handleKeyDown(e, 19);
								}
							}}
							name="mainCompany"
							value={companyData.mainCompany}
							id="mainCompany"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							onBlur={handleBlur}
							className="h-[20px] w-[20%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize focus:bg-amber-200 border border-transparent pl-0.5"
						/>
					</div>
					{companyData.mainCompany === "No" && (
						<div className="flex leading-4 mt-2">
							<label htmlFor="divisionCompany" className="w-[35%] text-[14px]">
								Is this division company
							</label>
							<span className="mx-2">:</span>
							<input
								ref={(input) => (ref.current[20] = input)}
								onKeyDown={(e) => {
									handleKeyDown(e, 20);
								}}
								name="divisionCompany"
								value={companyData.divisionCompany}
								id="divisionCompany"
								type="text"
								autoComplete="off"
								onChange={changeHandler}
								onBlur={handleBlur}
								className="h-[20px] w-[20%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize focus:bg-amber-200 border border-transparent pl-0.5"
							/>
						</div>
					)}

					{companyData.mainCompany === "No" &&
						companyData.divisionCompany === "Yes" && (
							<>
								<div className="flex leading-4 mt-2">
									<label htmlFor="mainCompany" className="w-[35%] text-[14px]">
										Under
									</label>
									<span className="mx-2">:</span>
									<input
										ref={(input) => (ref.current[21] = input)}
										onKeyDown={(e)=> handleKeySelect(e,mainCompanies)}
										name="under"
										value={companyData.under}
										onFocus={()=>setShow(true)}
										id="under"
										type="text"
										autoComplete="off"
										onChange={changeHandler}
										onBlur={()=> {
											setShow(false)
											handleBlur}}
										className="h-[20px] w-[40%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize focus:bg-amber-200 border border-transparent pl-0.5"
									/>
									{show && (
										<MainCompanies
											companies={mainCompanies}
											selectIndex={selectIndex}
											handleSelect={(company)=>handleSelect(company)}

										/>)
									}
								</div>
								<div className="flex leading-4 mt-2">
									<label htmlFor="headOffice" className="w-[35%] text-[14px]">
										Head Office Master
									</label>
									<span className="mx-2">:</span>
									<input
										ref={(input) => (ref.current[22] = input)}
										onKeyDown={(e) => {
											handleKeyDown(e, 22);
										}}
										name="headOffice"
										value={companyData.headOffice}
										id="headOffice"
										type="text"
										autoComplete="off"
										onChange={changeHandler}
										onBlur={handleBlur}
										className="h-[20px] w-[40%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize focus:bg-amber-200 border border-transparent pl-0.5"
									/>
								</div>
								<div className="flex leading-4 mt-2">
									<label htmlFor="branchOffice" className="w-[35%] text-[14px]">
										Branch Office Master
									</label>
									<span className="mx-2">:</span>
									<input
										ref={(input) => (ref.current[23] = input)}
										onKeyDown={(e) => {
											handleKeyDown(e, 23);
										}}
										name="branchOffice"
										value={companyData.branchOffice}
										id="branchOffice"
										type="text"
										autoComplete="off"
										onChange={changeHandler}
										onBlur={handleBlur}
										className="h-[20px] w-[40%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize focus:bg-amber-200 border border-transparent pl-0.5"
									/>
								</div>
								<div className="flex leading-4 mt-2">
									<label htmlFor="location" className="w-[35%] text-[14px]">
										Location Master
									</label>
									<span className="mx-2">:</span>
									<input
										ref={(input) => (ref.current[24] = input)}
										onKeyDown={handleSubmit}
										name="location"
										value={companyData.location}
										id="location"
										type="text"
										autoComplete="off"
										onChange={changeHandler}
										onBlur={handleBlur}
										className="h-[20px] w-[40%] text-[14px] font-semibold outline-0 focus:border focus:border-blue-400 capitalize focus:bg-amber-200 border border-transparent pl-0.5"
									/>
								</div>
							</>
						)}
				</div>
			</form>
		</>
	);
};
export default CompanyCreation;