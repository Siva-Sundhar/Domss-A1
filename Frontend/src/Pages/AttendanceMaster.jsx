import { useState } from "react";
import * as XLSX from "xlsx";
const AttendanceMaster = () => {
	const [file, setFile] = useState(null);
	const [data, setData] = useState([]);
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setFile(file);
	};
	const handleFileRead = () => {
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, { type: "array" });
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];
				const fileData = XLSX.utils.sheet_to_json(worksheet);
				setData(fileData);
			};
			reader.readAsArrayBuffer(file);
		}
	};
	console.log(data);
	return (
		<>
			<div className=" w-screen h-screen">
				<div>
					<input
						type="file"
						accept=".xlsx, .xls"
						onChange={handleFileChange}
						name=""
						id=""
					/>
					<button onClick={handleFileRead}>Upload</button>
				</div>
				<div>
					<table className="table border">
						<thead className="border border-collapse">
                        <tr>
                            {
                                data.length > 0 && Object.keys(data[0]).map((key) =>(
                                    <th key={key} className="px-1 border border-collapse text-[13px]">{key}</th>
                                ))
                            }
                            </tr>
						</thead>
						<tbody>
                            { 
                                data.map((row, index)=>(
                                    <tr  key={index}>
                                    {
                                        Object.values(row).map((value, idx)=>(
                                            <td className="px-1 border border-collapse text-[13px]" key={idx}>
                                                {value}
                                            </td>
                                    ))}
                                    </tr> 
                                ))
                                
                            }
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};
export default AttendanceMaster;
