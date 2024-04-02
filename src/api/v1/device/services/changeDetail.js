import device from '#~/model/device.js'
import {v4 as uuidv4} from 'uuid'
import MqttService from '#~/config/hivemq.js'

function isDateValid(start, end) {
	startDate = new Date(start)
	endDate = new Date(end)
	if (!isNaN(startDate) || !isNaN(endDate)) {
		return 0
	}
	if (startDate > endDate) {
		return 0
	}
	return 1
}


//isScheduleDeleted to check if user want to delete the schedule or
//add a new schedule to existing schedules, if isScheduleDeleted true => FE only needs
//to pass array of device_id

async function changeDetail({
	device_id,
	state = -1,
	mode = -1,
	level = -1,
	close_time = -1,
	schedule = [],
	isScheduleDeleted = false,
	topic = -1,
	
}) {
	var newSet = {}
	if (!device_id) {
		return Promise.reject({status: 401, message: 'Forgot to pass device_id'})
	}
	if (state != -1) {
		newSet.state = state
		//Update the state of hardware
		if (topic == 'fan') {
			var level = (await this.getDevices({device_id})).level
			let msg={state,level}
			MqttService.mqttClient.publish(topic,JSON.stringify(msg), {qos: 0})
		}
		else if (topic != 'fan' && topic != -1) {
			let msg={state}
			MqttService.mqttClient.publish(topic,JSON.stringify(msg), {qos: 0})
		}
		
	}
	if (mode != -1) {
		newSet.mode = mode
	}
	if (level != -1) {
		newSet.level = level
	}
	if (close_time != -1) {
		newSet.close_time = close_time
	}

	//Handle schedule mode for fan
	if (schedule.length != 0 && mode=='scheduled') {
		this.scheduleJob({device_id, schedule, isReset: false,isDeleted,type})
	}
	const updatedDevice = await device
		.findOneAndUpdate({device_id}, {$set:newSet,$push:{schedule:{$each:schedule}}}, {new: true})
		.lean()

	return updatedDevice
}

export default changeDetail
