import NotitcationService from '../services/index.js'

const sendSample = async (req, res, next) => {
	try {
		const {userId} = req.body
		const data = await new NotitcationService().sendSample({userId})
		res.status(200).json("send sucess sample")
	} catch (err) {
		next(err)
	}
}

export default sendSample
