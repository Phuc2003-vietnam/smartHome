import SensorRecord from "#~/model/sensorRecord"

const getValue = async (req, res, next) => {
	try {
		const {type,length}=req.body
		const data = await new SensorSerivce().getValue({
			type,length
		})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getValue
