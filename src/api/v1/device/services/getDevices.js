import device from '#~/model/device.js'
import {} from 'dotenv/config'


async function getDevices(email) {
	try {
		var deviceRecord = await device.find({}).lean()
		return deviceRecord
	} catch (err) {
		return Promise.reject({status: 401, message: "Error"})
	}
}
export default getDevices
