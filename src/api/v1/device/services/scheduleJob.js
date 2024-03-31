import {} from 'dotenv/config'
import schedule from 'node-schedule'
//isAll==true means we restart server so we have to schedule everything again
//isAll==false only schedule new jobs
async function scheduleJob({device_id, schedule, isAll,isDeleted}) {
	try {
			var fan = await this.getDevices({device_id})
			var jobs=[{}]
			if (isAll){
				jobs=fan.schedule
			}
			else{
				jobs=schedule
			}
			//TODO: Schedule Job for fan
            for (job of jobs) {
                schedule.scheduleJob(job.start, function () {
                    //TODO:Change the level + turn on fan using hiveMQ (not done)
                })
				schedule.scheduleJob(job.end, function () {
                    //TODO:Change the level + turn on fan using hiveMQ (not done)
                })
            }
	} catch (err) {
		return Promise.reject({status: 401, message: 'Error'})
	}
}
export default scheduleJob
