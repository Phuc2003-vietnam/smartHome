let currentDate = new Date()

// Set hours, minutes, and seconds to 0
currentDate.setHours(0, 0, 0, 0)
currentDate.setMinutes(currentDate.getMinutes() + 80)

console.log(currentDate)
const checkDate = new Date('2024-04-24T00:00:16.911Z')
console.log(currentDate < checkDate)
