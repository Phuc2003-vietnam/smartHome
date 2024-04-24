import moment from 'moment'
import DashBoard from '#~/model/dashboard.js'
async function addFakeData({fakeData, date}) {
	try {
		let todayStart = moment(date).startOf('day').toDate()
		let todayEnd = moment(date).endOf('day').toDate()

		// Find or create a dashboard record for the specified date
		let dashboardRecord = await DashBoard.findOneAndUpdate(
			{
				createdAt: {$gte: todayStart, $lt: todayEnd},
			},
			{
				$setOnInsert: {
					createdAt: todayStart,
					type: 'temperature',
					hourlyValue: fakeData,
				},
			},
			{new: true, upsert: true}
		)

		console.log(dashboardRecord)

		// Ensure the retrieved document is valid
		if (!dashboardRecord) {
			throw new Error('Dashboard record not found or created.')
		}

		// Replace hourlyValue with fakeData
		dashboardRecord.hourlyValue = fakeData

		// Save the updated document
		await dashboardRecord.save()

		return dashboardRecord
	} catch (error) {
		console.error(error)
		throw error
	}
}

export default addFakeData
