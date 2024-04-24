import schedule from 'node-schedule'
import sensorRecord from '#~/model/sensorRecord.js'
import DashBoard from '#~/model/dashboard.js'
import moment from 'moment'

//NOTE : cần bật iot trước sau đó qua bên express config uncomment
async function scheduleComputeAverageHourly() {
	// Schedule a job to run every hour
	const job = schedule.scheduleJob('0 * * * *', async function () {
		//specify range time of sensor records
		const type = 'temperature'
		let current = new Date(Date.now())
		current.setHours(current.getHours() - 1)	// NOTE : NEED TO UNDO
		current.setMinutes(0)
		current.setSeconds(0)
		let currentFirstMinute = new Date(current)
		current.setMinutes(59)
		current.setSeconds(59)
		let currentLastMinute = new Date(current)

		console.log(currentFirstMinute, currentLastMinute)
		//get all records in range time
		let query = {
			type,
			createdAt: {$gte: currentFirstMinute, $lt: currentLastMinute},
		}
		// console.log("THE QUERY OF SENSOR ");
		// console.log(query)
		// console.log("============================");
		const hourlyRecord = await sensorRecord.find(query).sort({createdAt: -1})
		// console.log("THE VALUE OF HOURLY RECORD ");
		// console.log(hourlyRecord)
		// console.log("============================");

		//compute average
		let sumValue = 0
		let averageSumValue = 0
		for (let record of hourlyRecord) {
			sumValue += record.value
		}
		averageSumValue = sumValue / hourlyRecord.length
		// console.log("THE AVERAGE VALUE IS");
		// console.log(averageSumValue)
		// console.log("==============================");

		//save average value  to db hourly
		//logic: tìm dashboard có created trong ngày hôm nay rồi update hourly value,
		// nếu không tìm thấy thì tạo thằng mới rồi push data
		let todayStart = moment().startOf('day').toDate()
		let todayEnd = moment().endOf('day').toDate()

		let dashboardRecord = await DashBoard.findOneAndUpdate(
			{createdAt: {$gte: todayStart, $lt: todayEnd}}, // Find by created date within the current day
			{$setOnInsert: {createdAt: new Date(), type}}, // If not found, insert with default values
			{new: true, upsert: true} // Return the updated or newly created document
		)
		var currentDate = new Date(Date.now())
		currentDate.setHours(currentDate.getHours() - 1)
		const hourlyTime = currentDate.getHours()+":00"

		dashboardRecord.hourlyValue.push({time: hourlyTime, value: averageSumValue})
		await dashboardRecord.save()
	})
}

// async function scheduleComputeAverageHourly() {}

export default scheduleComputeAverageHourly
