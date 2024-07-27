import { useRef, useState } from "react";
import { HiXMark } from "react-icons/hi2";

const DivisionCompany = () => {
	const [companyData, setCompanyData] = useState({
		name: "",
		mailingName: "",
		address: "",
		address2: "",
		state: "",
		country: "",
		pincode: "",
		telephone: "",
		mobile: "",
		email: "",
		website: "",
        currency: '',
        underGroup: ''
	});
    const ref = useRef([])
	const changeHandler = (e) => {
		const { name, value } = e.target;
        setCompanyData({ ...companyData, [name]: value });
	};

    const handleKeyDown = (e, index)=>{
        const key = e.key;
        if(key === 'Enter'){
			
            if(companyData.name.trim() === ""){
				e.preventDefault()
			} else{                
				const nextIndex = index + 1;
                if(ref.current[nextIndex]){
                    ref.current[nextIndex]?.focus();
                }
            }
        } else if(key === 'Backspace'){
			if(e.target.value.trim() !== ""){
				return;
			} else {
				const prevIndex = index - 1;
				if(ref.current[prevIndex]){
					ref.current[prevIndex]?.focus();
					e.preventDefault();
					ref.current[prevIndex].setSelectionRange(0, 0);
				}
			}
		}
    }
	return (
		<>
			<div className="bg-[#88bee6] w-full h-4 flex justify-between">
				<h1 className="text-[11px] pl-2 font-semibold">
					Division Company Creation
				</h1>
				<HiXMark
					className="text-[12px] text-base cursor-pointer"
					// onClick={() => navigate("/")}
				/>
			</div>
			<div className="container p-2">
				<form action="">
					<div className="flex leading-4">
						<label htmlFor="name" className="w-28 text-[14px]">
							Company Name
						</label>
						<span className="mx-2">:</span>
						<input
                            ref={input => ref.current[0] = input}
                            onKeyDown={(e) => handleKeyDown(e, 0)}
                            autoFocus
							name="name"
                            value={companyData.name}
                            onBlur={() => setCompanyData(prev  =>({...prev, mailingName: prev.name}))}
							id="name"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							className="h-[18px] text-[14px] font-semibold outline-0 border border-transparent focus:border focus:border-blue-400 focus:bg-amber-200 pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-2">
						<label htmlFor="mailingName" className="w-28 text-[14px]">
							Mailing Name
						</label>
						<span className="mx-2">:</span>
						<input
                            ref={input => ref.current[1] = input}
                            onKeyDown={(e) => handleKeyDown(e, 1)}
							name="mailingName"
                            value={companyData.mailingName}
                            onFocus={()=> ref.current[1].setSelectionRange(0, 0)}
							id="mailingName"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							className="h-[18px] text-[14px] font-semibold outline-0 border border-transparent focus:border focus:border-blue-400 focus:bg-amber-200 pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-1">
						<label htmlFor="address" className="w-28 text-[14px]">
							Address
						</label>
						<span className="mx-2">:</span>
						<input
                            ref={input => ref.current[2] = input}
                            onKeyDown={(e) => handleKeyDown(e,2)}
							name="address"
                            value={companyData.address}
							id="address"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							className="h-[18px] text-[14px] font-semibold outline-0 border border-transparent focus:border focus:border-blue-400 focus:bg-amber-200 pl-0.5"
						/>
					</div>
					<div className="flex leading-4">
						<label htmlFor="address2" className="w-28 text-[14px]"></label>

						<input
                            ref={input => ref.current[3] = input}
                            onKeyDown={(e) => handleKeyDown(e,3)}
							name="address2"
                            value={companyData.address2}
							id="address2"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							className="h-[18px] text-[14px] ml-4 font-semibold outline-0 border border-transparent focus:border focus:border-blue-400 focus:bg-amber-200 pl-0.5"
						/>
					</div>
					<div className="flex leading-4">
						<label htmlFor="address3" className="w-28 text-[14px]"></label>

						<input
                            // ref={input => ref.current[] = input}
                            onKeyDown={(e) => handleKeyDown(e)}
							name="address3"
                            value={companyData.address3}
							id="address3"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							className="h-[18px] text-[14px] ml-4 font-semibold outline-0 border border-transparent focus:border focus:border-blue-400 focus:bg-amber-200 pl-0.5"
						/>
					</div>
					<div className="flex leading-4">
						<label htmlFor="address4" className="w-28 text-[14px]"></label>
						<input
                            // ref={input => ref.current[] = input}
                            onKeyDown={(e) => handleKeyDown(e)}
							name="address4"
                            value={companyData.address4}
							id="address4"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							className="h-[18px] text-[14px] ml-4 font-semibold outline-0 border border-transparent focus:border focus:border-blue-400 focus:bg-amber-200 pl-0.5"
						/>
					</div>
					<div className="flex leading-4">
						<label htmlFor="satae" className="w-28 text-[14px]">
							State
						</label>
						<span className="mx-2">:</span>
						<input
                            ref={input => ref.current[4] = input}
                            onKeyDown={(e) => handleKeyDown(e, 4)}
							name="satae"
                            value={companyData.satae}
							id="satae"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							className="h-[18px] text-[14px] font-semibold outline-0 border border-transparent focus:border focus:border-blue-400 focus:bg-amber-200 pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-2">
						<label htmlFor="country" className="w-28 text-[14px]">
							Country
						</label>
						<span className="mx-2">:</span>
						<input
                            ref={input => ref.current[5] = input}
                            onKeyDown={(e) => handleKeyDown(e,5)}
							name="country"
                            value={companyData.country}
							id="country"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							className="h-[18px] text-[14px] font-semibold outline-0 border border-transparent focus:border focus:border-blue-400 focus:bg-amber-200 pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-1">
						<label htmlFor="pincode" className="w-28 text-[14px]">
							Pincode
						</label>
						<span className="mx-2">:</span>
						<input
                            ref={input => ref.current[6] = input}
                            onKeyDown={(e) => handleKeyDown(e,6)}
							name="pincode"
                            value={companyData.pincode}
							id="pincode"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							className="h-[18px] text-[14px] font-semibold outline-0 border border-transparent focus:border focus:border-blue-400 focus:bg-amber-200 pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-1">
						<label htmlFor="telephone" className="w-28 text-[14px]">
							Telephone
						</label>
						<span className="mx-2">:</span>
						<input
                            ref={input => ref.current[7] = input}
                            onKeyDown={(e) => handleKeyDown(e,7)}
							name="telephone"
                            value={companyData.telephone}
							id="telephone"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							className="h-[18px] text-[14px] font-semibold outline-0 border border-transparent focus:border focus:border-blue-400 focus:bg-amber-200 pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-1">
						<label htmlFor="mobile" className="w-28 text-[14px]">
							Mobile Number
						</label>
						<span className="mx-2">:</span>
						<input
                            ref={input => ref.current[8] = input}
                            onKeyDown={(e) => handleKeyDown(e,8)}
							name="mobile"
                            value={companyData.mobile}
							id="mobile"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							className="h-[18px] text-[14px]  font-semibold outline-0 border border-transparent focus:border focus:border-blue-400 focus:bg-amber-200 pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-1">
						<label htmlFor="email" className="w-28 text-[14px]">
							E-Mail
						</label>
						<span className="mx-2">:</span>
						<input
                            ref={input => ref.current[9] = input}
                            onKeyDown={(e) => handleKeyDown(e,9)}
							name="email"
                            value={companyData.email}
							id="email"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							className="h-[18px] text-[14px] font-semibold outline-0 border border-transparent focus:border focus:border-blue-400 focus:bg-amber-200 pl-0.5"
						/>
					</div>
					<div className="flex leading-4 mt-1">
						<label htmlFor="website" className="w-28 text-[14px]">
							Website
						</label>
						<span className="mx-2">:</span>
						<input
                            ref={input => ref.current[10] = input}
                            onKeyDown={(e) => handleKeyDown(e,10)}
							name="website"
                            value={companyData.website}
							id="website"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							className="h-[18px] text-[14px] font-semibold outline-0 border border-transparent focus:border focus:border-blue-400 focus:bg-amber-200 pl-0.5"
						/>
					</div>
                    <div className="flex leading-4 mt-1">
						<label htmlFor="currency" className="w-28 text-[14px]">
							Currency Type
						</label>
						<span className="mx-2">:</span>
						<input
                            ref={input => ref.current[11] = input}
                            onKeyDown={(e) => handleKeyDown(e,11)}
							name="currency"
                            value={companyData.currency}
							id="currency"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							className="h-[18px] text-[14px] font-semibold outline-0 border border-transparent focus:border focus:border-blue-400 focus:bg-amber-200 pl-0.5"
						/>
					</div>
                    <div className="flex leading-4 mt-1">
						<label htmlFor="underGroup" className="w-28 text-[14px]">
                        Under Group
						</label>
						<span className="mx-2">:</span>
						<input
                            ref={input => ref.current[12] = input}
                            onKeyDown={(e) => handleKeyDown(e,12)}
							name="underGroup"
                            value={companyData.underGroup}
							id="underGroup"
							type="text"
							autoComplete="off"
							onChange={changeHandler}
							className="h-[18px] text-[14px] font-semibold outline-0 border border-transparent focus:border focus:border-blue-400 focus:bg-amber-200 pl-0.5"
						/>
					</div>
				</form>
			</div>
		</>
	);
};
export default DivisionCompany;
