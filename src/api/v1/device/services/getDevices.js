import device from '#~/model/device.js'
import {} from 'dotenv/config'
import { query } from 'express'


async function getDevices({device_id,type,isAll}) {
	try {
		query={}
		if(!isAll)
		{
			if(type)
			{
				query.type=type
			}
			if(device_id)
			{
				query.device_id=device_id
			}
		}
		var deviceRecord = await device.find(query).lean()
		return deviceRecord
	} catch (err) {
		return Promise.reject({status: 401, message: "Error"})
	}
}
export default getDevices
