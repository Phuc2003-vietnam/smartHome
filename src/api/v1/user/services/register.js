//only for developing , testing new user
import user from '#~/model/user.js'
async function register({
	email,
	password,
	username,
 }) {
	const userRecord = await user.findOne({email})
	if (userRecord) {
		return Promise.reject({
			status: 403,
			message: 'The email has been registered',
		})
	} else {
			return await user.create({
				email,
				password,
				username,
			})
	}
}
export default register
