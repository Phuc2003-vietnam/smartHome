import Device from '../services/index.js'

const changeDetail = async (req, res, next) => {
	try {
		const data = await new Device().changeDetail(req.body)
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default changeDetail
