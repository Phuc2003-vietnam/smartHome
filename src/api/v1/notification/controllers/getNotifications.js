import NotitcationService from '../services/index.js'

const getDevice = async (req, res, next) => {
	try {
		const data = await new NotitcationService().getNotifications()
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getDevice
