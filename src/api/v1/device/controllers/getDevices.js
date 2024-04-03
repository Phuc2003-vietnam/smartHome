import Device from '../services/index.js'

const getDevice = async (req, res, next) => {
	try {
		let {device_id,type,isAll} = req.query
		device_id = device_id ? JSON.parse(device_id):undefined
        isAll =isAll ? JSON.parse(isAll):false
		const data = await new Device().getDevices({device_id,type,isAll})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getDevice
