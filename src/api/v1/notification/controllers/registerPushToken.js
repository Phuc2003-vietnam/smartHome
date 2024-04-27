import NotitcationService from '../services/index.js'

const registerPushToken = async (req, res, next) => {
	try {
		const {userId, token} = req.body
		const data = await new NotitcationService().registerPushToken({userId, token})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default registerPushToken
