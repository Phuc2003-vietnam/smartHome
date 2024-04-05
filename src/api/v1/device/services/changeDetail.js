import device from '#~/model/device.js'
import MqttService from '#~/config/hivemq.js'

//isScheduleDeleted to check if user want to delete the schedule or
//add a new schedule to existing schedules, if isScheduleDeleted true => FE only needs
//to pass array of device_id

//TODO: Forgot to handle when turn off and on auto mode for both fan and door
async function changeDetail({
	device_id,
	state = -1,
	level = -1,
	close_time = -1,
	scheduleTime = [],
	isScheduleDeleted = false,
	isDoorScheduleDeleted = false,
	topic = -1,
	isAuto = -1,
}) {
	// console.log("device_id : ",device_id," state: ",state," level: ",level," topic: ",topic);
	var newSet = {}
	if (!device_id) {
		return Promise.reject({status: 401, message: 'Forgot to pass device_id'})
	}
	if (state != -1) {
		newSet.state = state
		//Update the state of hardware
		if (topic == 'fan') {
			let level=0
			if(state==1)
			{
				level = (await this.getDevices({device_id}))[0].level
			}
			MqttService.mqttClient.publish(topic, level.toString(), {qos: 0})
		} else if (topic != 'fan' && topic != -1) {
			MqttService.mqttClient.publish(topic, state.toString(), {qos: 0})
		}
	}
	if (isAuto != -1) {
		newSet.isAuto = isAuto
	}
	if (level != -1) {
		newSet.level = level
	}
	if (close_time != -1) {
		newSet.close_time = close_time
	}

	//Handle schedule time for fan
	if (topic == 'fan' && scheduleTime.length) {
		await this.scheduleJob({
			device_id,
			scheduleTime,
			isReset: false,
			isScheduleDeleted,
			topic,
		})
	}
	//Handle delete schedule for fan 
	if (isScheduleDeleted) {
		const startIds = scheduleTime.map((schedule) => schedule.start_schedule_id)
		var updatedDevice = await device
			.findOneAndUpdate(
				{device_id},
				{
					$pull: {schedule: {start_schedule_id: {$in: startIds}}},
				},
				{new: true}
			)
			.lean()
	} 	//Handle update schedule for door
	else if (isDoorScheduleDeleted) {
		var updatedDevice = await device
			.findOneAndUpdate(
				{device_id},
				{
					$set: newSet,
					$unset: {scheduleTime: ''},
					$push: {schedule: {$each: scheduleTime}},
				},
				{new: true}
			)
			.lean()
	}//Handle update schedule for fan + update other things
	else {
		var updatedDevice = await device
			.findOneAndUpdate(
				{device_id},
				{$set: newSet, $push: {schedule: {$each: scheduleTime}}},
				{new: true}
			)
			.lean()
	}

	return updatedDevice
}

export default changeDetail
