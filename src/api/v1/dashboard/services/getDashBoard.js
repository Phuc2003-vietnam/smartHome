import {} from 'dotenv/config'
import fs from 'fs'
import csv from 'csv-parser'
import moment from 'moment'
import DashBoard from '#~/model/dashboard.js'
import sensorRecord from '#~/model/sensorRecord.js'

const filePath = 'predicted_data.csv'
async function extractDataByDate(csvFile, targetDate) {
	return new Promise((resolve, reject) => {
		const extractedData = []

		// Read the CSV file
		fs.createReadStream(csvFile)
			.pipe(csv())
			.on('data', (row) => {
				// Convert the time string to Date object
				const [date, time] = row.time.split(' ')
				const hour = time.split(':')[0]

				// Check if the date matches the target date
				if (date === targetDate) {
					// Extract the hour and temperature values
					const temp = parseFloat(row.temp)
					extractedData.push({time: hour + ':00', value: temp})
				}
			})
			.on('end', () => {
				// Resolve with the extracted data
				resolve(extractedData)
			})
			.on('error', (error) => {
				// Reject with the error
				reject(error)
			})
	})
}
//date truyền dang UTC
//date="2024-04-24"
async function getStats({todayStart,todayEnd}){
    var sensorData = await sensorRecord.find({
        createdAt: {$gte: todayStart, $lt: todayEnd},
    }).lean()
    if (!sensorData || sensorData.length === 0) {
        return {
            highest: null,
            lowest: null,
            average: null
        };
    }

    let highest = -1;
    let lowest = 1000;
    let sum = 0;
    for (const data of sensorData) {
        const { value } = data;

        // Update highest and lowest values
        highest = Math.max(highest, value);
        lowest = Math.min(lowest, value);

        // Add to sum for average calculation
        sum += value;
    }
    const average = sum / sensorData.length;
    return {
        highest: highest,
        lowest: lowest,
        average: average
    };
}
//NOTE: realData can be fakeData sometimes , but the highest,lowest,average is calculate
//base on sensor
async function getDashBoard({date}) {
	try {
        //get predictedData and realData
		let data = {}
		data.predictedData = await extractDataByDate(filePath, date)

		let todayStart = moment(date).startOf('day').toDate() //2024-04-24 -> 2024-04-23T17:00:00.000Z
		let todayEnd = moment(date).endOf('day').toDate()
		var dashboardRecord = await DashBoard.findOne({
			createdAt: {$gte: todayStart, $lt: todayEnd},
		}).lean()
		data.realData=[]
		if (dashboardRecord) {
			data.realData = dashboardRecord.hourlyValue
		}
        //get the lowest,highest and average value
        let {lowest,highest,average}=await getStats({todayStart,todayEnd})
        data.lowest=lowest
        data.highest=highest
        data.average=average
		return data
	} catch (err) {
		return Promise.reject({status: 401, message: err})
	}
}
export default getDashBoard
