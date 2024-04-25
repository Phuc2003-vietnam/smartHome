import DeviceLogService from "../service/index.js"

const getLogs = async (req, res, next) => {
	try {
        let {limit, offset} = req.param
        limit = limit? JSON.parse(limit): 20
        offset = offset? JSON.parse(offset): 0
		const data = await new DeviceLogService().getLogs({limit, offset})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getLogs
