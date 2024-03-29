import UserSerivce from '../services/index.js'

const login = async (req, res, next) => {
	try {
		const {email, password} = req.body
		const data=await new UserSerivce().login({
			email,
			password,
		})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default login
