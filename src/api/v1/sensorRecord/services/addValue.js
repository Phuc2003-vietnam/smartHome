import sensorRecord from '#~/model/sensorRecord.js'
import notification from '#~/model/notification.js'
import deviceService from '#~/api/v1/device/services/index.js'

// Add value to sensor record(also check auto mode ) and handle if value>limit 
async function addValue({value, limit, type}) {
	if (!value || !limit || !type) {
		throw Error('Forget to pass value')
	}
	if (value > limit) {
		//Handle if the value is more than limit , insert notificaiton
		if (type == 'humidity') {
			description = 'The humidity in room exceeds'
		}
		elif(type == 'temperature')
		{	
			deviceObj=await new deviceService()
			description = 'The temperature in room exceeds'
			//If fan is in auto mode => turn on level 3
			let fan=deviceObj.getDevices({type:'fan',isAll:false})
			if(fan.mode=="fan")
			{
				var level=3
			}
			deviceObj.changeDetail({device_id:fan.device_id,level})
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
