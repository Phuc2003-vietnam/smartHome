import sensorRecord from '#~/model/sensorRecord.js'
import DeviceService from '#~/api/v1/device/services/index.js'
import NotificationService from '#~/api/v1/notification/services/index.js'

//Note: KHi mà data gửi về cứ value>limit thì notification khá nhiều
// thì nên xử lí như thế nào
// Add value to sensor record(also check auto mode ) and handle if value>limit
async function addValue({value, limit, type}) {
	// console.log('value: ', value, 'limit: ', limit, 'type: ', type)
	if (!value || !limit || !type) {
		throw Error('Forget to pass value')
	}
	if (value > limit) {
		//Handle if the value is more than limit , insert notificaiton
		if (type == 'humidity') {
			var description = 'The humidity in room exceeds'
		} else if (type == 'temperature') {
			let deviceObj = new DeviceService()
			var description = 'The temperature in room exceeds'
			//TODO not yet handle when auto and schedule at same time
			//If fan is in auto mode => turn on level 3 because temperature too high
			let fan = (await deviceObj.getDevices({type: 'fan', isAll: false}))[0]
			if (fan.isAuto) {
				var level = 3
				deviceObj.changeDetail({device_id: fan.device_id, level})
			}
		}
		let notiService=new NotificationService()
		await notiService.addNotification({description})
		await notiService.sendNotiFirebase({msg:description})

	}
	sensorRecord.create({
		type,
		value,
		limit,
	})
}

export default addValue
