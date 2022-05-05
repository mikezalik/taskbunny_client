import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const flaskUrl = "https://taskbunnyapi.herokuapp.com";

export default function Tasks() {
	const [task, setTask] = useState("");
	const [editTask, setEditTask] = useState("");
	const [taskList, setTaskList] = useState([]);
	const [taskId, setTaskId] = useState(null);
	const [token, setToken] = useState("");

	const tokenFetch = () => {
		const token = localStorage.getItem("token");
		setToken(token);
		console.log(token);
		return token;
	};

	const fetchTasks = async () => {
		tokenFetch();
		const data = await axios.get(`${flaskUrl}/tasks`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const { tasks } = data.data;
		setTaskList(tasks);
	};

	const handleChange = (e, field) => {
		if (field === "edit") {
			setEditTask(e.target.value);
		} else {
			setTask(e.target.value);
		}
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`${flaskUrl}/tasks/${id}`);
			const updatedList = taskList.filter(
				(task) => task.id !== id
			);
			setTaskList(updatedList);
		} catch (err) {
			console.log(err.message);
		}
	};

	const toggleEdit = (task) => {
		setTaskId(task.id);
		setEditTask(task.task);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		tokenFetch();
		try {
			if (editTask) {
				const data = await axios.put(
					`${flaskUrl}/tasks/${taskId}`,
					{
						task: editTask,
					}
				);
				const updatedTask = data.data.task;
				const updatedList = taskList.map((task) => {
					if (task.id === taskId) {
						return (task = updatedTask);
					}
					return task;
				});
				setTaskList(updatedList);
			} else {
				const data = await axios.post(
					`${flaskUrl}/tasks`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
						task: task,
					}
				);
				setTaskList([...taskList, data.data]);
			}
			setTask("");
			setEditTask("");
			setTaskId(null);
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		const fetchTasks = async () => {
			tokenFetch();
			const data = await axios.get(`${flaskUrl}/tasks`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const { tasks } = data.data;
			setTaskList(tasks);
		};
		
	}, []);

	return (
		<div class="container-fluid text-center list-group">
			<div class="col">
				<br />
				<section class="input-group input-group-sm mb-3 text-center">
					<form onSubmit={handleSubmit}>
						<label htmlFor="task">
							Enter Task
						</label>
						<br />
						<input
							class="form-control"
							onChange={(e) =>
								handleChange(
									e,
									"task"
								)
							}
							type="text"
							name="task"
							id="task"
							placeholder="List your task here"
							value={task}
						/>
						<br />
						<button
							class="btn btn-info"
							type="submit"
						>
							Submit
						</button>
					</form>
				</section>
				<section>
					<ul>
						{taskList.map((task) => {
							if (
								taskId ===
								task.id
							) {
								return (
									<li>
										<form
											onSubmit={
												handleSubmit
											}
											key={
												task.id
											}
										>
											<input
												onChange={(
													e
												) =>
													handleChange(
														e,
														"edit"
													)
												}
												type="text"
												name="editTask"
												id="editTask"
												value={
													editTask
												}
											/>
											<button
												class="btn btn-info"
												type="submit"
											>
												Submit
											</button>
										</form>
									</li>
								);
							} else {
								return (
									<div>
										<br />
										<li
											class="list-group"
											key={
												task.id
											}
										>
											{format(
												new Date(
													task.created_at
												),
												"MM/dd, p"
											)}
											:{" "}
											{
												task.task
											}
											<button
												class="btn btn-secondary"
												onClick={() =>
													toggleEdit(
														task
													)
												}
											>
												Edit
											</button>
											<button
												class="btn btn-danger"
												onClick={() =>
													handleDelete(
														task.id
													)
												}
											>
												Delete
											</button>
										</li>
									</div>
								);
							}
						})}
					</ul>
				</section>
			</div>
		</div>
	);
}
