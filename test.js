function getTime() {
	const today = new Date()
	const startOfToday = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate(),
		0,
		0,
		0
	) // Start of today (midnight)
	const endOfToday = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate(),
		23,
		59,
		59
	) // End of today (11:59:59 PM)
	return {startOfToday, endOfToday}
}
console.log(getTime())
