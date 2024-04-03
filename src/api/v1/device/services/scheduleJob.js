import {} from 'dotenv/config'
import schedule from 'node-schedule'
import MqttService from '#~/config/hivemq.js'

function isIntersect(arr, n) {
	arr.sort(function (i1, i2) {
		return i1.start - i2.start
	})
	console.log(arr)

	// In the sorted array, if start time of an interval
	// is less than end of previous interval, then there
	// is an overlap
	for (let i = 1; i < n; i++) if (arr[i - 1].end > arr[i].start) return true

	// If we reach here, then no overlap
	return false
}

function isDateValid(start, end) {
	console.log(start);
	console.log(end);

	let startDate = new Date(start)
	let endDate = new Date(end)
	console.log(startDate);
	console.log(endDate);
	if (isNaN(startDate) || isNaN(endDate)) {
		return 0
	}
	if (startDate > endDate) {
		return 0
	}
	return 1
}
//isReset==true means we restart server so we have to schedule everything again
//isReset==false only schedule new jobs

//NOTE: this scheduleJob only schedule job for today time (if want to schedule for everyday=>using cron time)
async function scheduleFan({obj,device_id, schedule, isReset, isScheduleDeleted, topic}) {
	try {
		//if isScheduleDeleted true, cancel the running schedule job ,
		//isScheduleDeleted false: schedule the new jobs
		if (isScheduleDeleted) {
			for (let job of schedule) {
				var my_job = schedule.scheduledJobs[job.schedule_id]
				my_job.cancel()
			}
		} else {
			var fan = await obj.getDevices({device_id})
			var existedSchedule = fan.schedule
			var newSchedule = schedule

			//Scheule jobs when reset all  || schedule jobs when add new schedule
			var jobs = [{}]
			if (isReset) {
				jobs = existedSchedule
			} else {
				jobs = newSchedule
				//Check if type in correct format Datetime
				for (let job of jobs) {
					if (!isDateValid(job.start, job.end)) {
						return Promise.reject({
							status: 401,
							message: 'Invalid date format',
						})
					}
					job.schedule_id = uuidv4()
				}
				//check if 2 schedule intersect , true: return error
				var combineSchedule = existedSchedule.concat(newSchedule)
				if (isIntersect(combineSchedule, combineSchedule.length)) {
					return Promise.reject({
						status: 401,
						message: 'Overlapping schedule error',
					})
				}
				//update new schedule into Database
				console.log(jobs);
				obj.changeDetail({
					device_id,
					schedule: jobs,
				})
			}
			//Schedule Job for fan
			for (let job of jobs) {
				schedule.scheduleJob(job.start, function () {
					//Change the level + turn on fan using hiveMQ
					obj.changeDetail({
						device_id,
						state: 1,
						mode: 'auto',
						level: job.level,
						topic: 'fan',
					})
				})
				schedule.scheduleJob(job.end, function () {
					//Turn off fan using hiveMQ
					obj.changeDetail({
						device_id,
						state: 0,
						mode: 'auto',
						level: job.level,
						topic: 'fan',
					})
				})
			}
			obj.scheduleJob({device_id, schedule, isReset: false})
		}
	} catch (err) {
		return Promise.reject({status: 401, message: err})
	}
}

//NOT YET HANDLE BECAUSE NOT CONNECT TO HONG` NGOAI
//Lúc bật auto mode ta sẽ schedule sau x time sẽ đóng rồi khi nhận được state của hồng 
//ngoại là 1 thì canceljob rồi đặt job mới sau 5p đó tiếp
async function scheduleDoor({obj, isReset, isDeleted, topic}) {
	var door = await obj.getDevices({type:topic})
	var oldJobSchedule_id=door.schedule[0].schedule_id
	//find the close time in Date
	var currentDate = new Date(Date.now()) 
	currentDate.setMinutes(pastDate.getMinutes() + door.close_time) 

	let newDoorSchedule={
		schedule_id:uuid(),
		start: new Date(Date.now()) ,
		end: currentDate
	}
	
	if (door.isAuto==true)
	{
		//cancel the oldjob timing as we detect there are people
		var oldJob = schedule.scheduledJobs[oldJobSchedule_id];
		oldJob.cancel();
		//schedule new job and update schedule for door
		schedule.scheduleJob(newDoorSchedule.schedule_id,newDoorSchedule.end, function () {
			//Close the door using hiveMQ
			let msg={state:0}
			MqttService.mqttClient.publish(topic,JSON.stringify(msg), {qos: 0})
		})
		obj.changeDetail({device_id:door.device_id,schedule:[newDoorSchedule],isDoorScheduleDeleted:true})

	}

}
async function scheduleJob({device_id, schedule, isReset, isDeleted, topic, close_time,isDetected}) {
	let obj=this
	if (topic == 'fan') {
		await scheduleFan({obj,device_id, schedule, isReset, isDeleted, topic})
	} else if (topic == 'door') {
		await scheduleDoor({obj,isReset,isDeleted,isDetected,topic})
	}
}
export default scheduleJob
