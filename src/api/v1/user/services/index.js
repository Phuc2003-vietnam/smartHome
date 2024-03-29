import register from './register.js'
import login from './login.js'
import getUserInfo from './getUserInfo.js'


class UserService {
	userInfo=null;	//later getUserInfo will assign to userInfo
	register = register
	login = login
	getUserInfo=getUserInfo
}

export default UserService
