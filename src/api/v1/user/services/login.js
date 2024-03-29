import bcrypt from 'bcrypt'
import user from '#~/model/user.js'

async function login({email, password}) {
    console.log(email);
    const userRecord = await user.findOne({email})
    if (!userRecord) {
		return Promise.reject({
			status: 401,
			message: 'Email not correct',
		})
	} else{
        const isPasswordRight= await bcrypt.compare(password,userRecord.password)
        console.log(isPasswordRight);
        if(isPasswordRight)
        {
            return await this.getUserInfo(userRecord.email)
        }
        else{
            return Promise.reject({
                status: 404,
                message: 'Password not correct',
            })
        }
    }
}

export default login
