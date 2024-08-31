import { useState } from "react";
import SelectArea from "./SelectArea";

const ProductSelectArea = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [stockItem] = useState([
		{ productCode: 10001, label: "Aquafina 1L", quantity: 40 },
		{ productCode: 10002, label: "Kinley 1L", quantity: 40 },
		{ productCode: 10003, label: "Bislery 1L", quantity: 40 },
		{ productCode: 10004, label: "Baily 1L", quantity: 40 },
		{ productCode: 10005, label: "Himalayan 1L", quantity: 40 },
		
	]);
  const handleSelect = (e, data) => {
		if (selectIndex < data.length) {
			if (e.key === "ArrowUp" && selectIndex > 0) {
				setSelectIndex((prev) => prev - 1);
			} else if (e.key === "ArrowDown" && selectIndex < data.length - 1) {
				setSelectIndex((prev) => prev + 1);
			} else if (e.key === "Enter" && selectIndex >= 0) {
				if (data === customerName) {
					updateData(data[selectIndex].label);
					setShowCustomer(false);
					inputRefs.current[1]?.focus();
				}
				// tableRefs.current[0].focus();
			} else if (e.key === "Backspace") {
				if (e.target.value !== "") {
					return;
				} else {
					e.preventDefault();
					inputRefs.current[1]?.focus();
				}
			}
		}
	};
	const updateData = (value) => {
		setData((prevData) => ({
			...prevData,
			productCode: value,
		}));
	};
  return (
    <>
        <SelectArea 
          title="List of Stock Items"
          selectIndex={selectedProduct}
          data={stockItem}
          onHandle={updateData}
        />
    </>
  )
}
export default ProductSelectArea