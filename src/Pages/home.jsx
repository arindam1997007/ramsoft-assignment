import { useState } from "react"
import { Typography, Box } from "@mui/material"
import { TaskForm } from "../Components/TaskForm/TaskForm"
import { DisplayTask } from "../Components/DisplayTask"

const initialSort = { key: null, value: null }

export const Home = () => {
	const [tasks, setTasks] = useState([])
	const [sortBy, setSortBy] = useState(initialSort)

	const handleSubmit = task => {
		setTasks(prev => [...prev, task])
		setSortBy(initialSort)
	}

	return (
		<Box sx={{ padding: "1rem" }}>
			<Typography variant='h1'>Task Management App</Typography>
			<TaskForm handleSubmit={handleSubmit} />
			{tasks.length > 0 && (
				<DisplayTask
					taskList={tasks}
					setTaskList={setTasks}
					sortBy={sortBy}
					setSortBy={setSortBy}
				/>
			)}
		</Box>
	)
}
