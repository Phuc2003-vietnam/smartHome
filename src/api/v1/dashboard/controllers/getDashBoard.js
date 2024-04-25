import DashboardService from '../services/index.js'

const getDashBoard = async (req, res, next) => {
	try {
		var {date}=req.query
		const data = await new DashboardService().getDashBoard({
			date
		})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getDashBoard
