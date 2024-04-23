import device from '#~/model/device.js'
import MqttService from '#~/config/hivemq.js'

//isScheduleDeleted to check if user want to delete the schedule or
//add a new schedule to existing schedules, if isScheduleDeleted true => FE only needs
//to pass array of device_id

//Note: auto is handle in hivemq and sensorRecord
//Note: nếu restart server local thì xóa sạch mọi thằng scheudle trong DB

//TODO(DONE): chua handle lúc đang set 5minutes rồi change thành 10 minutes
//TODO(DONE): chua handle nếu set auto=false thì xóa job
//TODO(DONE): chua handle nếu set auto=true thì schedule job door
// Có điều logic chạy còn khá rối , cần refactor
//TEST: chạy auto rồi có người thì thay đổi time
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
		if (topic == 'fan') {
			let level = 0
			if (state == 1) {
				level = (await this.getDevices({device_id}))[0].level
			}
			MqttService.mqttClient.publish(topic, level.toString(), {qos: 0})
		} else if (topic != 'fan' && topic != -1) {
			console.log('Im herre')
			console.log(topic)
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
	} //Handle update schedule for door because detect new person=>change schedule time , 
	else if (isDoorScheduleDeleted) {
		newSet.schedule = scheduleTime
		var updatedDevice = await device
			.findOneAndUpdate(
				{device_id},
				{
					$set: newSet,
				},
				{new: true}
			)
			.lean()
	} //Handle schedule job for door when turn on/off isAuto , or when changing close time
	else if (topic == 'door' && (isAuto || close_time)) {
		let old_door = (await this.getDevices({device_id}))[0]
		if (old_door.isAuto == false && close_time!=-1) {
			return Promise.reject({status: 401, message: 'Turn on AutoMode first'})
		}
		let door = await device.findOneAndUpdate({topic}, {$set: newSet}, {new: true})
		await this.scheduleJob({topic})
		return door
	}

	//Handle update schedule for fan in db + update other things(state,name,... )
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
