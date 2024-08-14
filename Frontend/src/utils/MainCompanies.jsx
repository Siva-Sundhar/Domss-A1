//proptypes-validation
import PropTypes from 'prop-types';

const MainCompanies = ({ companies, handleSelect, selectIndex }) => {
	return (
		<>
			<div className="absolute bg-[#def1fc] w-52 top-[84px] right-[7px] text-left h-52">
				<h1 className="bg-[#2a67b1] text-white pl-2">List of Category</h1>
				<ul className="" tabIndex="-1" onMouseDown={(e) => e.preventDefault()}>
					{companies.map((company, index) => (
						<li
							tabIndex="0"
							key={index}
							onClick={() => handleSelect(company)}
							
							className={`cursor-pointer ${
								selectIndex === index ? "bg-[#ff9a00]" : ""
							} pl-1  text-[13px]`}
						>
							{company.name}
						</li>
					))}
				</ul>
			</div>
		</>
	);
};
export default MainCompanies;
MainCompanies.propTypes = {
	companies: PropTypes.arrayOf(PropTypes.object).isRequired,
	handleSelect: PropTypes.func.isRequired,
	selectIndex: PropTypes.number.isRequired,
}