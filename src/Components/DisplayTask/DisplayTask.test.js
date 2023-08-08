import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { DisplayTask } from "."

test("DisplayTask renders correctly with task list", () => {
	const taskList = [
		{
			id: 1,
			name: "Task 1",
			description: "Description 1",
			deadline: "2023-08-15",
			favorite: false,
		},
		{
			id: 2,
			name: "Task 2",
			description: "Description 2",
			deadline: "2023-08-20",
			favorite: true,
		},
	]
	const setTaskList = jest.fn()
	const sortBy = { key: "name", value: "asc" }
	const setSortBy = jest.fn()

	render(
		<DisplayTask
			taskList={taskList}
			setTaskList={setTaskList}
			sortBy={sortBy}
			setSortBy={setSortBy}
		/>
	)

	// Verify that table headers are rendered correctly
	expect(screen.getByText("Task Name")).toBeInTheDocument()
	expect(screen.getByText("Task Description")).toBeInTheDocument()
	expect(screen.getByText("Deadline")).toBeInTheDocument()

	// Verify that table rows are rendered correctly
	expect(screen.getByText("Task 1")).toBeInTheDocument()
	expect(screen.getByText("Description 1")).toBeInTheDocument()
	expect(screen.getByText("2023-08-15")).toBeInTheDocument()

	expect(screen.getByText("Task 2")).toBeInTheDocument()
	expect(screen.getByText("Description 2")).toBeInTheDocument()
	expect(screen.getByText("2023-08-20")).toBeInTheDocument()

	expect(screen.getAllByTitle("default-icon")[0]).toBeInTheDocument()
})

test("DisplayTask handles sortColumn correctly", () => {
	const taskList = [
		{
			id: 1,
			name: "Task 1",
			description: "Description 1",
			deadline: "2023-08-15",
			favorite: false,
		},
		{
			id: 2,
			name: "Task 2",
			description: "Description 2",
			deadline: "2023-08-20",
			favorite: true,
		},
	]
	const setTaskList = jest.fn()
	const sortBy = { key: "name", value: "asc" }
	const setSortBy = jest.fn()

	render(
		<DisplayTask
			taskList={taskList}
			setTaskList={setTaskList}
			sortBy={sortBy}
			setSortBy={setSortBy}
		/>
	)

	// Click on the header to change the sort order
	fireEvent.click(screen.getByText("Task Name"))

	expect(setSortBy).toHaveBeenCalledWith({ key: "name", value: "desc" })

	// Expected sorted taskList based on the "name" key in descending order
	const expectedSortedTaskList = [
		{
			id: 2,
			name: "Task 2",
			description: "Description 2",
			deadline: "2023-08-20",
			favorite: true,
		},
		{
			id: 1,
			name: "Task 1",
			description: "Description 1",
			deadline: "2023-08-15",
			favorite: false,
		},
	]

	// Verify that the setTaskList function is called with the correct sorted taskList
	expect(setTaskList).toHaveBeenCalledWith(expectedSortedTaskList)
})

test("DisplayTask handles deleteTask correctly", () => {
	const taskList = [
		{
			id: 1,
			name: "Task 1",
			description: "Description 1",
			deadline: "2023-08-15",
			favorite: false,
		},
		{
			id: 2,
			name: "Task 2",
			description: "Description 2",
			deadline: "2023-08-20",
			favorite: true,
		},
	]
	const setTaskList = jest.fn()
	const sortBy = { key: "name", value: "asc" }
	const setSortBy = jest.fn()

	render(
		<DisplayTask
			taskList={taskList}
			setTaskList={setTaskList}
			sortBy={sortBy}
			setSortBy={setSortBy}
		/>
	)

	// Click on the delete icon for the first task
	fireEvent.click(screen.getAllByTitle("delete-icon")[0])

	expect(setTaskList).toHaveBeenCalledWith([
		{
			id: 2,
			name: "Task 2",
			description: "Description 2",
			deadline: "2023-08-20",
			favorite: true,
		},
	])
})

test("DisplayTask handles toggleFavorite correctly", () => {
	const taskList = [
		{
			id: 1,
			name: "Task 1",
			description: "Description 1",
			deadline: "2023-08-15",
			favorite: false,
		},
		{
			id: 2,
			name: "Task 2",
			description: "Description 2",
			deadline: "2023-08-20",
			favorite: true,
		},
	]
	const setTaskList = jest.fn()
	const sortBy = { key: "name", value: "asc" }
	const setSortBy = jest.fn()

	render(
		<DisplayTask
			taskList={taskList}
			setTaskList={setTaskList}
			sortBy={sortBy}
			setSortBy={setSortBy}
		/>
	)

	// Click on the star icon for the first task
	fireEvent.click(screen.getAllByTitle("favorite-icon")[0])

	expect(setTaskList).toHaveBeenCalledWith([
		{
			id: 1,
			name: "Task 1",
			description: "Description 1",
			deadline: "2023-08-15",
			favorite: true,
		},
		{
			id: 2,
			name: "Task 2",
			description: "Description 2",
			deadline: "2023-08-20",
			favorite: true,
		},
	])
})
