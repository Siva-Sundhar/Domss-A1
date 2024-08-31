import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRef } from "react";
const SelectArea = ({title, data, selectIndex, onHandle, extraParams}) => {
	const listRef = useRef([]);

	useEffect(() => {
		if (selectIndex >= 0 && listRef.current[selectIndex]) {
			listRef.current[selectIndex].scrollIntoView({
				behavior: "auto",
				block: "end",
				inline: "nearest",
			});
		}
	}, [selectIndex]);

	const handleClickItem = (item)=>{
		if(typeof onHandle === 'function'){
			onHandle(item, extraParams);
		} else {
			onHandle(item);
		}
	}
	// console.log(...extraParams)
	return (
		<>
			<div className="absolute top-0 right-0 bg-[#def1fc] w-[300px] border border-slate-500 z-10 h-[625px]">
				<h1 className="bg-[#2a67b1] text-white pl-2 text-[13px] sticky top-0">
					{title}
				</h1>
				<div className="w-full  px-1">
					<button className="w-full text-right text-[14px] mt-3 pr-2 border-b border-slate-500">Create</button>
				</div>
				<ul onMouseDown={(e) => e.preventDefault()} tabIndex="-1">
					{data.map((item, index) => (
						<li
							key={index}
							tabIndex="0"
							className={`pl-2 h-[17px] flex items-center py-0.5 cursor-pointer text-sm ${
								selectIndex === index ? "bg-[#ff9a00]" : ""
							}`}
							onClick={() => {
								handleClickItem(item.label);
								// refs.current[1].focus();
							}}
							ref={(el) => (listRef.current[index] = el)}
						>
							{item.label}
						</li>
					))}
				</ul>
			</div>
		</>
	);
};
export default SelectArea;

SelectArea.propTypes = {
	title:PropTypes.string.isRequired,
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	selectIndex: PropTypes.number.isRequired,
	onHandle: PropTypes.func.isRequired,
	extraParams:PropTypes.any
};
