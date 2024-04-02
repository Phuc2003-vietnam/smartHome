import user from '#~/model/user.js'
import {} from 'dotenv/config'


const access_token_key = process.env.ACCESS_TOKEN_KEY

async function getUserInfo({email}) {
	try {
		var userRecord = await user.findOne({email}).select('-password').lean()
		console.log(userRecord);
		return userRecord
	} catch (err) {
		return Promise.reject({status: 401, message: 'Unauthorized'})
	}
}
export default getUserInfo
