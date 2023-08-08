export const getTodaysDate = () => {
	const today = new Date()
	const formattedDate = today.toISOString().substring(0, 10)
	return formattedDate
}
