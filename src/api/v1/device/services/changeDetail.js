import device from '#~/model/device.js'
import {v4 as uuidv4} from 'uuid'
//isScheduleDeleted to check if user want to delete the schedule
async function changeDetail({
	device_id,
	type,
	state = -1,
	mode = -1,
	level = -1,
	close_time = -1,
	schedule = [],
	isScheduleDeleted = false,
}) {
	var newSet = {}
	var newSchedule = {}
	var update = {}
	//TODO: check the time of start and end in correct format
	if (!device_id) {
		return Promise.reject({status: 401, message: 'Forgot to pass some parameters'})
	}
	if (state != -1) {
		newSet.state = state
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
	update.$set = newSet

	if (schedule != 0) {
		// TODO check the date Type (not done)
		// TODO check if the start already exist and less than end(not done)
		if (isScheduleDeleted) {
			this.scheduleJob({device_id, schedule, isAll: false,isDeleted})
		} else {
			update.$push.schedule.$each = schedule
			for (job of schedule) {
				job.schedule_id = uuidv4()
			}
			this.scheduleJob({device_id, schedule, isAll: false})
		}
	}
	//TODO: when delete the schedule , we need to stop the scheduleJob
	const updatedDevice = await device
		.findOneAndUpdate({device_id}, {update}, {new: true})
		.lean()

	return updatedDevice
}

export default changeDetail
