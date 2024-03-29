import UserSerivce from '../services/index.js'
const register = async (req, res, next) => {
	try {
		const {
			email,
			password,
			username
		} = req.body
		console.log(req.a)
		const data = await new UserSerivce().register({
			email,
			password,
			username,
		})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default register
