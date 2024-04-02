import device from '#~/model/device.js'
import {} from 'dotenv/config'


async function getDevices({device_id,type,isAll}) {
	try {
		let query={}
		if(!isAll)
		{
			console.log("dm");
			if(type)
			{
				query.type=type
			}
			if(device_id)
			{
				query.device_id=device_id
			}
		}
		console.log("2222");

		var deviceRecord = await device.find(query).lean()
		return deviceRecord
	} catch (err) {
		return Promise.reject({status: 401, message: err})
	}
}
export default getDevices
