import React from "react";
import { useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [task, setTask] = React.useState("");
	const [taskList, setTaskList] = React.useState([]);

	const saveTodo = async function (newTask) {
		var options = {
			method: "PUT",
			body: JSON.stringify(newTask),
			headers: { "content-type": "application/json" },
		};
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/jniati",
			options
		);
		setTaskList([...taskList, { label: task, done: false }]);
	};
	const retrieveTodo = async function () {
		var options = {
			method: "GET",
		};
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/jniati",
			options
		);
		setTaskList(await response.json());
	};
	useEffect(() => {
		retrieveTodo();
	}, []);
	return (
		<div>
			<input
				value={task}
				onChange={(e) => setTask(e.target.value)}></input>
			<button
				onClick={() =>
					saveTodo([...taskList, { label: task, done: false }])
				}>
				Submit
			</button>
			<div>
				<div>
					<ul>
						{taskList.map((item, i) => {
							return (
								<li
									key={i}
									onClick={() =>
										setTaskList(
											taskList.filter(
												(dTask, x) => x != i
											)
										)
									}>
									{item.label} <button>Trash</button>
								</li>
							);
						})}
					</ul>
				</div>
			</div>{" "}
		</div>
	);
};

export default Home;
