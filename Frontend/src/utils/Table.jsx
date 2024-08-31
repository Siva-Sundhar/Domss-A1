import React, { useState, useRef } from "react";

const Table = () => {
	const [data, setData] = useState([
		{
			name: "",
			skills: [{ language: "", level: "", framework: "" }],
		},
	]);

	const nameRefs = useRef([]);
	const skillsRefs = useRef([]);

	const handleChange = (e, index, field, subIndex) => {
		const { name, value } = e.target;
		setData((prevData) => {
			const newData = [...prevData];

			if (field === "name") {
				newData[index][name] = value;
			} else if (field === "skills") {
				newData[index].skills[subIndex][name] = value;
			}

			return newData;
		});
	};

	const handleKeyPress = (e, index, field, subIndex) => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (field === "name") {
				if (skillsRefs.current[index] && skillsRefs.current[index][0]) {
					skillsRefs.current[index][0].focus(); // Focus on the first skill's language input
				}
			} else if (field === "skills") {
				if (skillsRefs.current[index][subIndex + 1]) {
					skillsRefs.current[index][subIndex + 1].focus(); // Focus on the next skill in the list
				} else if (nameRefs.current[index + 1]) {
					nameRefs.current[index + 1].focus(); // Focus on the next entry's name input if available
				}
			}
		}
	};

	const addSkillRow = (index) => {
		setData((prevData) => {
			const newData = [...prevData];
			newData[index].skills.push({ language: "", level: "", framework: "" });
			return newData;
		});
	};

	const addDataRow = () => {
		setData((prevData) => [
			...prevData,
			{ name: "", skills: [{ language: "", level: "", framework: "" }] },
		]);
		nameRefs.current.push(React.createRef());
		skillsRefs.current.push([]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form Submitted", data);
	};

	return (
		<div className="w-1/2 my-2 mx-auto">
			<form onSubmit={handleSubmit}>
				{data.map((item, index) => (
					<React.Fragment key={index}>
						<div className="border my-2 p-3">
							<div>
								<label htmlFor={`name-${index}`}>Name: </label>
								<input
									type="text"
									id={`name-${index}`}
									className="border border-slate-400 outline-0"
									name="name"
									ref={(el) => (nameRefs.current[index] = el)}
									value={item.name}
									onChange={(e) => handleChange(e, index, "name")}
									onKeyPress={(e) => handleKeyPress(e, index, "name")}
								/>
							</div>
							<div className="flex">
								<label>Skills: &nbsp;</label>
								<table>
									<thead>
										<tr className="text-[13px] border text-center">
											<td className="w-5">Language</td>
											<td className="w-5">Level</td>
											<td className="w-5">Framework</td>
										</tr>
									</thead>
									<tbody>
										{item.skills.map((skill, skillIndex) => (
											<tr key={skillIndex}>
												<td className="border">
													<input
														type="text"
														className="w-32 outline-0"
														name="language"
														ref={(el) => {
															if (!skillsRefs.current[index]) {
																skillsRefs.current[index] = [];
															}
															skillsRefs.current[skillIndex][skillIndex + 0] =
																el;
														}}
														value={skill.language}
														onChange={(e) =>
															handleChange(e, index, "skills", skillIndex)
														}
														onKeyPress={(e) =>
															handleKeyPress(e, index, "skills", skillIndex)
														}
													/>
												</td>
												<td className="border">
													<input
														type="text"
														className="w-28 outline-0"
														name="level"
														value={skill.level}
														onChange={(e) =>
															handleChange(e, index, "skills", skillIndex)
														}
                                                        ref={(el) => {
															if (!skillsRefs.current[index]) {
																skillsRefs.current[index] = [];
															}
															skillsRefs.current[skillIndex][skillIndex + 1] =
																el;
														}}
														onKeyPress={(e) =>
															handleKeyPress(e, index, "skills", skillIndex)
														}
													/>
												</td>
												<td className="border">
													<input
														type="text"
														className="w-32 outline-0"
														name="framework"
														value={skill.framework}
														onChange={(e) =>
															handleChange(e, index, "skills", skillIndex)
														}
                                                        ref={(el) => {
															if (!skillsRefs.current[index]) {
																skillsRefs.current[index] = [];
															}
															skillsRefs.current[skillIndex][skillIndex + 1]  =
																el;
														}}
														onKeyPress={(e) =>
															handleKeyPress(e, index, "skills", skillIndex)
														}
													/>
												</td>
											</tr>
										))}
									</tbody>
								</table>
								<button
									type="button"
									className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
									onClick={() => addSkillRow(index)}
								>
									Add Skill
								</button>
							</div>
						</div>
					</React.Fragment>
				))}
				<button
					type="button"
					className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
					onClick={addDataRow}
				>
					Add New Entry
				</button>
				<button
					type="submit"
					className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-4"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Table;
