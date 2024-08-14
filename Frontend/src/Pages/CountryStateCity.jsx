import { useEffect, useState } from "react";
import axios from "axios";

const CountryStateCity = () => {
    // const [country, setCountry] = useState([]);
	// const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const sortedCities = cities.sort((a, b)=> a.name.common.localeCompare(b.name.common));
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchStates = async () => {
			try {
				
                const response3 = await axios.get(
					"https://restcountries.com/v3.1/all"
					
				);
				
                setCities(response3.data);

                // Assuming the API returns a JSON array of states
			} catch (error) {
				setError(error.message);
				console.error("Error:", error);
			}
		};

		fetchStates();
	}, []);
    
    console.log(sortedCities)
	return (
		<div>
			{error ? (
				<p>Error: {error}</p>
			) : (
				<ul>
					{sortedCities.map((state, index) => (
						<li key={index}>{index + 1}-{state.name.common}</li> // Adjust based on the structure of the API response
					))}
				</ul>
			)}
		</div>
	);
};

export default CountryStateCity;
