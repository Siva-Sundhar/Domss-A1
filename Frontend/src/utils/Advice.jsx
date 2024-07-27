import axios from "axios";
import { useEffect, useState } from "react";

const Advice = () => {
	const [adviceSlip, setAdviceSlip] = useState([]);
    const [loading, setLoading] = useState(23);

    useEffect(()=>{
        setInterval(()=>{
            if(loading < 50){

                setLoading((prev) => prev +1)
            }
        }, 1000)
        clearInterval();
    },[])
    

    
	useEffect(() => {
		axios
			.get(`https://api.adviceslip.com/advice/${loading}`)

			.then((response) => {
                    setAdviceSlip((prev)=>[...prev, response.data.slip ]) 
            });
	}, [loading]);
    console.log(adviceSlip)
	return (
		<>
			<div className="container">
				<table className="border border-collapse">
					<thead>
						<tr>
							<th className="border ">Id</th>
							<th className="border ">Advice</th>
						</tr>
					</thead>
					<tbody>
						{adviceSlip.map((item, index) => (
							<tr className="border" key={index + 1}>
								<td className="border">{index}</td>
								<td className="border">{item.advice}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};
export default Advice;
