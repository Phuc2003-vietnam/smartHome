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
		console.log(state);
		newSet.state = state
		//Update the state of hardware
		if (topic != -1) {
			MqttService.mqttClient.publish(topic,state.toString(), {qos: 0})
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
	if (schedule != 0) {
		// if isScheduleDeleted true, cancel the running schedule job
		if (isScheduleDeleted) {
			this.scheduleJob({device_id, schedule, isAll: false, isDeleted})
		} else {
			//isScheduleDeleted false: schedule the jobs
			for (job of schedule) {
				//check the date Type in correct format
				if (!isDateValid(job.start, job.end)) {
					return Promise.reject({
						status: 401,
						message: 'Invalid date format',
					})
				}
				job.schedule_id = uuidv4()
			}
			this.scheduleJob({device_id, schedule, isAll: false})
		}
	}
	const updatedDevice = await device
		.findOneAndUpdate({device_id}, {$set:newSet,$push:{schedule:{$each:schedule}}}, {new: true})
		.lean()

	return updatedDevice
}

export default changeDetail
