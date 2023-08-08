import { useState } from "react"
import { getTodaysDate } from "../../Util/date"
import { TextField, Button, Box } from "@mui/material"
import styles from "./taskForm.module.css"
import { v4 } from "uuid"

export const TaskForm = ({ handleSubmit }) => {
	const [taskName, setTaskName] = useState("")
	const [taskDescription, setTaskDescription] = useState("")
	const [taskDeadline, setTaskDeadline] = useState(getTodaysDate())

	const onSubmit = e => {
		e.preventDefault()
		if (taskName.trim() === "") {
			alert("Please enter a valid task name.")
			return
		}
		if (taskDescription.trim() === "") {
			alert("Please enter a valid task description.")
			return
		}

		const task = {
			id: v4(),
			favorite: false,
			name: taskName,
			description: taskDescription,
			deadline: taskDeadline,
		}
		handleSubmit(task)
		reset()
	}

	const reset = () => {
		setTaskName("")
		setTaskDescription("")
		setTaskDeadline(getTodaysDate())
	}

	return (
		<Box component='form' onSubmit={onSubmit} sx={{ mt: 1 }}>
			<Box className={styles.formDiv}>
				<TextField
					InputLabelProps={{
						shrink: true,
					}}
					margin='normal'
					required
					autoFocus
					value={taskName}
					onChange={e => setTaskName(e.target.value)}
					placeholder='Enter Task Name'
					label='Task'
				/>
				<TextField
					InputLabelProps={{
						shrink: true,
					}}
					margin='normal'
					required
					value={taskDescription}
					onChange={e => setTaskDescription(e.target.value)}
					placeholder='Enter description'
					label='Description'
					sx={{ flexGrow: 1 }}
				/>
				<TextField
					InputLabelProps={{
						shrink: true,
					}}
					InputProps={{
						inputProps: { min: getTodaysDate() },
					}}
					margin='normal'
					required
					label='Deadline'
					value={taskDeadline}
					onChange={e => setTaskDeadline(e.target.value)}
					placeholder='Enter Task Name'
					type='date'
					className={styles.datePicker}
				/>
				<Button type='submit' variant='contained' sx={{ ml: "auto" }}>
					Add Task
				</Button>
			</Box>
		</Box>
	)
}
