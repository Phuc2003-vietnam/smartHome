import sensorRecord from '#~/model/sensorRecord.js'
import notification from '#~/model/notification.js'
async function addValue({value, limit, type}) {
	if (!value || !limit || !type) {
		throw Error('Forget to pass value')
	}
	if (value > limit) {
		//TODO Handle if the value is more than limit , insert notificaiton
		if (type == 'humidity') {
			description = 'The humidity in room exceeds'
		}
		elif(type == 'temperature')
		{
			description = 'The temperature in room exceeds'
		}
		notification.create({description})
	} else {
		await sensorRecord.create({
			type,
			value,
			limit,
		})
	}
}

export default addValue
