import DashboardService from '../services/index.js'

const getDashBoard = async (req, res, next) => {
	try {
		var {date,type}=req.query
		console.log(date, type);
		const data = await new DashboardService().getDashBoard({
			date,type
		})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getDashBoard
