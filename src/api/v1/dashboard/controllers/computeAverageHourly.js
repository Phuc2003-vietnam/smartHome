import DashboardService from '../services/index.js'

const getValue = async (req, res, next) => {
	try {
		const data = await new DashboardService().computeAverageHourly()
		res.status(200).json({data:"DONE"})
	} catch (err) {
		next(err)
	}
}

export default getValue
