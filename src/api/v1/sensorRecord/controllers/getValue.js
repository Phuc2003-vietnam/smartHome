import SensorService from '../services/index.js'

const getValue = async (req, res, next) => {
	try {
		var {type,isAll}=req.query
		isAll=JSON.parse(isAll)
		const data = await new SensorService().getValue({
			type,isAll
		})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getValue
