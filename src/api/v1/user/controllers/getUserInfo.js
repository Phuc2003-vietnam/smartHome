import UserService from '../services/index.js'

const getUserInfo = async (req, res, next) => {
	try {
		let {email}=req.query
		const data = await new UserService().getUserInfo({email})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getUserInfo
