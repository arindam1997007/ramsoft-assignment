import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { TaskForm } from "./TaskForm" // Replace with the correct path to the TaskForm component
import { getTodaysDate } from "../../Util/date"

test("TaskForm handles form submission correctly", () => {
	// Create a mock handleSubmit function
	const mockHandleSubmit = jest.fn()

	// Render the TaskForm with the mock handleSubmit
	render(<TaskForm handleSubmit={mockHandleSubmit} />)

	// Find the input fields and submit button
	const taskNameInput = screen.getByLabelText(/^task/i)
	const descriptionInput = screen.getByLabelText(/^Description/i)
	const deadlineInput = screen.getByLabelText(/^Deadline/i)
	const submitButton = screen.getByText("Add Task")

	// Fill in the input fields
	fireEvent.change(taskNameInput, { target: { value: "Sample Task" } })
	fireEvent.change(descriptionInput, {
		target: { value: "Sample Description" },
	})
	fireEvent.change(deadlineInput, { target: { value: "2023-12-31" } })

	// Submit the form
	fireEvent.click(submitButton)

	// Assertions
	expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
	expect(mockHandleSubmit).toHaveBeenCalledWith({
		name: "Sample Task",
		description: "Sample Description",
		deadline: "2023-12-31",
		favorite: false,
		id: expect.any(String),
	})

	expect(taskNameInput.value).toBe("")
	expect(descriptionInput.value).toBe("")
	expect(deadlineInput.value).toBe(getTodaysDate())
})

test("TaskForm shows alert if task name or description is empty on submit", () => {
	// Create a mock handleSubmit function
	const mockHandleSubmit = jest.fn()

	// Render the TaskForm with the mock handleSubmit
	render(<TaskForm handleSubmit={mockHandleSubmit} />)

	// Find the submit button
	const submitButton = screen.getByText("Add Task")

	// Submit the form without filling in the input fields
	fireEvent.click(submitButton)

	// Assertions
	expect(mockHandleSubmit).not.toHaveBeenCalled()

	// An alert should be shown for the empty task name
	expect(window.alert).toHaveBeenCalledWith("Please enter a valid task name.")

	// Reset the mock alert function
	window.alert.mockClear()

	// Fill in the task name and submit the form again
	const taskNameInput = screen.getByLabelText(/^task/i)
	fireEvent.change(taskNameInput, { target: { value: "Sample Task" } })
	fireEvent.click(submitButton)

	// An alert should be shown for the empty task description
	expect(window.alert).toHaveBeenCalledWith(
		"Please enter a valid task description."
	)

	// Reset the mock alert function
	window.alert.mockClear()
})

beforeEach(() => {
	// Mock the window.alert function
	jest.spyOn(window, "alert").mockImplementation(() => {})
})

afterEach(() => {
	// Restore the original window.alert function after each test
	window.alert.mockRestore()
})
