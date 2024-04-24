import DashboardService from '../services/index.js'

const addFakeData = async (req, res, next) => {
	try {
		const data = await new DashboardService().addFakeData(req.body)
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default addFakeData
