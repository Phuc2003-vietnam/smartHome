import UserSerivce from '#~/api/v1/user/services/index.js'
import jwt from 'jsonwebtoken'
import {} from 'dotenv/config'
const access_token_key = process.env.ACCESS_TOKEN_KEY

const userAuth = async (req, res, next) => {
	try {
		// console.log(req.headers.authorization);
		const accessToken = req.headers.authorization.split(' ')[1]
		var {user_id, session_id} = jwt.verify(accessToken, access_token_key)
		const userService = new UserSerivce()
		req.userService = userService
		req.accessToken = accessToken
		req.user_id=user_id
		next()
	} catch (err) {
		console.log(err)
		next({status: 401, message: 'Unauthorized'})
	}
}

export default userAuth
