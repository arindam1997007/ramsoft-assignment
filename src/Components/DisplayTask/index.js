import {
	Paper,
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@mui/material"
import {
	ArrowUpward,
	ArrowDownward,
	SortByAlpha,
	Delete as DeleteIcon,
	StarBorder,
	Star as StarIcon,
} from "@mui/icons-material"
import { orderBy } from "lodash"

export const DisplayTask = ({ taskList, setTaskList, sortBy, setSortBy }) => {
	const renderSortIcon = name => {
		if (sortBy.key === name) {
			if (sortBy.value === "desc")
				return <ArrowDownward fontSize='10px' title='desc-icon' />
			else return <ArrowUpward fontSize='10px' title='asc-icon' />
		}
		return <SortByAlpha fontSize='10px' color='#ccc' title='default-icon' />
	}

	const sortColumn = key => {
		let value = sortBy.value
		if (value === null) value = "desc"
		else if (value === "desc") value = "asc"
		else value = "desc"
		setSortBy({
			key,
			value,
		})
		const tasks = orderBy(taskList, ["favorite", key], ["desc", value])
		setTaskList(tasks)
	}

	const deleteTask = item => {
		const tasks = taskList.filter(task => task.id !== item.id)
		setTaskList(tasks)
	}

	const toggleFavorite = item => {
		const updatedTaskList = [...taskList]
		const index = updatedTaskList.findIndex(task => task.id === item.id)
		updatedTaskList[index].favorite = !updatedTaskList[index].favorite
		setTaskList(updatedTaskList)
		console.log({ updatedTaskList })
	}

	return (
		<>
			{taskList.length > 0 && (
				<TableContainer
					component={Paper}
					sx={{ marginBlock: "1rem", overflowY: "auto", maxHeight: "80vh" }}
				>
					<Table
						sx={{ minWidth: 650, background: "#bb0c77" }}
						aria-label='simple table'
					>
						<TableHead>
							<TableRow>
								<TableCell
									sx={{ cursor: "pointer" }}
									onClick={() => sortColumn("name")}
								>
									Task Name {renderSortIcon("name")}
								</TableCell>
								<TableCell
									sx={{ cursor: "pointer" }}
									align='right'
									onClick={() => sortColumn("description")}
								>
									Task Description {renderSortIcon("description")}
								</TableCell>
								<TableCell
									sx={{ cursor: "pointer" }}
									align='right'
									onClick={() => sortColumn("deadline")}
								>
									Deadline {renderSortIcon("deadline")}
								</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{taskList.map(task => (
								<TableRow
									key={task.name}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component='th' scope='row'>
										{task.name}
									</TableCell>
									<TableCell align='right'>{task.description}</TableCell>
									<TableCell align='right'>{task.deadline}</TableCell>
									<TableCell align='center' sx={{ cursor: "pointer" }}>
										<DeleteIcon
											fontSize='12px'
											sx={{ color: "#ff9b00", marginLeft: "0.6em" }}
											onClick={() => deleteTask(task)}
											title='delete-icon'
										/>
										{task.favorite ? (
											<StarIcon
												fontSize='12px'
												sx={{ marginLeft: "0.6em" }}
												onClick={() => toggleFavorite(task)}
												title='favorite-icon'
											/>
										) : (
											<StarBorder
												fontSize='12px'
												sx={{ marginLeft: "0.6em" }}
												onClick={() => toggleFavorite(task)}
												title='favorite-icon'
											/>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</>
	)
}
